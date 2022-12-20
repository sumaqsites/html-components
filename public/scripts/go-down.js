(() => {
  // src/components/01-atoms/go-down/go-down.js
  var button = document.getElementById("go-down");
  var initGoDown = () => {
    button.addEventListener("click", () => {
      window.scrollTo(0, document.body.offsetHeight);
    });
  };
  window.sumaqGoDown = {
    button,
    init: initGoDown
  };
})();
