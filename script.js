/* =========================================================
   भगवा रक्षक हिन्दू सेना
   Main Website JavaScript
   Version: 2026
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
       ===================================================== */

    const sidenav = document.getElementById("mySidenav");
    const menuButton = document.querySelector(".hamburger-menu-icon");
    const closeButton = document.querySelector(".closebtn");

    window.toggleNav = function () {
        if (!sidenav) return;

        const isOpen = sidenav.classList.toggle("open");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", String(isOpen));
        }

        document.body.classList.toggle("menu-open", isOpen);
    };

    if (closeButton) {
        closeButton.addEventListener("click", (event) => {
            event.preventDefault();

            if (sidenav) {
                sidenav.classList.remove("open");
            }

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
            }

            document.body.classList.remove("menu-open");
        });
    }

    /* Close mobile menu after clicking a normal link */
    if (sidenav) {
        sidenav.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {

                if (link.classList.contains("closebtn")) {
                    return;
                }

                if (!link.closest(".dropdown")) {
                    sidenav.classList.remove("open");

                    if (menuButton) {
                        menuButton.setAttribute("aria-expanded", "false");
                    }

                    document.body.classList.remove("menu-open");
                }
            });
        });
    }


    /* =====================================================
       MOBILE DROPDOWN
       ===================================================== */

    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {

        const dropdownLink = dropdown.querySelector(":scope > a");

        if (!dropdownLink) return;

        dropdownLink.addEventListener("click", (event) => {

            /* Mobile only */
            if (window.innerWidth <= 820) {

                event.preventDefault();

                dropdowns.forEach((item) => {
                    if (item !== dropdown) {
                        item.classList.remove("open");
                    }
                });

                dropdown.classList.toggle("open");
            }
        });
    });


    /* =====================================================
       CLOSE MENU WITH ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key !== "Escape") return;

        if (sidenav) {
            sidenav.classList.remove("open");
        }

        dropdowns.forEach((dropdown) => {
            dropdown.classList.remove("open");
        });

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }

        document.body.classList.remove("menu-open");
    });


    /* =====================================================
       CLOSE MENU WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", (event) => {

        if (!sidenav || !sidenav.classList.contains("open")) {
            return;
        }

        const clickedInsideMenu = sidenav.contains(event.target);
        const clickedMenuButton = menuButton && menuButton.contains(event.target);

        if (!clickedInsideMenu && !clickedMenuButton) {

            sidenav.classList.remove("open");

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
            }

            document.body.classList.remove("menu-open");
        }
    });


    /* =====================================================
       CURRENT PAGE
       ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a[href]").forEach((link) => {

        const href = link.getAttribute("href");

        if (!href || href === "#" || href.startsWith("javascript:")) {
            return;
        }

        const linkPage = href.split("/").pop();

        if (linkPage === currentPage) {
            link.setAttribute("aria-current", "page");
            link.classList.add("current-page");
        }
    });


    /* =====================================================
       DYNAMIC COPYRIGHT YEAR
       ===================================================== */

    const currentYear = new Date().getFullYear();

    document.querySelectorAll(".copyright-year").forEach((element) => {
        element.textContent = currentYear;
    });


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop = document.querySelector("[data-back-to-top]");

    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        };

        window.addEventListener("scroll", updateBackToTop, {
            passive: true
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });

        updateBackToTop();
    }


    /* =====================================================
       IMAGE ERROR HANDLING
       ===================================================== */

    document.querySelectorAll("img").forEach((image) => {

        image.addEventListener("error", () => {

            image.classList.add("image-error");

            /*
             * Missing images are intentionally not replaced.
             * This keeps the original website behavior while
             * preventing JavaScript errors.
             */
        });
    });


    /* =====================================================
       FORM SUBMIT PROTECTION
       ===================================================== */

    document.querySelectorAll("form").forEach((form) => {

        form.addEventListener("submit", () => {

            const submitButton =
                form.querySelector('button[type="submit"], input[type="submit"]');

            if (!submitButton) return;

            /*
             * Only add visual loading state.
             * Actual form submission logic will be handled
             * separately when we upgrade join/contact pages.
             */
            submitButton.classList.add("is-loading");
        });
    });


    /* =====================================================
       WINDOW RESIZE
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 820 && sidenav) {

            sidenav.classList.remove("open");

            dropdowns.forEach((dropdown) => {
                dropdown.classList.remove("open");
            });

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
            }

            document.body.classList.remove("menu-open");
        }
    });


    console.log("भगवा रक्षक हिन्दू सेना वेबसाइट — JavaScript loaded.");
});
