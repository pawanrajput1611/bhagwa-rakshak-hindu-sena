document.addEventListener("DOMContentLoaded", function() {
    // Navigation bar functionality
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    if (nav && header) {
        const headerHeight = header.offsetHeight;
        window.addEventListener('scroll', () => {
            if (window.scrollY > headerHeight) {
                nav.classList.add('sticky');
            } else {
                nav.classList.remove('sticky');
            }
        });
    }

    // Sidenav functionality
    window.toggleNav = function() {
        const sidenav = document.getElementById("mySidenav");
        if (sidenav) {
            sidenav.style.width = sidenav.style.width === "250px" ? "0" : "250px";
        }
    };
    
    // --- Member Card Generator Logic ---

    const form = document.getElementById('memberCardForm');
    if (form) {
        const memberNameInput = document.getElementById('memberName');
        const memberDistrictInput = document.getElementById('memberDistrict');
        const memberMobileInput = document.getElementById('memberMobile');
        const memberPhotoInput = document.getElementById('memberPhoto');
        const downloadBtn = document.getElementById('downloadBtn');
        const cardPreview = document.getElementById('memberCardPreview');
        const cardNameSpan = document.getElementById('cardName');
        const cardDistrictSpan = document.getElementById('cardDistrict');
        const cardMobileSpan = document.getElementById('cardMobile');
        const cardIdSpan = document.getElementById('cardId');
        const cardPhoto = document.getElementById('cardPhoto');

        // Random ID function
        function generateRandomId() {
            return Math.floor(100000 + Math.random() * 900000); // 6-digit number
        }

        // Form submission handling
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const name = memberNameInput.value;
            const district = memberDistrictInput.value;
            const mobile = memberMobileInput.value;
            const photoFile = memberPhotoInput.files[0];

            cardNameSpan.textContent = name;
            cardDistrictSpan.textContent = district;
            cardMobileSpan.textContent = mobile;
            cardIdSpan.textContent = generateRandomId();

            if (photoFile) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    cardPhoto.src = e.target.result;
                    cardPreview.style.display = 'block';
                    downloadBtn.style.display = 'block';
                };
                reader.readAsDataURL(photoFile);
            } else {
                // If no photo is selected, show a placeholder or just display the card.
                // You can add a default image here if you have one.
                cardPhoto.src = "images/default-photo.png"; // Example placeholder
                cardPreview.style.display = 'block';
                downloadBtn.style.display = 'block';
            }
        });

        // Download button handling
        downloadBtn.addEventListener('click', function() {
            const cardElement = document.getElementById('memberCardPreview');
            
            domtoimage.toPng(cardElement)
                .then(function (dataUrl) {
                    window.saveAs(dataUrl, 'सदस्य-कार्ड-' + cardNameSpan.textContent + '.png');
                })
                .catch(function (error) {
                    console.error('oops, something went wrong!', error);
                });
        });
    }

    console.log("Website loaded successfully!");
});
