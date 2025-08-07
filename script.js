document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;
    // Function to open/close the sidenav
function toggleNav() {
    const sidenav = document.getElementById("mySidenav");
    if (sidenav.style.width === "250px") {
        sidenav.style.width = "0";
    } else {
        sidenav.style.width = "250px";
    }
}
    

    window.addEventListener('scroll', () => {
        if (window.scrollY > headerHeight) {
            nav.classList.add('sticky');
        } else {
            nav.classList.remove('sticky');
        }
    });

    // You can add more JavaScript functionality here later.
    // For example, a photo carousel, a pop-up, or a form validator.
    console.log("Website loaded successfully!");
});
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('memberCardForm');
    const nameInput = document.getElementById('memberName');
    const districtInput = document.getElementById('memberDistrict');
    const mobileInput = document.getElementById('memberMobile');
    const photoInput = document.getElementById('memberPhoto');
    const cardPreview = document.getElementById('memberCardPreview');
    const downloadBtn = document.getElementById('downloadBtn');

    // Generate a unique ID on page load
    function generateUniqueId() {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 10000);
        return `BRHS${timestamp}-${random}`;
    }

    // Generate ID and store it in a variable
    const generatedId = generateUniqueId();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = nameInput.value;
        const district = districtInput.value;
        const mobile = mobileInput.value;
        
        // Read the uploaded photo
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('cardName').textContent = name;
            document.getElementById('cardDistrict').textContent = district;
            document.getElementById('cardMobile').textContent = mobile;
            document.getElementById('cardId').textContent = generatedId; // Use the stored ID
            document.getElementById('cardPhoto').src = event.target.result;
            
            cardPreview.style.display = 'block';
            downloadBtn.style.display = 'block';
        };
        reader.readAsDataURL(photoInput.files[0]);
    });

    downloadBtn.addEventListener('click', function() {
        domtoimage.toPng(cardPreview)
            .then(function(dataUrl) {
                const link = document.createElement('a');
                link.download = `${generatedId}.png`; // Use the stored ID for file name
                link.href = dataUrl;
                link.click();
            });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('memberCardForm');
    const memberNameInput = document.getElementById('memberName');
    const memberDistrictInput = document.getElementById('memberDistrict');
    const memberMobileInput = document.getElementById('memberMobile');
    const memberPhotoInput = document.getElementById('memberPhoto');
    const generateBtn = document.querySelector('.generate-btn');
    const downloadBtn = document.getElementById('downloadBtn');
    const cardPreview = document.getElementById('memberCardPreview');
    const cardNameSpan = document.getElementById('cardName');
    const cardDistrictSpan = document.getElementById('cardDistrict');
    const cardMobileSpan = document.getElementById('cardMobile');
    const cardIdSpan = document.getElementById('cardId');
    const cardPhoto = document.getElementById('cardPhoto');

    // एक रैंडम (यादृच्छिक) आईडी बनाने का फंक्शन
    function generateRandomId() {
        return Math.floor(100000 + Math.random() * 900000); // 6 अंकों का नंबर
    }

    // फॉर्म सबमिशन को संभालना
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // फॉर्म को सबमिट होने से रोकना

        // फॉर्म से वैल्यू लेना
        const name = memberNameInput.value;
        const district = memberDistrictInput.value;
        const mobile = memberMobileInput.value;
        const photoFile = memberPhotoInput.files[0];

        // कार्ड को फॉर्म के डेटा से अपडेट करना
        cardNameSpan.textContent = name;
        cardDistrictSpan.textContent = district;
        cardMobileSpan.textContent = mobile;
        cardIdSpan.textContent = generateRandomId();

        // फ़ोटो अपलोड को संभालना
        if (photoFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                cardPhoto.src = e.target.result;
                // फ़ोटो लोड होने के बाद कार्ड और डाउनलोड बटन दिखाएं
                cardPreview.style.display = 'block';
                downloadBtn.style.display = 'block';
            };
            reader.readAsDataURL(photoFile);
        } else {
            // यदि कोई फ़ोटो नहीं है, तो बस कार्ड और डाउनलोड बटन दिखाएं
            cardPreview.style.display = 'block';
            downloadBtn.style.display = 'block';
        }
    });

    // डाउनलोड बटन पर क्लिक को संभालना
    downloadBtn.addEventListener('click', function() {
        const cardElement = document.getElementById('memberCardPreview');
        
        // dom-to-image का उपयोग करके कार्ड का PNG बनाएं
        domtoimage.toPng(cardElement)
            .then(function (dataUrl) {
                // FileSaver.js का उपयोग करके इमेज को डाउनलोड करें
                window.saveAs(dataUrl, 'सदस्य-कार्ड-' + cardNameSpan.textContent + '.png');
            })
            .catch(function (error) {
                console.error('oops, something went wrong!', error);
            });
    });
});
