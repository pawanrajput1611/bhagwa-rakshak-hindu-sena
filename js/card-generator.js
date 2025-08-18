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

        const memberId = 'ID-' + Math.floor(Math.random() * 100000);

        document.getElementById('cardName').textContent = memberName;
        document.getElementById('cardDistrict').textContent = memberDistrict;
        document.getElementById('cardMobile').textContent = memberMobile;
        document.getElementById('cardId').textContent = memberId;

        const reader = new FileReader();
        reader.onload = function(e) {
            const cardPhoto = document.getElementById('cardPhoto');
            cardPhoto.src = e.target.result;

            cardPhoto.onload = function() {
                cardPreview.style.display = 'block';
                downloadBtn.style.display = 'block';
            };
        };
        reader.readAsDataURL(memberPhotoFile);
    });

    // डाउनलोड बटन पर क्लिक करने पर
    downloadBtn.addEventListener('click', () => {
        // html2canvas का उपयोग करें
        html2canvas(cardPreview, {
            useCORS: true,
            allowTaint: true
        }).then(function(canvas) {
            const dataUrl = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'सदस्य-कार्ड.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(function(error) {
            console.error('कार्ड डाउनलोड करने में कुछ गड़बड़ हो गई!', error);
        });
    });
});
