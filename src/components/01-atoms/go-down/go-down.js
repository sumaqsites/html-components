const button = document.getElementById('go-down')

const initGoDown = () => {
  button.addEventListener('click', () => {
    window.scrollTo(0, document.body.offsetHeight)
  })
}
window.sumaqGoDown = {
  button,
  init: initGoDown
}
