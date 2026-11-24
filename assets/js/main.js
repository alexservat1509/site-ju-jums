/* ==========================================================================
   Ju&Jum's — Scripts du site
   JavaScript natif, sans dépendance. Chaque module ne s'active que si les
   éléments concernés sont présents dans la page.
   ========================================================================== */
(() => {
  'use strict';

  /* ------------------------------------------------------------------------
     Réglages
     ------------------------------------------------------------------------ */
  const CONFIG = {
    // Le site ne dépose aucun cookie : le bandeau est donc inutile.
    // Passez à true si vous ajoutez un outil de mesure d'audience ou tout
    // autre traceur soumis à consentement (voir README, section « Cookies »).
    cookieBanner: false,
    cookieKey: 'consentement-cookies',
    cookieMaxAgeDays: 182, // la CNIL recommande de redemander le choix au bout de 6 mois
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ------------------------------------------------------------------------
     1. En-tête : état au défilement + menu mobile
     ------------------------------------------------------------------------ */
  const header = $('[data-header]');
  const toggle = $('[data-nav-toggle]');
  const nav = $('[data-nav]');
  const desktop = window.matchMedia('(min-width: 60em)');

  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (header && toggle && nav) {
    const label = $('.nav-toggle__label', toggle);
    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

    const setNav = (open, { moveFocus = true } = {}) => {
      header.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (label) label.textContent = open ? 'Fermer' : 'Menu';
      document.body.classList.toggle('nav-open', open);
      if (!moveFocus) return;
      if (open) {
        const first = $('a', nav);
        if (first) window.setTimeout(() => first.focus(), 80);
      } else {
        toggle.focus();
      }
    };

    toggle.addEventListener('click', () => setNav(!isOpen()));

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) setNav(false);
    });

    // Fermer le menu quand on choisit un lien
    nav.addEventListener('click', (event) => {
      if (event.target.closest('a') && isOpen()) setNav(false, { moveFocus: false });
    });

    // Garder le focus dans le menu ouvert (bouton + liens)
    header.addEventListener('keydown', (event) => {
      if (event.key !== 'Tab' || !isOpen()) return;
      const focusables = [toggle, ...$$('a[href], button:not([disabled])', nav)];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Repasser en affichage bureau referme le menu
    const onBreakpoint = (event) => { if (event.matches && isOpen()) setNav(false, { moveFocus: false }); };
    if (desktop.addEventListener) desktop.addEventListener('change', onBreakpoint);
  }

  /* ------------------------------------------------------------------------
     2. Logo : s'affiche automatiquement dès que le fichier existe
     ------------------------------------------------------------------------ */
  $$('[data-brand]').forEach((brand) => {
    const img = $('.brand__logo', brand);
    if (!img || typeof img.decode !== 'function') return;
    img.decode()
      .then(() => brand.classList.add('has-logo'))
      .catch(() => { /* Pas de logo : le nom en texte reste affiché. */ });
  });

  /* ------------------------------------------------------------------------
     3. Images : fondu à l'arrivée, emplacement élégant si le fichier manque
     ------------------------------------------------------------------------ */
  const imagePath = (img) => {
    const src = img.getAttribute('src') || '';
    try { return decodeURI(src); } catch (e) { return src; }
  };

  $$('.media img').forEach((img) => {
    const frame = img.closest('.media');
    const loaded = () => frame.classList.add('is-loaded');
    const missing = () => {
      frame.classList.add('is-missing');
      frame.setAttribute('data-missing', 'Visuel à venir — ' + imagePath(img));
    };
    if (img.complete) {
      if (img.naturalWidth > 0) loaded(); else missing();
    } else {
      img.addEventListener('load', loaded, { once: true });
      img.addEventListener('error', missing, { once: true });
    }
  });

  /* ------------------------------------------------------------------------
     4. Vidéo pleine largeur (accueil) : emplacement si le fichier manque,
        bouton lecture / pause, pause hors écran et si l'animation est réduite
     ------------------------------------------------------------------------ */
  $$('[data-video]').forEach((section) => {
    const video = $('video', section);
    if (!video) return;
    const toggle = $('[data-video-toggle]', section);
    const label = $('[data-video-label]', section);
    const source = $('source', video);
    const path = (source || video).getAttribute('src') || '';
    let userPaused = false; // pause demandée par le visiteur

    const setPausedUi = (paused) => {
      section.classList.toggle('is-paused', paused);
      if (label) label.textContent = paused ? 'Lire la vidéo' : 'Mettre la vidéo en pause';
    };
    const play = () => {
      const attempt = video.play();
      if (attempt && attempt.catch) attempt.catch(() => setPausedUi(true));
    };
    const markLoaded = () => {
      if (section.classList.contains('is-missing')) return;
      section.classList.add('is-loaded');
      if (toggle) toggle.hidden = false;
      if (reduceMotion.matches) { userPaused = true; video.pause(); }
      setPausedUi(video.paused);
    };
    const markMissing = () => {
      if (section.classList.contains('is-loaded')) return;
      section.classList.add('is-missing');
      section.setAttribute('data-missing', 'Vidéo à venir — ' + path);
      if (toggle) toggle.hidden = true;
    };

    // Animations réduites demandées par le visiteur : pas de lecture automatique
    if (reduceMotion.matches) { video.removeAttribute('autoplay'); video.pause(); }

    if (video.readyState >= 2) markLoaded();
    else video.addEventListener('loadeddata', markLoaded, { once: true });
    if (source) source.addEventListener('error', markMissing, { once: true });
    video.addEventListener('error', markMissing, { once: true });
    // L'erreur a pu survenir avant le chargement du script : on revérifie.
    window.setTimeout(() => {
      if (video.readyState === 0 && video.networkState === HTMLMediaElement.NETWORK_NO_SOURCE) markMissing();
    }, 1500);

    video.addEventListener('play', () => setPausedUi(false));
    video.addEventListener('pause', () => setPausedUi(true));

    if (toggle) {
      toggle.addEventListener('click', () => {
        if (video.paused) { userPaused = false; play(); } else { userPaused = true; video.pause(); }
      });
    }

    // Économie de batterie : pause quand la vidéo sort de l'écran, reprise au retour
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting && !video.paused) video.pause();
        else if (entry.isIntersecting && video.paused && !userPaused && section.classList.contains('is-loaded')) play();
      }, { threshold: 0.1 }).observe(section);
    }
  });

  /* ------------------------------------------------------------------------
     5. Apparition au défilement
     ------------------------------------------------------------------------ */
  const revealables = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0 });
    revealables.forEach((el) => observer.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add('is-visible'));
  }

  /* ------------------------------------------------------------------------
     6. Filtres de la page « Mes créations »
     ------------------------------------------------------------------------ */
  const filterRoot = $('[data-filters]');
  if (filterRoot) {
    const cards = $$('[data-category]');
    const buttons = $$('[data-filter]', filterRoot);
    const status = $('[data-filter-status]');
    const countFor = (filter) => (filter === 'all' ? cards.length : cards.filter((c) => c.dataset.category === filter).length);

    buttons.forEach((button) => {
      const counter = $('.chip__count', button);
      if (counter) counter.textContent = countFor(button.dataset.filter);
    });

    const apply = (filter, { updateUrl = true, animate = true } = {}) => {
      if (!buttons.some((b) => b.dataset.filter === filter)) filter = 'all';
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === filter)));
      let shown = 0;
      cards.forEach((card) => {
        const visible = filter === 'all' || card.dataset.category === filter;
        card.hidden = !visible;
        if (visible) {
          shown += 1;
          if (animate && !reduceMotion.matches) {
            card.classList.remove('is-entering');
            void card.offsetWidth; // relance l'animation
            card.classList.add('is-entering');
          }
        }
      });
      if (status) status.textContent = `${shown} création${shown > 1 ? 's' : ''} affichée${shown > 1 ? 's' : ''}`;
      if (updateUrl) {
        try {
          const url = new URL(window.location.href);
          if (filter === 'all') url.searchParams.delete('categorie'); else url.searchParams.set('categorie', filter);
          url.hash = '';
          window.history.replaceState(null, '', url);
        } catch (e) { /* ouverture en local (file://) : on ignore */ }
      }
    };

    buttons.forEach((button) => button.addEventListener('click', () => apply(button.dataset.filter)));
    cards.forEach((card) => card.addEventListener('animationend', () => card.classList.remove('is-entering')));

    const initial = new URLSearchParams(window.location.search).get('categorie') || 'all';
    apply(initial, { updateUrl: false, animate: false });
  }

  /* ------------------------------------------------------------------------
     7. Formulaire de contact
     Branchement : renseignez l'URL de votre service d'envoi dans l'attribut
     data-endpoint du formulaire (Formspree, Web3Forms, Getform, script PHP…).
     Tant qu'il est vide, le formulaire fonctionne en mode démonstration.
     ------------------------------------------------------------------------ */
  const form = $('[data-contact-form]');
  if (form) {
    const fields = form.elements;
    const summary = $('[data-form-alert]', form);
    const statusBox = $('[data-form-status]');
    const submit = $('[type="submit"]', form);
    const submitLabel = submit ? submit.textContent : '';
    let submittedOnce = false;

    // Pré-remplissage depuis l'URL : contact.html?creation=Grand%20Cru ou ?type=sur-mesure
    const params = new URLSearchParams(window.location.search);
    const wantedCreation = params.get('creation');
    const wantedType = params.get('type');
    if (wantedCreation && fields.creation) {
      fields.creation.value = wantedCreation.slice(0, 80);
      if (fields.type && !wantedType) fields.type.value = 'commande';
    }
    if (wantedType && fields.type && $(`option[value="${CSS.escape(wantedType)}"]`, fields.type)) {
      fields.type.value = wantedType;
    }

    // Date minimale : aujourd'hui + N jours (attribut data-min-days)
    const dateField = fields.date;
    let minDate = null;
    if (dateField) {
      const days = parseInt(dateField.dataset.minDays || '3', 10);
      minDate = new Date();
      minDate.setHours(0, 0, 0, 0);
      minDate.setDate(minDate.getDate() + days);
      const pad = (n) => String(n).padStart(2, '0');
      dateField.min = `${minDate.getFullYear()}-${pad(minDate.getMonth() + 1)}-${pad(minDate.getDate())}`;
    }
    const formatDate = (d) => d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    const rules = {
      nom: (v) => (v.trim().length < 2 ? 'Indiquez votre prénom et votre nom.' : ''),
      email: (v) => {
        if (!v.trim()) return 'Indiquez votre adresse e-mail pour que je puisse vous répondre.';
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Cette adresse e-mail semble incomplète (exemple : prenom@domaine.fr).';
      },
      telephone: (v) => {
        if (!v.trim()) return '';
        const digits = v.replace(/\D/g, '');
        return /^[+\d][\d\s.\-()]*$/.test(v.trim()) && digits.length >= 9 && digits.length <= 15
          ? '' : 'Ce numéro de téléphone ne semble pas valide (exemple : 06 12 34 56 78).';
      },
      type: (v) => (v ? '' : 'Choisissez le type de demande.'),
      date: (v) => {
        if (!v) return '';
        const chosen = new Date(`${v}T00:00:00`);
        if (Number.isNaN(chosen.getTime())) return 'Cette date n\'est pas valide.';
        return minDate && chosen < minDate ? `Choisissez une date à partir du ${formatDate(minDate)}. Pour une urgence, appelez-moi.` : '';
      },
      parts: (v) => {
        if (!v) return '';
        const n = Number(v);
        return Number.isInteger(n) && n >= 2 && n <= 300 ? '' : 'Indiquez un nombre de parts entre 2 et 300.';
      },
      message: (v) => {
        const len = v.trim().length;
        if (!len) return 'Décrivez votre projet en quelques mots.';
        return len < 20 ? 'Votre message est un peu court : précisez l\'occasion, les parfums ou le thème souhaités.' : '';
      },
      consentement: (_, el) => (el.checked ? '' : 'Votre accord est nécessaire pour que je puisse traiter votre demande.'),
    };

    const errorBox = (name) => $(`#${name}-error`, form);

    const validateField = (name) => {
      const el = fields[name];
      if (!el || !rules[name]) return '';
      const message = rules[name](el.value || '', el);
      const wrapper = el.closest('.field, .check');
      const box = errorBox(name);
      if (box) box.textContent = message;
      if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));
      if (message) el.setAttribute('aria-invalid', 'true'); else el.removeAttribute('aria-invalid');
      return message;
    };

    // Validation en direct, après un premier passage dans le champ
    Object.keys(rules).forEach((name) => {
      const el = fields[name];
      if (!el) return;
      const eventName = el.type === 'checkbox' || el.tagName === 'SELECT' ? 'change' : 'blur';
      el.addEventListener(eventName, () => { if (submittedOnce || el.value) validateField(name); });
      el.addEventListener('input', () => { if (el.getAttribute('aria-invalid') === 'true') validateField(name); });
    });

    const showSummary = (errors) => {
      if (!summary) return;
      if (!errors.length) { summary.hidden = true; summary.innerHTML = ''; return; }
      const items = errors.map(({ name, message }) => `<li><a href="#${name}">${message}</a></li>`).join('');
      summary.innerHTML = `<p class="form-alert__title">${errors.length > 1 ? `${errors.length} points sont à corriger` : 'Un point est à corriger'} :</p><ul>${items}</ul>`;
      summary.hidden = false;
      summary.focus();
    };

    if (summary) {
      summary.addEventListener('click', (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;
        event.preventDefault();
        const target = fields[link.getAttribute('href').slice(1)];
        if (target) target.focus();
      });
    }

    const showStatus = (type, title, text) => {
      if (!statusBox) return;
      statusBox.className = `form-status form-status--${type}`;
      statusBox.innerHTML = `<p class="form-status__title">${title}</p><p>${text}</p>`;
      statusBox.hidden = false;
      statusBox.focus();
    };

    const setBusy = (busy) => {
      if (!submit) return;
      submit.disabled = busy;
      submit.setAttribute('aria-busy', String(busy));
      submit.textContent = busy ? 'Envoi en cours…' : submitLabel;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      submittedOnce = true;
      if (statusBox) statusBox.hidden = true;

      // Anti-spam : un robot remplit le champ invisible
      if (fields.website && fields.website.value) { form.reset(); return; }

      const errors = Object.keys(rules)
        .map((name) => ({ name, message: validateField(name) }))
        .filter((e) => e.message);
      showSummary(errors);
      if (errors.length) return;

      const endpoint = (form.dataset.endpoint || '').trim();
      const data = new FormData(form);
      data.delete('website');
      setBusy(true);

      try {
        if (endpoint) {
          const response = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          showStatus('success', 'Merci, votre demande est bien partie !', 'Je vous réponds sous 48 h ouvrées avec une proposition. Pensez à vérifier vos courriers indésirables.');
        } else {
          await new Promise((resolve) => window.setTimeout(resolve, 600));
          console.info('[Formulaire de contact] Mode démonstration — aucune donnée envoyée. Contenu :', Object.fromEntries(data.entries()));
          showStatus('success', 'Formulaire validé (mode démonstration)', 'Le formulaire n\'est pas encore relié à un service d\'envoi : aucun message n\'a été transmis. Voir le README pour le brancher.');
        }
        form.reset();
        submittedOnce = false;
        $$('[aria-invalid]', form).forEach((el) => el.removeAttribute('aria-invalid'));
        $$('.has-error', form).forEach((el) => el.classList.remove('has-error'));
      } catch (error) {
        showStatus('error', 'Le message n\'a pas pu être envoyé', 'Un problème technique est survenu. Réessayez dans un instant, ou contactez-moi directement par téléphone ou par e-mail.');
      } finally {
        setBusy(false);
      }
    });
  }

  /* ------------------------------------------------------------------------
     8. Bandeau cookies (inactif tant que CONFIG.cookieBanner vaut false)
     Écoutez l'événement « cookies:accepted » pour charger vos outils :
       document.addEventListener('cookies:accepted', () => { ... });
     ------------------------------------------------------------------------ */
  if (CONFIG.cookieBanner) {
    const read = () => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(CONFIG.cookieKey) || 'null');
        if (!saved) return null;
        const ageDays = (Date.now() - saved.date) / 86400000;
        return ageDays > CONFIG.cookieMaxAgeDays ? null : saved.value;
      } catch (e) { return null; }
    };
    const save = (value) => {
      try { window.localStorage.setItem(CONFIG.cookieKey, JSON.stringify({ value, date: Date.now() })); } catch (e) { /* stockage indisponible */ }
    };

    let banner = null;
    const close = () => { if (banner) { banner.remove(); banner = null; } };
    const choose = (value) => {
      save(value);
      close();
      if (value === 'accepted') document.dispatchEvent(new CustomEvent('cookies:accepted'));
    };
    const open = () => {
      if (banner) return;
      banner = document.createElement('section');
      banner.className = 'cookie-banner';
      banner.setAttribute('aria-label', 'Gestion des cookies');
      banner.innerHTML = `
        <h2 class="cookie-banner__title">Un mot sur les cookies</h2>
        <p>J'utilise des cookies de mesure d'audience pour comprendre comment le site est consulté. Vous pouvez les accepter ou les refuser ; votre choix est modifiable à tout moment. <a href="confidentialite.html#cookies">En savoir plus</a></p>
        <div class="cookie-banner__actions">
          <button type="button" class="btn btn--ghost btn--small" data-choice="refused">Refuser</button>
          <button type="button" class="btn btn--small" data-choice="accepted">Accepter</button>
        </div>`;
      banner.addEventListener('click', (event) => {
        const button = event.target.closest('[data-choice]');
        if (button) choose(button.dataset.choice);
      });
      document.body.appendChild(banner);
    };

    $$('[data-cookie-manage]').forEach((item) => {
      item.hidden = false;
      const button = $('button', item);
      if (button) button.addEventListener('click', open);
    });

    const previous = read();
    if (previous === 'accepted') document.dispatchEvent(new CustomEvent('cookies:accepted'));
    if (!previous) open();
  }

  /* ------------------------------------------------------------------------
     9. Avis clients (accueil) : carrousel à faire glisser sur mobile
     Les repères suivent la carte affichée ; la zone n'est atteignable au
     clavier (flèches gauche/droite) que lorsqu'elle défile réellement.
     ------------------------------------------------------------------------ */
  const reviewTrack = $('[data-reviews-track]');
  if (reviewTrack) {
    const reviewItems = $$('.review', reviewTrack);
    const dotsRoot = $('[data-reviews-dots]');
    const dots = dotsRoot ? $$('span', dotsRoot) : [];
    const updateReviews = () => {
      const scrollable = reviewTrack.scrollWidth > reviewTrack.clientWidth + 1;
      if (scrollable) reviewTrack.setAttribute('tabindex', '0');
      else reviewTrack.removeAttribute('tabindex');

      const atEnd = reviewTrack.scrollLeft + reviewTrack.clientWidth >= reviewTrack.scrollWidth - 2;
      let active = 0;
      if (atEnd) {
        active = reviewItems.length - 1;
      } else {
        let best = Infinity;
        reviewItems.forEach((item, i) => {
          const gap = Math.abs(item.offsetLeft - reviewTrack.scrollLeft);
          if (gap < best) { best = gap; active = i; }
        });
      }
      dots.forEach((dot, i) => dot.classList.toggle('is-active', i === active));
    };
    let reviewFrame = 0;
    const scheduleReviews = () => {
      cancelAnimationFrame(reviewFrame);
      reviewFrame = requestAnimationFrame(updateReviews);
    };
    reviewTrack.addEventListener('scroll', scheduleReviews, { passive: true });
    window.addEventListener('resize', scheduleReviews);
    updateReviews();
  }

  /* ------------------------------------------------------------------------
     10. Comparateur « entier / à la coupe » (accueil, section 3)
     Le curseur invisible pilote --pos. À la première apparition, la poignée
     fait un petit aller-retour pour montrer qu'on peut la faire glisser
     (sauf si l'animation est réduite ou si le visiteur l'a déjà touchée).
     ------------------------------------------------------------------------ */
  $$('[data-compare]').forEach((box) => {
    const range = $('[data-compare-range]', box);
    if (!range) return;
    let touched = false;
    const setPos = (value) => box.style.setProperty('--pos', value + '%');
    range.addEventListener('input', () => { touched = true; setPos(range.value); });
    ['pointerdown', 'keydown'].forEach((type) => range.addEventListener(type, () => { touched = true; }));
    setPos(range.value);

    if (!('IntersectionObserver' in window) || reduceMotion.matches) return;
    const hint = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      hint.disconnect();
      setTimeout(() => {
        const start = performance.now();
        const duration = 1800;
        const step = (now) => {
          if (touched) return;
          const t = Math.min((now - start) / duration, 1);
          const eased = (1 - Math.cos(Math.PI * 2 * t)) / 2;   // 0 → 1 → 0, en douceur
          setPos(50 - 18 * eased);
          if (t < 1) requestAnimationFrame(step);
          else setPos(range.value);
        };
        requestAnimationFrame(step);
      }, 700);
    }, { threshold: 0.6 });
    hint.observe(box);
  });
})();
