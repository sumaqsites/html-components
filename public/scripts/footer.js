function initNavbar() {
  const button = document.getElementById('menu-icon')
  const navbar = document.querySelector('.navbar')
  const navbarslide = document.querySelector('.navbar-slide')

  if (button) {
    button.addEventListener('click', () => {
      if (navbar) {
        navbar.classList.toggle('active')
      }
      if (navbarslide) {
        navbarslide.classList.toggle('active')
      }
    })
  }
}

export { initNavbar }
export default initNavbar
