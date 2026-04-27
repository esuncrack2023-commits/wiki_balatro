const cards = document.querySelectorAll(".card");
const titulo = document.getElementById("titulo-dinamico");

cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        titulo.textContent = card.dataset.nombre;
    });

    card.addEventListener("mouseleave", () => {
        titulo.textContent = "Elija una carta";
    });
});


