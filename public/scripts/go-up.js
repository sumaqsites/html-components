(() => {
  // src/scripts/go-up.js
  function initGoUp() {
    const button = document.getElementById("go-up");
    button.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
  }
  var go_up_default = initGoUp;
})();
