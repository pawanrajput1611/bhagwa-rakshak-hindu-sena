document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('memberCardForm');
    const cardPreview = document.getElementById('memberCardPreview');
    const downloadBtn = document.getElementById('downloadBtn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const memberName = document.getElementById('memberName').value;
        const memberDistrict = document.getElementById('memberDistrict').value;
        const memberMobile = document.getElementById('memberMobile').value;
        const memberPhotoFile = document.getElementById('memberPhoto').files[0];

        // Unique ID बनाएं (उदाहरण के लिए)
        const memberId = 'ID-' + Math.floor(Math.random() * 100000);

        // Card पर जानकारी दिखाएं
        document.getElementById('cardName').textContent = memberName;
        document.getElementById('cardDistrict').textContent = memberDistrict;
        document.getElementById('cardMobile').textContent = memberMobile;
        document.getElementById('cardId').textContent = memberId;

        // फोटो को कार्ड पर दिखाएं
        const reader = new FileReader();
        reader.onload = function(e) {
            const cardPhoto = document.getElementById('cardPhoto');
            cardPhoto.src = e.target.result;

            // फोटो के पूरी तरह से लोड होने का इंतज़ार करें
            cardPhoto.onload = function() {
                // कार्ड को दिखाना
                cardPreview.style.display = 'block';
                downloadBtn.style.display = 'block';
            };
        };
        reader.readAsDataURL(memberPhotoFile);
    });

    // डाउनलोड बटन पर क्लिक करने पर
    downloadBtn.addEventListener('click', () => {
        // DOM-to-image को कॉल करने से पहले 500ms (आधा सेकंड) का इंतज़ार करें
        setTimeout(() => {
            domtoimage.toPng(cardPreview)
                .then(function (dataUrl) {
                    // PNG इमेज को डाउनलोड करें
                    window.saveAs(dataUrl, 'सदस्य-कार्ड.png');
                })
                .catch(function (error) {
                    console.error('कार्ड डाउनलोड करने में कुछ गड़बड़ हो गई!', error);
                });
        }, 500); // 500ms का विलंब यहाँ है
    });
});
