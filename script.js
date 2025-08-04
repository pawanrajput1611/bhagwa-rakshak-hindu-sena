document.addEventListener("DOMContentLoaded", function() {
    const nav = document.querySelector('nav');
    const header = document.querySelector('header');
    const headerHeight = header.offsetHeight;

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
