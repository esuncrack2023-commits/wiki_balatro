import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getFirestore,
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/* ===== FIREBASE ===== */
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

/* ===== SUBIR IMAGEN A IMGBB ===== */
async function subirImagen(file) {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("https://api.imgbb.com/1/upload?key=b9392e4dcb91c8f15e4abc66cbff999a", {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    if (!data.success) {
        throw new Error("Error subiendo imagen");
    }

    return data.data.display_url;
}

/* ===== RENDER CARTAS ===== */
async function cargar() {
    const contenedor = document.getElementById("lista");
    contenedor.innerHTML = "";

    const snap = await getDocs(collection(db, "comodines"));

    snap.forEach(doc => {
        const data = doc.data();

        const div = document.createElement("div");

        div.innerHTML = `
            <h3>${data.nombre}</h3>
            <p>${data.desc}</p>

            ${data.img 
                ? `<img src="${data.img}" style="width:150px;">`
                : `<div style="width:150px;height:150px;background:#ccc;"></div>`
            }

            <small>#${data.orden}</small>
        `;

        contenedor.appendChild(div);
    });
}

/* ===== BOTÓN ===== */
document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("guardarCarta");

    btn.addEventListener("click", async () => {

        const nombre = document.getElementById("nombre").value;
        const desc = document.getElementById("desc").value;
        const categoria = document.getElementById("categoria").value;
        const file = document.getElementById("imagen").files[0];

        if (!nombre || !desc || !categoria || !file) {
            alert("Completa todo");
            return;
        }

        try {
            btn.disabled = true;
            btn.innerText = "Subiendo imagen...";

            const imgUrl = await subirImagen(file);

            btn.innerText = "Guardando...";

            const snap = await getDocs(collection(db, "comodines"));
            const orden = snap.size + 1;

            await addDoc(collection(db, "comodines"), {
                nombre,
                desc,
                categoria,
                orden,
                img: imgUrl
            });

            alert("✔ Guardado con imagen");

            cargar();

        } catch (e) {
            console.error(e);
            alert("Error subiendo o guardando");

        } finally {
            btn.disabled = false;
            btn.innerText = "Guardar Carta";
        }
    });

    cargar();
});