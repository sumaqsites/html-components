const button = document.getElementById('go-up')
const initGoUp = () => {
  button.addEventListener('click', () => {
    window.scrollTo(0, 0)
  })

  // function show(scrollProgress, scrollValue) {
  //   if (scrollProgress >= scrollValue) {
  //     button.style.visibility = 'visible'
  //   }
  // }

  // function hide(scrollProgress, scrollValue) {
  //   if (scrollProgress <= scrollValue) {
  //     button.style.visibility = 'hidden'
  //   }
  // }

  // return {
  //   button,
  //   show,
  //   hide
  // }
}

window.sumaqGoUp = {
  button,
  init: initGoUp
}
