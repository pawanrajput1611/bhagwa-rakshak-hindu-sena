document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('memberCardForm');
    const cardPreview = document.getElementById('memberCardPreview');
    const downloadBtn = document.getElementById('downloadBtn');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // फ़ॉर्म से इनपुट लेना
        const memberName = document.getElementById('memberName').value;
        const memberDistrict = document.getElementById('memberDistrict').value;
        const memberMobile = document.getElementById('memberMobile').value;
        const memberPhotoFile = document.getElementById('memberPhoto').files[0];

        // एक रैंडम आईडी बनाना
        const memberId = 'ID-' + Math.floor(Math.random() * 100000);

        // कार्ड पर जानकारी अपडेट करना
        document.getElementById('cardName').textContent = memberName;
        document.getElementById('cardDistrict').textContent = memberDistrict;
        document.getElementById('cardMobile').textContent = memberMobile;
        document.getElementById('cardId').textContent = memberId;

        // फ़ोटो को कार्ड पर दिखाना
        const reader = new FileReader();
        reader.onload = function(e) {
            const cardPhoto = document.getElementById('cardPhoto');
            cardPhoto.src = e.target.result;

            // यह सुनिश्चित करना कि फ़ोटो पूरी तरह लोड हो गई है
            cardPhoto.onload = function() {
                // कार्ड और डाउनलोड बटन दिखाना
                cardPreview.style.display = 'block';
                downloadBtn.style.display = 'block';
            };
        };
        reader.readAsDataURL(memberPhotoFile);
    });

    // डाउनलोड बटन पर क्लिक करने पर
    downloadBtn.addEventListener('click', () => {
        // html2canvas का उपयोग करके कार्ड को इमेज में बदलना
        html2canvas(cardPreview, {
            useCORS: true,
            allowTaint: true
        }).then(function(canvas) {
            // इमेज को PNG फ़ाइल में बदलना
            const dataUrl = canvas.toDataURL('image/png');

            // फ़ाइल को डाउनलोड करने के लिए एक लिंक बनाना
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'सदस्य-कार्ड.png';
            
            // लिंक को क्लिक करके डाउनलोड शुरू करना
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(function(error) {
            console.error('कार्ड डाउनलोड करने में कुछ गड़बड़ हो गई!', error);
        });
    });
});
