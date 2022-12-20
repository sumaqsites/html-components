(() => {
  // src/components/03-organisms/split-slideshow/split-slideshow.js
  var splitSlideshow = document.querySelector(".split-slideshow");
  if (splitSlideshow) {
    let nextSlide = function() {
      leftItems[previousIndex].classList.remove("active", "move-down");
      leftItems[currentIndex].classList.replace("active", "move-down");
      leftItems[nextIndex].classList.add("active");
      rightItems[previousIndex].classList.remove("active", "move-up");
      rightItems[currentIndex].classList.replace("active", "move-up");
      rightItems[nextIndex].classList.add("active");
      textItems[previousIndex].classList.remove("active", "move-down");
      textItems[currentIndex].classList.replace("active", "move-down");
      textItems[nextIndex].classList.add("active");
      currentIndex = currentIndex + 1 === itemsLength ? 0 : currentIndex + 1;
      nextIndex = currentIndex === itemsLength - 1 ? 0 : currentIndex + 1;
      previousIndex = currentIndex === 0 ? itemsLength - 1 : currentIndex - 1;
    }, autoStartSlideshow = function() {
      intervalSlideshow = setInterval(nextSlide, 2e3);
    };
    nextSlide2 = nextSlide, autoStartSlideshow2 = autoStartSlideshow;
    const overlay = document.querySelector(".slideshow-overlay");
    const slideshowImages = document.querySelector(".slideshow-images");
    const slideshowText = document.querySelector(".slideshow-text");
    const slideshowRight = slideshowImages.cloneNode(true);
    splitSlideshow.appendChild(slideshowRight);
    slideshowImages.classList.add("slideshow-left");
    slideshowRight.classList.add("slideshow-right");
    const textItems = slideshowText.querySelectorAll(".item");
    const leftItems = slideshowImages.querySelectorAll(".item");
    const rightItems = slideshowRight.querySelectorAll(".item");
    const itemsLength = textItems.length;
    let currentIndex = 0;
    let previousIndex = itemsLength - 1;
    let nextIndex = currentIndex + 1;
    let intervalSlideshow = null;
    overlay.addEventListener("click", () => {
      clearInterval(intervalSlideshow);
      splitSlideshow.classList.add("animate");
      setTimeout(() => {
        splitSlideshow.remove();
      }, 1e3);
    });
    window.sumaqSplitSlideshow = {
      autosStart: autoStartSlideshow()
    };
  }
  var nextSlide2;
  var autoStartSlideshow2;
})();
