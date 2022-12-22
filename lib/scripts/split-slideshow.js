const splitSlideshow = document.querySelector('.split-slideshow')
if (splitSlideshow) {
  const overlay = document.querySelector('.slideshow-overlay')
  const slideshowImages = document.querySelector('.slideshow-images')
  const slideshowText = document.querySelector('.slideshow-text')

  const slideshowRight = slideshowImages.cloneNode(true)
  splitSlideshow.appendChild(slideshowRight)

  slideshowImages.classList.add('slideshow-left')
  slideshowRight.classList.add('slideshow-right')

  const textItems = slideshowText.querySelectorAll('.item')
  const leftItems = slideshowImages.querySelectorAll('.item')
  const rightItems = slideshowRight.querySelectorAll('.item')

  const itemsLength = textItems.length

  let currentIndex = 0
  let previousIndex = itemsLength - 1
  let nextIndex = currentIndex + 1

  let intervalSlideshow = null

  function nextSlide() {
    // Slideshow left
    leftItems[previousIndex].classList.remove('active', 'move-down')
    leftItems[currentIndex].classList.replace('active', 'move-down')
    leftItems[nextIndex].classList.add('active')

    // Slideshow right
    rightItems[previousIndex].classList.remove('active', 'move-up')
    rightItems[currentIndex].classList.replace('active', 'move-up')
    rightItems[nextIndex].classList.add('active')

    // Texts
    textItems[previousIndex].classList.remove('active', 'move-down')
    textItems[currentIndex].classList.replace('active', 'move-down')
    textItems[nextIndex].classList.add('active')

    // update indexes
    currentIndex = currentIndex + 1 === itemsLength ? 0 : currentIndex + 1
    nextIndex = currentIndex === itemsLength - 1 ? 0 : currentIndex + 1
    previousIndex = currentIndex === 0 ? itemsLength - 1 : currentIndex - 1
  }

  function autoStartSlideshow() {
    intervalSlideshow = setInterval(nextSlide, 2000)
    setTimeout(nextSlide, 250)

  }

  // click on overlay to stop slideshow
  overlay.addEventListener('click', () => {
    clearInterval(intervalSlideshow)
    splitSlideshow.classList.add('animate')
    setTimeout(() => {
      splitSlideshow.remove()
    }, 1000)
  })

  window.sumaqSplitSlideshow = {
    autosStart: autoStartSlideshow()
  }

  // setTimeout(() => {
  //   clearInterval(intervalSlideshow)
  // }, 8000)
}

