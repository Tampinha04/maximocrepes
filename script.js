let currentSlide = 0;
const slides = document.querySelectorAll(".carousel img");
const bars = document.querySelectorAll(".bar");
const carousel = document.querySelector(".carousel");
let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints; // Verifica se é um dispositivo com toque

// Função para exibir o slide com base no índice
function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    bars[i].classList.toggle("active", i === index);
  });
}

// Avançar ou voltar o slide
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Configura um intervalo para trocar de slide automaticamente
setInterval(() => {
  nextSlide();
}, 6000);

// Para dispositivos móveis (arrasto)
if (isTouchDevice) {
  let startX = 0;

  // Detecta o início do arrasto
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  // Detecta o movimento de arrasto
  carousel.addEventListener("touchend", (e) => {
    let endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) {
      nextSlide(); // Move para o próximo slide se o movimento for à esquerda
    } else if (endX - startX > 50) {
      prevSlide(); // Move para o slide anterior se o movimento for à direita
    }
  });
} else {
  // Para desktop (clicar nas barras de progresso)
  bars.forEach((bar, index) => {
    bar.addEventListener("click", () => {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });

  // Adiciona navegação por setas (para desktop)
  const prevButton = document.createElement("button");
  prevButton.innerHTML = "&#10094;";
  prevButton.classList.add("prev");
  carousel.appendChild(prevButton);

  const nextButton = document.createElement("button");
  nextButton.innerHTML = "&#10095;";
  nextButton.classList.add("next");
  carousel.appendChild(nextButton);

  prevButton.addEventListener("click", prevSlide);
  nextButton.addEventListener("click", nextSlide);
}
