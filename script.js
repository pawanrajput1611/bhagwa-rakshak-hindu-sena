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
function generateCard() {
  const name = document.getElementById('name').value;
  const district = document.getElementById('district').value;
  const memberId = document.getElementById('memberId').value;
  const photoInput = document.getElementById('photo');
  const logoInput = document.getElementById('logo');

  const canvas = document.getElementById('card-preview');
  const ctx = canvas.getContext('2d');

  // Card Background
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, '#FF9933');
  gradient.addColorStop(1, '#FF6600');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Card Title
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('भगवा रक्षक हिन्दू सेना', canvas.width / 2, 40);

  ctx.font = '16px Arial';
  ctx.fillText('सदस्यता कार्ड', canvas.width / 2, 70);

  // Logo Drawing
  const logoWidth = 80;
  const logoHeight = 80;
  const logoX = 30;
  const logoY = 30;

  if (logoInput.files && logoInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const logoImg = new Image();
      logoImg.onload = function () {
        ctx.drawImage(logoImg, logoX, logoY, logoWidth, logoHeight);
      };
      logoImg.src = e.target.result;
    };
    reader.readAsDataURL(logoInput.files[0]);
  }

  // Card Details
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'left';
  ctx.font = '18px Arial';
  ctx.fillText(`नाम: ${name}`, 30, 150);
  ctx.fillText(`जिला: ${district}`, 30, 190);
  ctx.fillText(`सदस्य ID: ${memberId}`, 30, 230);

  // Photo Drawing
  const photoWidth = 100;
  const photoHeight = 100;
  const photoX = canvas.width - photoWidth - 30;
  const photoY = 130;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fillRect(photoX, photoY, photoWidth, photoHeight);

  if (photoInput.files && photoInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = new Image();
      img.onload = function () {
        ctx.drawImage(img, photoX, photoY, photoWidth, photoHeight);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    ctx.fillStyle = '#fff';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('फोटो', photoX + photoWidth / 2, photoY + photoHeight / 2);
  }
}

function downloadCard() {
  const canvas = document.getElementById('card-preview');
  const link = document.createElement('a');
  link.download = 'bhagwa_card.jpg';
  link.href = canvas.toDataURL('image/jpeg', 1.0);
  link.click();
}
