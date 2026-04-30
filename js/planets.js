
// 🎯 EFECTO 3D (tilt)
const planets = document.querySelectorAll(".planeta");

planets.forEach(planeta => {

  const wrapper = document.createElement("div");
  wrapper.classList.add("tilt-js");

  const img = planeta.querySelector("img");
  planeta.appendChild(wrapper);
  wrapper.appendChild(img);

  wrapper.addEventListener("mousemove", (e) => {
    const rect = wrapper.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -(y - centerY) / 10;
    const rotateY = (x - centerX) / 10;

    wrapper.style.transform = `
      translateY(-50%)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1)
    `;
  });

  wrapper.addEventListener("mouseleave", () => {
    wrapper.style.transform = "translateY(-50%) rotateX(0) rotateY(0)";
  });

});


// 🌌 ELEMENTOS
const planetas = document.querySelectorAll(".planeta img");
const modal = document.getElementById("modal");
const titulo = document.getElementById("titulo-planeta");
const texto = document.getElementById("texto-planeta");
const imgModal = document.getElementById("img-planeta");

const nivel = document.getElementById("nivel");
const tipo = document.getElementById("tipo");
const multi = document.getElementById("multi");
const fichas = document.getElementById("fichas");

const cerrar = document.getElementById("cerrar");
const card = document.getElementById("modalCard");


// 📊 DATOS COMPLETOS DE PLANETAS
const dataPlanetas = {
  Mercurio: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Pareja",
    multi: 1,
    fichas: 15,
    texto: "La mejora se mantiene durante toda la partida."
  },
  Venus: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Trio",
    multi: 2,
    fichas: 20,
    texto: "La mejora se mantiene durante toda la partida."
  },
  Tierra: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Full House",
    multi: 2,
    fichas: 25,
    texto: "La mejora se mantiene durante toda la partida."
  },
  Marte: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Póker",
    multi: 3,
    fichas: 30,
    texto: "La mejora se mantiene durante toda la partida."
  },
  Jupiter: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Color",
    multi: 2,
    fichas: 15,
    texto: "La mejora se mantiene durante toda la partida."
  },
  Saturno: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Escalera",
    multi: 3,
    fichas: 30,
    texto: "La mejora se mantiene durante toda la partida."
  },
  Urano: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Doble pareja",
    multi: 1,
    fichas: 20,
    texto: "La mejora se mantiene durante toda la partida."
  },
  Neptuno: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Escalera de Color",
    multi: 4,
    fichas: 40,
    texto: "La mejora se mantiene durante toda la partida."
  },
  Pluton: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Carta mas alta",
    multi: 1,
    fichas: 10,
    texto: "La mejora se mantiene durante toda la partida."
  },
  Eris: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Cinco de color",
    multi: 3,
    fichas: 50,
    texto: "La mejora se mantiene durante toda la partida."
  },
  Ceres: {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Full de color",
    multi: 4,
    fichas: 40,
    texto: "La mejora se mantiene durante toda la partida."
  },
  "Planeta X": {
    nivel: "[Nvl. 1] Aumento de nivel",
    tipo: "Repoquer",
    multi: 3,
    fichas: 35,
    texto: "La mejora se mantiene durante toda la partida."
  }
};


// 🎨 COLORES (glow)
const colores = {
  
};


// 🪐 CLICK EN PLANETAS
planetas.forEach(planeta => {
  planeta.addEventListener("click", () => {

    const nombre = planeta.alt;
    const data = dataPlanetas[nombre];

    if (!data) return;

    // 📌 contenido
    titulo.textContent = nombre;
    texto.textContent = data.texto;
    imgModal.src = planeta.src;

    nivel.textContent = data.nivel;
    tipo.textContent = data.tipo;
    multi.textContent = `+${data.multi} multi`;
    fichas.textContent = `+${data.fichas} fichas`;

    // ✨ glow dinámico
    card.style.boxShadow = `0 0 25px ${colores[nombre]}`;

    modal.style.display = "block";
  });
});


// ❌ cerrar botón
cerrar.addEventListener("click", () => {
  modal.style.display = "none";
});

// ❌ cerrar clic fuera
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});