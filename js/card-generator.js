document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('memberCardForm');
    const cardPreview = document.getElementById('memberCardPreview');
    const generateBtn = form.querySelector('.generate-btn');
    const downloadBtn = document.getElementById('downloadBtn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const memberName = document.getElementById('memberName').value;
        const memberDistrict = document.getElementById('memberDistrict').value;
        const memberMobile = document.getElementById('memberMobile').value;
        const memberPhotoFile = document.getElementById('memberPhoto').files[0];

        // Unique ID बनाना (उदाहरण के लिए)
        const memberId = 'ID-' + Math.floor(Math.random() * 100000);

        // Card पर जानकारी दिखाना
        document.getElementById('cardName').textContent = memberName;
        document.getElementById('cardDistrict').textContent = memberDistrict;
        document.getElementById('cardMobile').textContent = memberMobile;
        document.getElementById('cardId').textContent = memberId;

        // फोटो को कार्ड पर दिखाना
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
        // DOM-to-image लाइब्रेरी का उपयोग करें
        domtoimage.toPng(cardPreview)
            .then(function (dataUrl) {
                // PNG इमेज को डाउनलोड करें
                window.saveAs(dataUrl, 'सदस्य-कार्ड.png');
            })
            .catch(function (error) {
                console.error('कार्ड डाउनलोड करने में कुछ गड़बड़ हो गई!', error);
            });
    });
});

