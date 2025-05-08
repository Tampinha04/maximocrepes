let currentSlide = 0;
const slides = document.querySelectorAll(".carousel img");
const bars = document.querySelectorAll(".bar");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === index);
    bars[i].classList.toggle("active", i === index);
  });
}

setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}, 6000);