const slides = document.querySelectorAll(".slide");
let index = 0;

function mostrarSiguienteSlide() {
  slides[index].classList.remove("activa");
  index = (index + 1) % slides.length;
  slides[index].classList.add("activa");
}
setInterval(mostrarSiguienteSlide, 4000);