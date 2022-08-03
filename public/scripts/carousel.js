(() => {
  // src/scripts/carousel.js
  function initCarousel() {
    const carousels = document.querySelectorAll(".carousel");
    for (let i = 0; i < carousels.length; i++) {
      initCarousel2(carousels[i]);
    }
    function initCarousel2(carousel) {
      const interval = Number(carousel.dataset.interval) || 5e3;
      const prev = carousel.querySelector(".prev");
      const next = carousel.querySelector(".next");
      const slides = carousel.querySelectorAll(".item");
      const dots = carousel.querySelectorAll(".dot");
      let playSlider = null;
      let slideIndex = 0;
      function removeClasses() {
        slides.forEach((slide) => {
          slide.classList.remove("active", "pre", "sub");
        });
        dots.forEach((dot) => {
          dot.classList.remove("active");
        });
      }
      function addClasses(index) {
        slides[index].classList.add("active");
        dots[index].classList.add("active");
      }
      let startCarousel = () => {
        removeClasses();
        slideIndex++;
        if (slideIndex >= slides.length) {
          slideIndex = 0;
        }
        addClasses(slideIndex);
      };
      playSlider = setInterval(startCarousel, interval);
      carousel.addEventListener("mouseover", () => {
        clearInterval(playSlider);
      });
      carousel.addEventListener("mouseout", () => {
        playSlider = setInterval(startCarousel, interval);
      });
      prev?.addEventListener("click", () => {
        removeClasses();
        slideIndex--;
        if (slideIndex < 0) {
          slideIndex = slides.length - 1;
        }
        addClasses(slideIndex);
      });
      next?.addEventListener("click", () => {
        removeClasses();
        slideIndex++;
        if (slideIndex > slides.length - 1) {
          slideIndex = 0;
        }
        addClasses(slideIndex);
      });
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          removeClasses();
          slideIndex = Number(index);
          addClasses(slideIndex);
        });
      });
    }
  }
  var carousel_default = initCarousel;
})();
