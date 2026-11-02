document.addEventListener("DOMContentLoaded", () => {
  
  // ==========================================
  // ۱. اسلایدر اصلی
  // ==========================================
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const currentCounter = document.querySelector(".counter-current");
  let currentIndex = 0;
  let slideInterval;

  const toPersian = (num) => String(num).padStart(2, "0").replace(/\d/g, d => "۰۱۲۳۴۵۶۷۸۹"[d]);

  if (currentCounter) {
    currentCounter.textContent = toPersian(1);
  }

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    
    if (currentCounter) currentCounter.textContent = toPersian(index + 1);
    currentIndex = index;
  }

  function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    goToSlide(next);
  }

  function startSlide() {
    stopSlide();
    slideInterval = setInterval(nextSlide, 6000);
  }

  function stopSlide() {
    clearInterval(slideInterval);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      startSlide();
    });
  });

  const sliderArea = document.getElementById("mainSlider");
  if (sliderArea) {
    sliderArea.addEventListener("mouseenter", stopSlide);
    sliderArea.addEventListener("mouseleave", startSlide);
  }

  if (slides.length > 0) {
    startSlide();
  }

  // ==========================================
  // ۲. فیلتر تب‌ها (دسته‌بندی)
  // ==========================================
  const tabs = document.querySelectorAll(".tab");
  const cards = document.querySelectorAll(".story-card");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");

      const category = tab.dataset.cat;

      cards.forEach(card => {
        if (category === "all" || card.dataset.cat === category) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // ==========================================
  // ۳. اسکرول بی‌نهایت نوار فوری
  // ==========================================
  const ticker = document.getElementById("ticker");
  if (ticker) {
    ticker.innerHTML += ticker.innerHTML;
  }

  // ==========================================
  // ۴. حالت تاریک / روشن (Dark Mode)
  // ==========================================
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  // بررسی تم ذخیره‌شده در مرورگر
  const savedTheme = localStorage.getItem("kouleh-theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const isDark = body.classList.contains("dark-mode");

      // تغییر آیکون
      if (themeIcon) {
        if (isDark) {
          themeIcon.classList.remove("fa-moon");
          themeIcon.classList.add("fa-sun");
        } else {
          themeIcon.classList.remove("fa-sun");
          themeIcon.classList.add("fa-moon");
        }
      }

      // ذخیره در مرورگر
      localStorage.setItem("kouleh-theme", isDark ? "dark" : "light");
    });
  }

  // ==========================================
  // ۵. دکمه بازگشت به بالا (Back to Top)
  // ==========================================
  const backToTopBtn = document.getElementById("backToTop");

  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    });

    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================
  // ۶. نشانگر پیشرفت مطالعه (Reading Progress)
  // ==========================================
  const progressBar = document.getElementById("readingProgress");

  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      progressBar.style.width = progress + "%";
    });
  }

  // ==========================================
  // ۷. سیستم ذخیره خبر (Bookmark)
  // ==========================================
  const bookmarkBtns = document.querySelectorAll(".bookmark-btn");

  // لود کردن لیست ذخیره‌شده‌ها از مرورگر
  let savedBookmarks = JSON.parse(localStorage.getItem("kouleh-bookmarks") || "[]");

  bookmarkBtns.forEach((btn, index) => {
    // اختصاص یک شناسه یکتا به هر دکمه بر اساس ایندکس
    const bookmarkId = "bookmark-" + index;

    // اگر قبلاً ذخیره شده بود، حالت فعال رو اعمال کن
    if (savedBookmarks.includes(bookmarkId)) {
      btn.classList.add("saved");
    }

    btn.addEventListener("click", (e) => {
      e.preventDefault(); // جلوگیری از کلیک روی لینک والد
      e.stopPropagation(); // جلوگیری از اجرای رویدادهای والد

      btn.classList.toggle("saved");

      if (btn.classList.contains("saved")) {
        // اضافه کردن به لیست ذخیره‌شده‌ها
        if (!savedBookmarks.includes(bookmarkId)) {
          savedBookmarks.push(bookmarkId);
        }
      } else {
        // حذف از لیست
        savedBookmarks = savedBookmarks.filter(id => id !== bookmarkId);
      }

      // ذخیره در مرورگر
      localStorage.setItem("kouleh-bookmarks", JSON.stringify(savedBookmarks));
    });
  });

});