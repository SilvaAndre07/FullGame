// SLIDER JS
let nextBtns = document.querySelectorAll("#next");
const sliders = document.querySelectorAll(".slide");
const slidersNumber = sliders.length;

let slideStrat = 0;

// Função para ir para o próximo slide
function next() {
  sliders.forEach((slide) => {
    slide.classList.remove("active");
  });
  slideStrat++;
  if (slideStrat >= 5) {
    slideStrat = 0;
  }
  sliders[slideStrat].classList.add("active");
}

setInterval(next, 5000);
