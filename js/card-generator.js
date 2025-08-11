document.getElementById('memberCardForm').addEventListener('submit', function (e) {
  e.preventDefault();

  // फॉर्म डेटा प्राप्त करें
  const name = document.getElementById('memberName').value;
  const district = document.getElementById('memberDistrict').value;
  const mobile = document.getElementById('memberMobile').value;
  const photoInput = document.getElementById('memberPhoto');

  if (!photoInput.files[0]) {
    alert('कृपया फोटो अपलोड करें।');
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    // कार्ड पर डेटा सेट करें
    document.getElementById('cardName').textContent = name;
    document.getElementById('cardDistrict').textContent = district;
    document.getElementById('cardMobile').textContent = mobile;
    document.getElementById('cardId').textContent = generateRandomID();
    document.getElementById('cardPhoto').src = event.target.result;

    // कार्ड दिखाएँ
    document.getElementById('memberCardPreview').style.display = 'block';

    // डाउनलोड बटन दिखाएँ
    document.getElementById('downloadBtn').style.display = 'inline-block';
  };

  reader.readAsDataURL(photoInput.files[0]);
});

// यादृच्छिक ID जनरेट करने का फंक्शन
function generateRandomID() {
  return 'BHARAT' + Math.floor(100000 + Math.random() * 900000);
}

// डाउनलोड बटन की कार्यप्रणाली
document.getElementById('downloadBtn').addEventListener('click', function () {
  const node = document.getElementById('memberCardPreview');

  domtoimage.toBlob(node)
    .then(function (blob) {
      saveAs(blob, 'MemberCard.png');
    })
    .catch(function (error) {
      console.error('कार्ड डाउनलोड करने में त्रुटि:', error);
    });
});
