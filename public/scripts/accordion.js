(() => {
  // src/scripts/accordion.js
  function initAccordion() {
    const accordions = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < accordions.length; i++) {
      const accordion = accordions[i];
      const toggle = accordion.querySelector(".toggle");
      const close = accordion.querySelector(".close");
      const content = accordion.querySelector(".accordion-content");
      content.style.maxHeight = "0px";
      toggle.addEventListener("click", function() {
        accordion.classList.toggle("active");
        if (content.style.maxHeight !== "0px") {
          content.style.maxHeight = "0px";
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
      close.addEventListener("click", function() {
        accordion.classList.remove("active");
        content.style.maxHeight = "0px";
      });
    }
  }
  var accordion_default = initAccordion;
})();
