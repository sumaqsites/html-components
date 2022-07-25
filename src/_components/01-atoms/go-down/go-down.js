function initGoDown() {
  const button = document.getElementById('go-down')
  button.addEventListener('click', () => {
    window.scrollTo(0, document.body.offsetHeight)
  })
  // if (button) {

  // }

  // function show(scrollProgress, scrollValue) {
  //   if (scrollProgress <= scrollValue) {
  //     if (button) {
  //       button.style.visibility = 'visible'
  //     }
  //   }
  // }

  // function hide(scrollProgress, scrollValue) {
  //   if (scrollProgress >= scrollValue) {
  //     if (button) {
  //       button.style.visibility = 'hidden'
  //     }
  //   }
  // }
  // return {
  //   button,
  //   show,
  //   hide
  // }
}

export { initGoDown }
export default initGoDown
