document.addEventListener("DOMContentLoaded", () => {

  /* NAV / MOBILE */
  const mobileBtn = document.querySelector(".mobile-menu");
  const closeBtn  = document.querySelector(".close-menu");
  const navList   = document.querySelector(".nav-list");
  const navLinks  = document.querySelectorAll(".nav-list a");
  const header    = document.getElementById("site-header");
  const backToTop = document.getElementById("back-to-top");

  function openMenu() {
    mobileBtn.classList.add("active");
    navList.classList.add("active");
    mobileBtn.setAttribute("aria-expanded","true");
    document.body.style.overflow = "hidden";
  }

  function closeMenu() {
    mobileBtn.classList.remove("active");
    navList.classList.remove("active");
    mobileBtn.setAttribute("aria-expanded","false");
    document.body.style.overflow = "";
  }

  mobileBtn.addEventListener("click", (e) => {
    const isOpen = mobileBtn.classList.contains("active");
    isOpen ? closeMenu() : openMenu();
  });

  closeBtn.addEventListener("click", closeMenu);

  // Close when clicking a nav link (mobile)
  navLinks.forEach(link => link.addEventListener("click", () => {
    if (navList.classList.contains("active")) closeMenu();
  }));

  // Close when clicking outside the menu (mobile)
  document.addEventListener("click", function(e){
    if (!navList.classList.contains("active")) return;
    const isInsideNav = e.target.closest(".nav-list") || e.target.closest(".mobile-menu") || e.target.closest(".close-menu");
    if (!isInsideNav) closeMenu();
  });

  // ESC to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navList.classList.contains("active")) closeMenu();
  });

  /* SMOOTH SCROLL (header offset) */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e){
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = header.offsetHeight + 12;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ACTIVE LINK ON SCROLL */
  const sections = [...document.querySelectorAll('main section[id]')];
  function updateActive() {
    const scrollPos = window.scrollY + header.offsetHeight + 30;
    let current = sections.length ? sections[0].id : '';
    sections.forEach(sec => { if (sec.offsetTop <= scrollPos) current = sec.id; });
    navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
  }
  window.addEventListener('scroll', updateActive);
  updateActive();

  /* HEADER SHADOW */
  window.addEventListener('scroll', () => header.classList.toggle('scrolled', window.scrollY > 20));

  /* BACK TO TOP */
  window.addEventListener('scroll', () => {
    backToTop.style.display = window.pageYOffset > 600 ? 'flex' : 'none';
  });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* FORM MOCK */
  const form = document.getElementById('catalog-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Recebemos sua solicitação! Em breve entraremos em contato.');
      form.reset();
    });
  }

  /* VIDEO GALLERY: troca vídeo principal ao clicar nas miniaturas */
  const mainVideo = document.getElementById('mainVideo');
  const thumbs = document.querySelectorAll('.thumb');

  thumbs.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-video');
      if (!id) return;
      // build embed url with autoplay=1 off to avoid autoplay sometimes blocked; keep controls
      const newSrc = `https://www.youtube.com/embed/${id}`;
      mainVideo.setAttribute('src', newSrc);
      // mark active thumb
      thumbs.forEach(t => t.classList.remove('active'));
      btn.classList.add('active');
      // scroll to video on small screens
      if (window.innerWidth < 768) {
        const rect = mainVideo.getBoundingClientRect();
        window.scrollTo({ top: window.scrollY + rect.top - header.offsetHeight - 12, behavior: 'smooth' });
      }
    });
  });

});
