document.addEventListener('DOMContentLoaded', () => {
  /* ACCORDION */
  const accordionItems = document.querySelectorAll('.accordion-item');

  function openAccordion(item) {
    const content = item.querySelector('.accordion-content');
    if (!content) return;
    item.classList.add('active');
    content.style.maxHeight = content.scrollHeight + 'px';
  }

  function closeAccordion(item) {
    const content = item.querySelector('.accordion-content');
    if (!content) return;
    item.classList.remove('active');
    content.style.maxHeight = null;
  }

  accordionItems.forEach((item) => {
    const button = item.querySelector('.accordion-toggle');
    if (!button) return;

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      accordionItems.forEach((other) => closeAccordion(other));
      if (!isActive) openAccordion(item);
    });
  });

  const activeItem = document.querySelector('.accordion-item.active');
  if (activeItem) openAccordion(activeItem);

  window.addEventListener('resize', () => {
    const currentActive = document.querySelector('.accordion-item.active');
    if (!currentActive) return;
    const content = currentActive.querySelector('.accordion-content');
    if (content) content.style.maxHeight = content.scrollHeight + 'px';
  });

  /* CONTACT FORM */
  const contactForm = document.getElementById('contactForm');
  const successMsg = document.getElementById('successMsg');

  if (contactForm && successMsg) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      successMsg.style.display = 'block';
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      contactForm.reset();
    });
  }

  /* NEWSLETTER */
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Inscription enregistrée.');
      newsletterForm.reset();
    });
  }

  /* LANG SWITCHER OPEN/CLOSE */
  const langSwitcher = document.querySelector('.lang-switcher');
  const langToggle = document.querySelector('.lang-toggle');

  if (langSwitcher && langToggle) {
    langToggle.addEventListener('click', () => {
      langSwitcher.classList.toggle('open');
      const expanded = langToggle.getAttribute('aria-expanded') === 'true';
      langToggle.setAttribute('aria-expanded', String(!expanded));
    });

    document.addEventListener('click', (e) => {
      if (!langSwitcher.contains(e.target)) {
        langSwitcher.classList.remove('open');
        langToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* LANGUAGE CHANGE */
  const langLinks = document.querySelectorAll('.lang-menu a');

  function setLanguage(lang) {
    const translatableElements = document.querySelectorAll('[data-fr][data-en]');

    translatableElements.forEach((el) => {
      const text = el.getAttribute(`data-${lang}`);
      if (text !== null) {
        el.innerHTML = text;
      }
    });

    if (langToggle) {
      langToggle.innerHTML = `${lang.toUpperCase()} <i class="fas fa-chevron-down"></i>`;
      langToggle.setAttribute('aria-expanded', 'false');
    }

    if (langSwitcher) {
      langSwitcher.classList.remove('open');
    }

    localStorage.setItem('site-language', lang);
  }

  langLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = link.dataset.lang;
      if (lang === 'fr' || lang === 'en') {
        setLanguage(lang);
      }
    });
  });

  const savedLanguage = localStorage.getItem('site-language');
  if (savedLanguage === 'fr' || savedLanguage === 'en') {
    setLanguage(savedLanguage);
  }

  /* MOBILE MENU */
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
});