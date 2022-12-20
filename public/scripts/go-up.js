(() => {
  // src/components/01-atoms/go-up/go-up.js
  var button = document.getElementById("go-up");
  var initGoUp = () => {
    button.addEventListener("click", () => {
      window.scrollTo(0, 0);
    });
  };
  window.sumaqGoUp = {
    button,
    init: initGoUp
  };
})();
