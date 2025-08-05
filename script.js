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
    const idInput = document.getElementById('memberId');
    const photoInput = document.getElementById('memberPhoto');
    const cardPreview = document.getElementById('memberCardPreview');
    const downloadBtn = document.getElementById('downloadBtn');

    // Generate a unique ID on page load
    function generateUniqueId() {
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 10000);
        return `BRHS${timestamp}-${random}`;
    }

    idInput.value = generateUniqueId();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = nameInput.value;
        const district = districtInput.value;
        const mobile = mobileInput.value;
        const id = idInput.value;
        
        // Read the uploaded photo
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('cardName').textContent = name;
            document.getElementById('cardDistrict').textContent = district;
            document.getElementById('cardMobile').textContent = mobile;
            document.getElementById('cardId').textContent = id;
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
                link.download = `${idInput.value}.png`;
                link.href = dataUrl;
                link.click();
            });
    });
});
