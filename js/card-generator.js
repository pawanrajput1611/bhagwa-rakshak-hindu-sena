document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("memberCardForm");
  const cardPreview = document.getElementById("memberCardPreview");
  const previewEmpty = document.getElementById("previewEmpty");

  const downloadBtn = document.getElementById("downloadBtn");
  const downloadInfo = document.getElementById("downloadInfo");

  const memberNameInput = document.getElementById("memberName");
  const memberDistrictInput = document.getElementById("memberDistrict");
  const memberMobileInput = document.getElementById("memberMobile");
  const memberPhotoInput = document.getElementById("memberPhoto");

  const cardName = document.getElementById("cardName");
  const cardDistrict = document.getElementById("cardDistrict");
  const cardMobile = document.getElementById("cardMobile");
  const cardId = document.getElementById("cardId");
  const cardPhoto = document.getElementById("cardPhoto");


  /* =========================================================
     HELPER FUNCTIONS
  ========================================================= */

  function cleanText(value) {
    return value.trim().replace(/\s+/g, " ");
  }


  function generateMemberId() {

    const now = new Date();

    const year = now.getFullYear();

    const month = String(now.getMonth() + 1).padStart(2, "0");

    const day = String(now.getDate()).padStart(2, "0");

    const randomNumber = Math.floor(
      1000 + Math.random() * 9000
    );

    return `BRHS-${year}${month}${day}-${randomNumber}`;
  }


  function createSafeFileName(name) {

    const safeName = name
      .replace(/[<>:"/\\|?*\x00-\x1F]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    return safeName || "member";
  }


  function showError(message) {
    alert(message);
  }


  /* =========================================================
     MOBILE NUMBER VALIDATION
  ========================================================= */

  memberMobileInput.addEventListener("input", () => {

    memberMobileInput.value =
      memberMobileInput.value
        .replace(/\D/g, "")
        .slice(0, 10);

  });


  /* =========================================================
     FORM SUBMIT
  ========================================================= */

  form.addEventListener("submit", async (event) => {

    event.preventDefault();


    const memberName =
      cleanText(memberNameInput.value);

    const memberDistrict =
      cleanText(memberDistrictInput.value);

    const memberMobile =
      memberMobileInput.value.trim();

    const memberPhotoFile =
      memberPhotoInput.files[0];


    /* ---------- NAME ---------- */

    if (!memberName) {

      showError("कृपया सदस्य का पूरा नाम दर्ज करें।");

      memberNameInput.focus();

      return;
    }


    if (memberName.length < 2) {

      showError("कृपया सही नाम दर्ज करें।");

      memberNameInput.focus();

      return;
    }


    /* ---------- DISTRICT ---------- */

    if (!memberDistrict) {

      showError("कृपया जिला दर्ज करें।");

      memberDistrictInput.focus();

      return;
    }


    /* ---------- MOBILE ---------- */

    if (!/^[0-9]{10}$/.test(memberMobile)) {

      showError(
        "कृपया 10 अंकों का सही मोबाइल नंबर दर्ज करें।"
      );

      memberMobileInput.focus();

      return;
    }


    /* ---------- PHOTO ---------- */

    if (!memberPhotoFile) {

      showError(
        "कृपया सदस्य की फोटो चुनें।"
      );

      memberPhotoInput.focus();

      return;
    }


    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];


    if (!allowedTypes.includes(memberPhotoFile.type)) {

      showError(
        "कृपया JPG, PNG या WEBP फोटो चुनें।"
      );

      memberPhotoInput.value = "";

      return;
    }


    /* ---------- FILE SIZE ---------- */

    const maxFileSize =
      5 * 1024 * 1024;


    if (memberPhotoFile.size > maxFileSize) {

      showError(
        "फोटो का आकार 5 MB से कम होना चाहिए।"
      );

      memberPhotoInput.value = "";

      return;
    }


    /* =========================================================
       GENERATE MEMBER ID
    ========================================================= */

    const memberId = generateMemberId();


    /* =========================================================
       UPDATE CARD DATA
    ========================================================= */

    cardName.textContent = memberName;

    cardDistrict.textContent =
      memberDistrict;

    cardMobile.textContent =
      memberMobile;

    cardId.textContent =
      memberId;


    /* =========================================================
       READ MEMBER PHOTO
    ========================================================= */

    const reader = new FileReader();


    reader.onload = function (e) {

      cardPhoto.onload = function () {

        /* ---------- SHOW CARD ---------- */

        previewEmpty.style.display = "none";

        cardPreview.style.display = "block";

        downloadBtn.style.display = "block";

        downloadInfo.style.display = "block";


        /* ---------- SCROLL TO CARD ON MOBILE ---------- */

        setTimeout(() => {

          if (window.innerWidth <= 950) {

            cardPreview.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });

          }

        }, 150);

      };


      cardPhoto.onerror = function () {

        showError(
          "फोटो लोड नहीं हो सकी। कृपया दूसरी फोटो चुनें।"
        );

        cardPreview.style.display = "none";

        downloadBtn.style.display = "none";

        downloadInfo.style.display = "none";

      };


      cardPhoto.src = e.target.result;

    };


    reader.onerror = function () {

      showError(
        "फोटो पढ़ने में समस्या हुई। कृपया दूसरी फोटो चुनें।"
      );

    };


    reader.readAsDataURL(memberPhotoFile);

  });


  /* =========================================================
     DOWNLOAD MEMBER CARD
  ========================================================= */

  downloadBtn.addEventListener("click", async () => {

    if (!window.html2canvas) {

      showError(
        "कार्ड डाउनलोड सिस्टम अभी उपलब्ध नहीं है। कृपया इंटरनेट कनेक्शन जांचें।"
      );

      return;
    }


    if (
      cardPreview.style.display === "none" ||
      !cardPhoto.src
    ) {

      showError(
        "पहले सदस्य कार्ड तैयार करें।"
      );

      return;
    }


    /* ---------- BUTTON STATE ---------- */

    const originalText =
      downloadBtn.textContent;

    downloadBtn.disabled = true;

    downloadBtn.textContent =
      "⏳ कार्ड तैयार हो रहा है...";


    try {

      /*
        Scale 3:
        Original preview की तुलना में
        ज्यादा high-resolution PNG तैयार करेगा।
      */

      const canvas =
        await html2canvas(cardPreview, {

          scale: 3,

          useCORS: true,

          allowTaint: false,

          backgroundColor: null,

          logging: false,

          imageTimeout: 15000

        });


      /* =====================================================
         PNG DATA
      ===================================================== */

      const dataUrl =
        canvas.toDataURL(
          "image/png",
          1.0
        );


      /* =====================================================
         FILE NAME
      ===================================================== */

      const name =
        createSafeFileName(
          cleanText(memberNameInput.value)
        );


      const fileName =
        `Bhagwa-Rakshak-Hindu-Sena-${name}.png`;


      /* =====================================================
         DOWNLOAD
      ===================================================== */

      const link =
        document.createElement("a");

      link.href = dataUrl;

      link.download = fileName;

      link.style.display = "none";

      document.body.appendChild(link);

      link.click();

      document.body.removeChild(link);


      /* =====================================================
         SUCCESS
      ===================================================== */

      downloadBtn.textContent =
        "✅ कार्ड डाउनलोड हो गया";

      downloadInfo.textContent =
        "✅ आपका सदस्य कार्ड PNG में तैयार है।";

      downloadInfo.style.display = "block";


      /* थोड़ी देर बाद button text वापस */

      setTimeout(() => {

        downloadBtn.textContent =
          originalText;

        downloadBtn.disabled = false;

      }, 2500);


    } catch (error) {

      console.error(
        "Card download error:",
        error
      );


      showError(
        "कार्ड डाउनलोड करते समय समस्या हुई। कृपया दोबारा प्रयास करें।"
      );


      downloadBtn.textContent =
        originalText;

      downloadBtn.disabled = false;

    }

  });


  /* =========================================================
     PREVENT DOUBLE SUBMISSION WHILE GENERATING
  ========================================================= */

  form.addEventListener("keydown", (event) => {

    if (
      event.key === "Enter" &&
      event.target.tagName !== "BUTTON"
    ) {

      event.preventDefault();

    }

  });


  /* =========================================================
     RESET DOWNLOAD MESSAGE WHEN NEW PHOTO SELECTED
  ========================================================= */

  memberPhotoInput.addEventListener("change", () => {

    downloadInfo.style.display = "none";

    downloadBtn.style.display = "none";

  });

});
