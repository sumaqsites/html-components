(() => {
  // src/scripts/go-down.js
  function initGoDown() {
    const button = document.getElementById("go-down");
    button.addEventListener("click", () => {
      window.scrollTo(0, document.body.offsetHeight);
    });
  }
  var go_down_default = initGoDown;
})();
