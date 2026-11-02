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

});