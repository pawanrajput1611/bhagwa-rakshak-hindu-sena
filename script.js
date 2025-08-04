document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".accordion-button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const content = button.nextElementSibling;
      content.style.display =
        content.style.display === "block" ? "none" : "block";
    });
  });
});
// Accordion script for Aarti, Dharm Gatha, Kathaye etc.
document.addEventListener("DOMContentLoaded", function () {
  const acc = document.getElementsByClassName("accordion");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      const panel = this.nextElementSibling;
      panel.style.display = panel.style.display === "block" ? "none" : "block";
    });
  }
});
