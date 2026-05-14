import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    getDocs,
    query,
    orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyAUzbsN2eLvXftX6v_BjDCltbtjERM8Y_Y",
    authDomain: "balatro-wiki.firebaseapp.com",
    projectId: "balatro-wiki",
    storageBucket: "balatro-wiki.appspot.com",
    messagingSenderId: "433807196945",
    appId: "1:433807196945:web:866d96edf0dc7ebbb142b0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const cartas = [];
let cartasFiltradas = [];

let pagina = 1;
const porPagina = 15;

/* ===== CARGAR FIREBASE ===== */
async function cargarCartas() {

    const q = query(
        collection(db, "comodines"),
        orderBy("orden")
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {

    const carta = doc.data();

    // 🔥 SI YA TIENE IMAGEN EN FIRESTORE (ImgBB)
    if (carta.img) {
        cartas.push(carta);
    }

    // 🔥 SI NO TIENE IMAGEN (cartas viejas locales)
    else {
        carta.img = `img/comodines/comodin${doc.id}.webp`;
        cartas.push(carta);
    }

    });

    cartasFiltradas = [...cartas];

    renderPagina();
}

cargarCartas();

/* ===== RENDER ===== */
function renderPagina() {

    const grid = document.getElementById("grid");

    if (!grid) return;

    grid.innerHTML = "";

    const inicio = (pagina - 1) * porPagina;
    const fin = inicio + porPagina;

    const cartasPagina = cartasFiltradas.slice(inicio, fin);

    cartasPagina.forEach(carta => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
            <img src="${carta.img}" alt="${carta.nombre}">
        `;

        div.onclick = (e) => mostrarTooltip(e, carta, div);

        grid.appendChild(div);

    });

    const totalPaginas = Math.ceil(cartasFiltradas.length / porPagina);

    const texto = document.getElementById("paginaTexto");

    if (texto) {
        texto.innerText = `Página ${pagina}/${totalPaginas}`;
    }
}

/* ===== TOOLTIP ===== */
function mostrarTooltip(e, carta, elemento) {

    e.stopPropagation();

    const tooltip = document.getElementById("tooltip");

    if (!tooltip) return;

    tooltip.innerHTML = `
        <div class="tooltip-title">
            ${crearTituloAnimado(carta.nombre || "")}
        </div>

        <div class="tooltip-box">
            ${carta.desc || ""}
        </div>

        <div class="tooltip-tipo tipo-${carta.categoria || "comun"}">
            ${crearTextoOla(carta.categoria || "comun")}
        </div>
    `;

    tooltip.style.display = "block";

    const rect = elemento.getBoundingClientRect();

    tooltip.style.left = (rect.right + 10 + window.scrollX) + "px";
    tooltip.style.top = (rect.top + window.scrollY) + "px";
}

/* ===== TEXTO OLA ===== */
function crearTextoOla(texto) {

    if (!texto) return "";

    const limpio = texto.charAt(0).toUpperCase() + texto.slice(1);

    return `
        <span class="wave">
            ${
                limpio
                .split("")
                .map(l => `<span>${l}</span>`)
                .join("")
            }
        </span>
    `;
}

/* ===== TÍTULO ===== */
function crearTituloAnimado(texto) {

    return `
        <span class="titulo-animado">
            ${
                texto
                .split("")
                .map(l => {
                    if (l === " ") {
                        return `<span>&nbsp;</span>`;
                    }

                    return `<span>${l}</span>`;
                })
                .join("")
            }
        </span>
    `;
}

/* ===== PAGINACIÓN ===== */
function cambiarPagina(dir) {

    const totalPaginas = Math.ceil(cartasFiltradas.length / porPagina);

    pagina += dir;

    if (pagina < 1) pagina = 1;

    if (pagina > totalPaginas) {
        pagina = totalPaginas;
    }

    renderPagina();
}

window.cambiarPagina = cambiarPagina;

/* ===== BUSCADOR ===== */

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {

    const texto = searchInput.value.toLowerCase().trim();

    cartasFiltradas = cartas.filter(carta => {

        const nombre = (carta.nombre || "").toLowerCase();
        const descripcion = (carta.desc || "").toLowerCase();
        const categoria = (carta.categoria || "").toLowerCase();

        return (
            nombre.includes(texto) ||
            descripcion.includes(texto) ||
            categoria.includes(texto)
        );

    });

    pagina = 1;

    renderPagina();

});

/* ===== CERRAR TOOLTIP ===== */
document.addEventListener("click", () => {

    const tooltip = document.getElementById("tooltip");

    if (tooltip) {
        tooltip.style.display = "none";
    }

});

window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
        location.reload();
    }
});