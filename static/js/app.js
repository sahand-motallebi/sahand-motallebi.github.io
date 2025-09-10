window.addEventListener("load", e => {
  /* Elements */
  const menuIcon = document.querySelector("#menu-icon");
  const navbar = document.querySelector(".navbar");
  const sections = document.querySelectorAll("section");
  const hambergerMenu = document.querySelector("#menu-icon");
  const mobileOffcanvas = document.querySelector(".mobile-offcanvas");
  const closeOffcanvasBtn = document.querySelector(".mobile-offcanvas__close-btn");
  const overlay = document.querySelector(".overlay");
  const allSectionLinks = document.querySelectorAll(".section-link");

  /* Functions */
  const showMobileOffcanvas = () => {
    mobileOffcanvas.classList.add("mobile-offcanvas--active");
    overlay.classList.add("overlay--active");
  };

  const hideMobileOffcanvas = () => {
    overlay.classList.remove("overlay--active");
    mobileOffcanvas.classList.remove("mobile-offcanvas--active");
  };

  /* Go To Related Section */
  allSectionLinks.forEach(sectionLink => {
    sectionLink.addEventListener("click", e => {
      e.preventDefault();

      // diacitve previouse link
      document.querySelectorAll(".section-link--active").forEach(item => item.classList.remove("section-link--active"));

      // active current desktop link
      e.target.classList.add("section-link--active");
      // active current mobile link
      console.log(e.target);

      // Go to releted section
      const sectionClass = sectionLink.getAttribute("data-section");
      const sectionElem = document.querySelector(`.${sectionClass}`);
      const sectionOffsetTop = sectionElem.offsetTop;
      const headerHeight = document.querySelector(".header").offsetHeight;

      window.scrollTo({
        top: sectionOffsetTop - headerHeight,
        behavior: "smooth",
      });
    });
  });

  /* ScrollSpy Feature */
  const sectionObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // diactive desktop link
          document.querySelector(".section-link--active")?.classList.remove("section-link--active");
          // diactive mobile link
          document.querySelector(".mobile-offcanvas__link.section-link--active")?.classList.remove("section-link--active");

          // active desktop link
          document.querySelector(`.section-link[data-section="${entry.target.id}"]`)?.classList.add("section-link--active");
          // active mobile link
          document.querySelector(`.mobile-offcanvas__link.section-link[data-section="${entry.target.id}"]`)?.classList.add("section-link--active");
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  sections.forEach(section => {
    sectionObserver.observe(section);
  });

  /* Swiper Config */
  const swiper = new Swiper(".projects-slider", {
    slidesPerView: 1,
    spaceBetween: 30,
    // centeredSlides: true,
    freeMode: true,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },

    breakpoints: {
      // when window width is >= 320px
      576: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  /* Show-Hide Mobile Menu */
  hambergerMenu.addEventListener("click", showMobileOffcanvas);
  overlay.addEventListener("click", hideMobileOffcanvas);
  closeOffcanvasBtn.addEventListener("click", hideMobileOffcanvas);
});
