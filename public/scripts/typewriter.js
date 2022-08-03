(() => {
  // src/scripts/typewriter.js
  function initTypewriter() {
    const elements = document.getElementsByClassName("typewriter");
    for (let index = 0; index < elements.length; index++) {
      let animate = function() {
        if (i < text.length) {
          element.textContent += text.charAt(i);
          i++;
          setTimeout(animate, speed);
        }
      };
      const element = elements.item(index);
      const text = element.getAttribute("data-text") || "";
      const speed = element.getAttribute("data-speed") ? Number(element.getAttribute("data-speed")) : 100;
      const caret = element.getAttribute("data-caret");
      if (!caret) {
        element.setAttribute("data-caret", "_");
      }
      element.textContent = "";
      let i = 0;
      animate();
    }
  }
  var typewriter_default = initTypewriter;
})();
