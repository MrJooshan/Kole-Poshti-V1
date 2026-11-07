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

  if (currentCounter) currentCounter.textContent = toPersian(1);

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));
    slides[index].classList.add("active");
    dots[index].classList.add("active");
    if (currentCounter) currentCounter.textContent = toPersian(index + 1);
    currentIndex = index;
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
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

  if (slides.length > 0) startSlide();

  // ==========================================
  // ۲. فیلتر تب‌ها
  // ==========================================
  const tabs = document.querySelectorAll(".tab");
  const cards = document.querySelectorAll(".story-card");

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const category = tab.dataset.cat;

      cards.forEach(card => {
        card.style.display = (category === "all" || card.dataset.cat === category) ? "flex" : "none";
      });
    });
  });

  // ==========================================
  // ۳. نوار فوری
  // ==========================================
  const ticker = document.getElementById("ticker");
  if (ticker) ticker.innerHTML += ticker.innerHTML;

  // ==========================================
  // ۴. حالت تاریک / روشن
  // ==========================================
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;
  const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

  if (localStorage.getItem("kouleh-theme") === "dark") {
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
      if (themeIcon) {
        themeIcon.classList.toggle("fa-moon", !isDark);
        themeIcon.classList.toggle("fa-sun", isDark);
      }
      localStorage.setItem("kouleh-theme", isDark ? "dark" : "light");
    });
  }

  // ==========================================
  // ۵. بازگشت به بالا
  // ==========================================
  const backToTopBtn = document.getElementById("backToTop");
  if (backToTopBtn) {
    window.addEventListener("scroll", () => {
      backToTopBtn.classList.toggle("show", window.scrollY > 300);
    });
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // ==========================================
  // ۶. نشانگر پیشرفت مطالعه
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
  // ۷. سیستم بوکمارک
  // ==========================================
  const bookmarkBtns = document.querySelectorAll(".bookmark-btn");
  let savedBookmarks = JSON.parse(localStorage.getItem("kouleh-bookmarks") || "[]");

  bookmarkBtns.forEach((btn, index) => {
    const bookmarkId = "bookmark-" + index;
    if (savedBookmarks.includes(bookmarkId)) btn.classList.add("saved");

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle("saved");
      if (btn.classList.contains("saved")) {
        if (!savedBookmarks.includes(bookmarkId)) savedBookmarks.push(bookmarkId);
      } else {
        savedBookmarks = savedBookmarks.filter(id => id !== bookmarkId);
      }
      localStorage.setItem("kouleh-bookmarks", JSON.stringify(savedBookmarks));
    });
  });

  // ==========================================
  // ۸. منوی هدر (انتخاب آیتم)
  // ==========================================
  const mainNav = document.getElementById("mainNav");
  if (mainNav) {
    const navItems = mainNav.querySelectorAll(".nav-item");
    navItems.forEach(item => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        navItems.forEach(n => n.classList.remove("active"));
        item.classList.add("active");
      });
    });
  }

  // ==========================================
  // ۹. جستجوی کشویی (Expandable Search)
  // ==========================================
  const searchContainer = document.getElementById("searchContainer");
  const searchToggle = document.getElementById("searchToggle");
  const searchClose = document.getElementById("searchClose");
  const searchInput = document.getElementById("searchInput");

  if (searchContainer && searchToggle && searchInput) {
    
    // باز کردن جستجو
    searchToggle.addEventListener("click", (e) => {
      e.preventDefault();
      searchContainer.classList.add("open");
      setTimeout(() => searchInput.focus(), 350);
    });

    // بستن جستجو
    const closeSearch = () => {
      searchContainer.classList.remove("open");
      searchInput.value = "";
      searchInput.blur();
    };

    if (searchClose) {
      searchClose.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        closeSearch();
      });
    }

    // کلید Escape
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && searchContainer.classList.contains("open")) {
        closeSearch();
      }
    });

    // ارسال جستجو با Enter
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
          console.log("جستجو برای:", query);
          alert(`در حال جستجوی: «${query}»\n(نمایشی — به صفحه نتایج متصل می‌شود)`);
        }
      }
    });

    // بستن هنگام کلیک بیرون
    document.addEventListener("click", (e) => {
      if (
        searchContainer.classList.contains("open") &&
        !searchContainer.contains(e.target)
      ) {
        closeSearch();
      }
    });
  }

});