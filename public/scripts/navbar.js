(() => {
  // src/scripts/navbar.js
  function initNavbar() {
    const button = document.getElementById("menu-icon");
    const navbar = document.querySelector(".navbar");
    if (button) {
      button.addEventListener("click", () => {
        if (navbar) {
          navbar.classList.toggle("active");
        }
      });
    }
  }
  var navbar_default = initNavbar;
})();
