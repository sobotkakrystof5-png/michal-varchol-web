'use strict';

/**
 * Michal Varchol — Malířské práce Litoměřice
 * Vanilla JS bez závislostí, bez build kroku. Načítá se s `defer`.
 * Každá oblast funkčnosti je nezávislá — chybějící element v jedné části
 * neshodí zbytek skriptu.
 */

(function () {
  /* ---------------------------------------------------------------------
   * 1. Mobilní navigace
   * ------------------------------------------------------------------- */
  function initNav() {
    var navToggle = document.getElementById('navToggle');
    var primaryNav = document.getElementById('primaryNav');
    if (!navToggle || !primaryNav) return;

    function openNav() {
      primaryNav.classList.add('is-open');
      navToggle.setAttribute('aria-expanded', 'true');
    }

    function closeNav() {
      primaryNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }

    navToggle.addEventListener('click', function () {
      if (primaryNav.classList.contains('is-open')) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Klik na odkaz v menu jen zavře menu — smooth scroll řeší CSS.
    var navLinks = primaryNav.querySelectorAll('[data-nav-link]');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        closeNav();
      });
    });

    // Klik mimo otevřené menu (a mimo tlačítko) menu zavře.
    document.addEventListener('click', function (event) {
      if (!primaryNav.classList.contains('is-open')) return;
      if (primaryNav.contains(event.target) || navToggle.contains(event.target)) return;
      closeNav();
    });

    // Escape zavře menu a vrátí fokus na tlačítko. Sdílené s lightboxem
    // v jednom document-level keydown listeneru níže.
    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape') return;
      if (!primaryNav.classList.contains('is-open')) return;
      closeNav();
      navToggle.focus();
    });
  }

  /* ---------------------------------------------------------------------
   * 2. Scrollspy
   * ------------------------------------------------------------------- */
  function initScrollspy() {
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    var navLinks = document.querySelectorAll('[data-nav-link]');
    if (!sections.length || !navLinks.length || !('IntersectionObserver' in window)) return;

    // Pás sledování je zúžený na cca 5 % výšky viewportu kolem 40 % shora —
    // pod stickly headerem, ale ještě dost vysoko, aby se sekce "chytla"
    // dřív, než ji uživatel celou proscrolluje.
    var visibility = new Map();

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          visibility.set(entry.target.id, entry.isIntersecting);
        });
        var activeSection = sections.find(function (section) {
          return visibility.get(section.id);
        });
        navLinks.forEach(function (link) {
          var isActive = Boolean(activeSection) && link.getAttribute('href') === '#' + activeSection.id;
          link.classList.toggle('is-active', isActive);
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );

    sections.forEach(function (section) {
      observer.observe(section);
    });
  }

  /* ---------------------------------------------------------------------
   * 3. Galerie — kategorie, modal s celou sadou fotek, lightbox s prev/next
   * ------------------------------------------------------------------- */
  // Počty fotek v "OTHERS" složce každé kategorie (mimo hlavní fotku) —
  // musí odpovídat souborům assets/img/galerie/<slug>/others/01.jpg…NN.jpg,
  // vygenerovaným ze zdrojových fotek ve fotky/.
  var GALLERY_CATEGORIES = {
    'drevene-fasady': { othersCount: 23 },
    'malby-interieru': { othersCount: 22 },
    'okna-dvere': { othersCount: 22 },
    'pergoly': { othersCount: 22 },
    'strikani': { othersCount: 16 }
  };

  function padNum(n) {
    return n < 10 ? '0' + n : String(n);
  }

  function initGallery() {
    var cards = document.querySelectorAll('.gallery-card[data-category]');
    var modal = document.getElementById('categoryModal');
    var modalTitle = document.getElementById('categoryModalTitle');
    var modalDesc = document.getElementById('categoryModalDesc');
    var modalGrid = document.getElementById('categoryModalGrid');
    var lightbox = document.getElementById('lightbox');
    var lightboxBody = document.getElementById('lightboxBody');
    var lightboxCounter = document.getElementById('lightboxCounter');
    if (!cards.length || !modal || !modalGrid || !lightbox || !lightboxBody) return;

    var currentImages = [];
    var currentIndex = 0;
    var modalTrigger = null;
    var lightboxTrigger = null;

    function getFocusable(panel) {
      if (!panel) return [];
      return Array.prototype.slice.call(
        panel.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
      );
    }

    function buildImages(slug, title) {
      var basePath = 'assets/img/galerie/' + slug + '/';
      var meta = GALLERY_CATEGORIES[slug];
      var images = [{ src: basePath + 'main.jpg', alt: title + ' — hlavní fotka realizace' }];
      if (meta) {
        for (var i = 1; i <= meta.othersCount; i++) {
          images.push({
            src: basePath + 'others/' + padNum(i) + '.jpg',
            alt: title + ' — fotografie ' + (i + 1) + ' z realizace'
          });
        }
      }
      return images;
    }

    /* ---- Modal kategorie ---- */
    function openCategoryModal(card) {
      var slug = card.dataset.category;
      var title = card.querySelector('.gallery-card__title');
      var desc = card.querySelector('.gallery-card__desc');
      title = title ? title.textContent : '';
      desc = desc ? desc.textContent : '';

      currentImages = buildImages(slug, title);
      modalTitle.textContent = title;
      modalDesc.textContent = desc;

      modalGrid.innerHTML = '';
      currentImages.forEach(function (img, index) {
        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'category-modal__item';
        btn.dataset.index = String(index);
        var el = document.createElement('img');
        el.src = img.src;
        el.alt = img.alt;
        el.loading = 'lazy';
        btn.appendChild(el);
        modalGrid.appendChild(btn);
      });

      modalTrigger = card;
      modal.removeAttribute('hidden');
      var closeButton = modal.querySelector('.category-modal__close');
      if (closeButton) closeButton.focus();
    }

    function closeCategoryModal() {
      if (modal.hidden) return;
      modal.setAttribute('hidden', '');
      modalGrid.innerHTML = '';
      var trigger = modalTrigger;
      modalTrigger = null;
      if (trigger) trigger.focus();
    }

    cards.forEach(function (card) {
      card.addEventListener('click', function () {
        openCategoryModal(card);
      });
    });

    modal.querySelectorAll('[data-category-close]').forEach(function (el) {
      el.addEventListener('click', closeCategoryModal);
    });

    /* ---- Lightbox jedné fotky s prev/next, otevírá se z modalu ---- */
    function renderLightboxImage() {
      var img = currentImages[currentIndex];
      if (!img) return;
      lightboxBody.innerHTML = '';
      var el = document.createElement('img');
      el.src = img.src;
      el.alt = img.alt;
      lightboxBody.appendChild(el);
      if (lightboxCounter) {
        lightboxCounter.textContent = (currentIndex + 1) + ' / ' + currentImages.length;
      }
    }

    function openLightbox(index, trigger) {
      currentIndex = index;
      renderLightboxImage();
      lightboxTrigger = trigger;
      lightbox.removeAttribute('hidden');
      var closeButton = lightbox.querySelector('.lightbox__close');
      if (closeButton) closeButton.focus();
    }

    function closeLightbox() {
      if (lightbox.hidden) return;
      lightbox.setAttribute('hidden', '');
      lightboxBody.innerHTML = '';
      var trigger = lightboxTrigger;
      lightboxTrigger = null;
      if (trigger) trigger.focus();
    }

    function stepLightbox(direction) {
      if (!currentImages.length) return;
      currentIndex = (currentIndex + direction + currentImages.length) % currentImages.length;
      renderLightboxImage();
    }

    modalGrid.addEventListener('click', function (event) {
      var item = event.target.closest('.category-modal__item');
      if (!item) return;
      openLightbox(Number(item.dataset.index), item);
    });

    lightbox.querySelectorAll('[data-lightbox-close]').forEach(function (el) {
      el.addEventListener('click', closeLightbox);
    });
    var prevButton = lightbox.querySelector('[data-lightbox-prev]');
    var nextButton = lightbox.querySelector('[data-lightbox-next]');
    if (prevButton) prevButton.addEventListener('click', function () { stepLightbox(-1); });
    if (nextButton) nextButton.addEventListener('click', function () { stepLightbox(1); });

    // Escape zavírá nejdřív lightbox (je nad modalem), pak až modal kategorie.
    // Focus trap se aplikuje jen na tu vrstvu, která je zrovna otevřená.
    document.addEventListener('keydown', function (event) {
      var lightboxOpen = !lightbox.hidden;
      var modalOpen = !modal.hidden;
      if (!lightboxOpen && !modalOpen) return;

      if (event.key === 'Escape') {
        if (lightboxOpen) {
          closeLightbox();
        } else {
          closeCategoryModal();
        }
        return;
      }

      if (lightboxOpen && event.key === 'ArrowLeft') {
        stepLightbox(-1);
        return;
      }
      if (lightboxOpen && event.key === 'ArrowRight') {
        stepLightbox(1);
        return;
      }

      if (event.key === 'Tab') {
        var panel = lightboxOpen
          ? lightbox.querySelector('.lightbox__panel')
          : modal.querySelector('.category-modal__panel');
        var focusable = getFocusable(panel);
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });
  }

  /* ---------------------------------------------------------------------
   * 4. Kontaktní formulář
   * ------------------------------------------------------------------- */
  function initContactForm() {
    var form = document.getElementById('contactForm');
    var formStatus = document.getElementById('formStatus');
    if (!form || !formStatus) return;

    var nameField = document.getElementById('name');
    var emailField = document.getElementById('email');
    var phoneField = document.getElementById('phone');
    var messageField = document.getElementById('message');
    var consentField = document.getElementById('consent');
    var honeypotField = document.getElementById('companyWebsite');
    var submitButton = form.querySelector('.form__submit') || form.querySelector('[type="submit"]');

    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setStatus(message, statusClass) {
      formStatus.textContent = message;
      formStatus.className = 'form__status' + (statusClass ? ' ' + statusClass : '');
    }

    function setSubmitting(isSubmitting, originalText) {
      if (!submitButton) return;
      submitButton.disabled = isSubmitting;
      submitButton.textContent = isSubmitting ? 'Odesílám…' : originalText;
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      // Honeypot: bota nesmíme na nic upozornit — předstíráme úspěch.
      if (honeypotField && honeypotField.value.trim() !== '') {
        setStatus('Děkuju za poptávku, ozvu se co nejdřív.', 'is-success');
        form.reset();
        return;
      }

      var name = nameField ? nameField.value.trim() : '';
      var email = emailField ? emailField.value.trim() : '';
      var phone = phoneField ? phoneField.value.trim() : '';
      var message = messageField ? messageField.value.trim() : '';
      var consent = Boolean(consentField && consentField.checked);

      if (name.length < 2) {
        setStatus('Vyplňte prosím jméno a příjmení, aspoň 2 znaky.', 'is-error');
        return;
      }
      if (!emailPattern.test(email)) {
        setStatus('Zadejte prosím platnou e-mailovou adresu.', 'is-error');
        return;
      }
      if (message.length < 10) {
        setStatus('Zpráva musí mít aspoň 10 znaků. Popište prosím stručně, o jakou práci jde.', 'is-error');
        return;
      }
      if (!consent) {
        setStatus('Pro odeslání je potřeba odsouhlasit zpracování osobních údajů.', 'is-error');
        return;
      }

      var originalButtonText = submitButton ? submitButton.textContent : '';
      setSubmitting(true, originalButtonText);

      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name,
          email: email,
          phone: phone,
          message: message,
          consent: consent,
          companyWebsite: honeypotField ? honeypotField.value : ''
        })
      })
        .then(function (response) {
          return response
            .json()
            .catch(function () {
              return null;
            })
            .then(function (data) {
              return { ok: response.ok, data: data };
            });
        })
        .then(function (result) {
          if (result.ok && result.data && result.data.ok) {
            setStatus('Děkuju za poptávku, ozvu se co nejdřív.', 'is-success');
            form.reset();
          } else {
            setStatus(
              'Něco se nepovedlo. Zkuste to prosím znovu, nebo mi napište přímo na mvarchy@gmail.com.',
              'is-error'
            );
          }
        })
        .catch(function () {
          setStatus(
            'Něco se nepovedlo. Zkuste to prosím znovu, nebo mi napište přímo na mvarchy@gmail.com.',
            'is-error'
          );
        })
        .finally(function () {
          setSubmitting(false, originalButtonText);
        });
    });
  }

  /* ---------------------------------------------------------------------
   * 5. Footer rok
   * ------------------------------------------------------------------- */
  function initFooterYear() {
    var yearEl = document.getElementById('year');
    if (!yearEl) return;
    yearEl.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------------------
   * Init
   * ------------------------------------------------------------------- */
  function init() {
    initNav();
    initScrollspy();
    initGallery();
    initContactForm();
    initFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
