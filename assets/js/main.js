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
   * 3. Galerie — filtr, rozbalení, lightbox
   * ------------------------------------------------------------------- */
  function initGalleryFilters() {
    var filterButtons = document.querySelectorAll('.gallery-filters .pill[data-filter]');
    var galleryGrid = document.getElementById('galleryGrid');
    if (!filterButtons.length || !galleryGrid) return;

    var currentFilter = 'all';

    // Skrývání přes třídu .is-filtered-out (ne inline style): inline style
    // by přebil CSS pravidlo pro [data-expanded="false"] .gallery-item--extra
    // a rozbil kombinaci filtru s rozbalením. Třída se v CSS jen doplní
    // vedle existujícího pravidla pro extra položky.
    function applyFilter() {
      var items = galleryGrid.querySelectorAll('.gallery-item');
      items.forEach(function (item) {
        var matches = currentFilter === 'all' || item.dataset.category === currentFilter;
        item.classList.toggle('is-filtered-out', !matches);
      });
    }

    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        currentFilter = button.dataset.filter;
        filterButtons.forEach(function (b) {
          b.classList.toggle('is-active', b === button);
        });
        applyFilter();
      });
    });
  }

  function initGalleryExpand() {
    var galleryExpand = document.getElementById('galleryExpand');
    var galleryGrid = document.getElementById('galleryGrid');
    if (!galleryExpand || !galleryGrid) return;

    galleryExpand.addEventListener('click', function () {
      var isExpanded = galleryGrid.dataset.expanded === 'true';
      var next = !isExpanded;
      galleryGrid.dataset.expanded = String(next);
      galleryExpand.setAttribute('aria-expanded', String(next));
      galleryExpand.textContent = next ? 'Zobrazit méně' : 'Zobrazit celou galerii';
    });
  }

  function initLightbox() {
    var lightbox = document.getElementById('lightbox');
    var lightboxBody = document.getElementById('lightboxBody');
    var galleryGrid = document.getElementById('galleryGrid');
    if (!lightbox || !lightboxBody) return;

    var lastTrigger = null;

    function getFocusable() {
      var panel = lightbox.querySelector('.lightbox__panel');
      if (!panel) return [];
      return Array.prototype.slice.call(
        panel.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
      );
    }

    function openLightbox(item) {
      var caption = item.dataset.caption || '';

      // Struktura odpovídá .photo-placeholder uvnitř galerie, jen naplněná
      // popiskem z data-caption.
      lightboxBody.innerHTML =
        '<figure class="photo-placeholder photo-placeholder--lightbox">' +
        '<svg class="photo-placeholder__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
        '<rect x="2.5" y="6" width="19" height="14" rx="2"></rect>' +
        '<circle cx="12" cy="13" r="4"></circle>' +
        '<path d="M8 6l1.5-2h5L16 6"></path>' +
        '</svg>' +
        '<figcaption class="photo-placeholder__caption"></figcaption>' +
        '</figure>';
      var figcaption = lightboxBody.querySelector('figcaption');
      if (figcaption) figcaption.textContent = caption;

      lastTrigger = item;
      lightbox.removeAttribute('hidden');

      var closeButton = lightbox.querySelector('.lightbox__close');
      if (closeButton) closeButton.focus();
    }

    function closeLightbox() {
      if (lightbox.hidden) return;
      lightbox.setAttribute('hidden', '');
      lightboxBody.innerHTML = '';
      var trigger = lastTrigger;
      lastTrigger = null;
      if (trigger) trigger.focus();
    }

    if (galleryGrid) {
      galleryGrid.addEventListener('click', function (event) {
        var item = event.target.closest('.gallery-item');
        if (!item || !galleryGrid.contains(item)) return;
        openLightbox(item);
      });
    }

    var closeTriggers = lightbox.querySelectorAll('[data-lightbox-close]');
    closeTriggers.forEach(function (el) {
      el.addEventListener('click', closeLightbox);
    });

    // Escape a focus trap fungují jen dokud je lightbox otevřený.
    document.addEventListener('keydown', function (event) {
      if (lightbox.hidden) return;

      if (event.key === 'Escape') {
        closeLightbox();
        return;
      }

      if (event.key === 'Tab') {
        var focusable = getFocusable();
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
    initGalleryFilters();
    initGalleryExpand();
    initLightbox();
    initContactForm();
    initFooterYear();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
