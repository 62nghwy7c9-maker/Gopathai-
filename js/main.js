/* Gophai Thai Imbiss — Interaktion & Animation
   Progressive Enhancement: Inhalte funktionieren ohne JS,
   Animationen respektieren prefers-reduced-motion. */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, ctx) => (ctx || document).querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  /* ── Öffnungsstatus (Mi–So 11–21, Mo & Di Ruhetag) ─────────── */
  const OPEN_DAYS = [0, 3, 4, 5, 6]; // So, Mi, Do, Fr, Sa
  const OPEN_FROM = 11, OPEN_TO = 21;

  function openStatus() {
    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours() + now.getMinutes() / 60;
    const isOpenDay = OPEN_DAYS.includes(day);

    if (isOpenDay && hour >= OPEN_FROM && hour < OPEN_TO) {
      return { open: true, text: 'Jetzt geöffnet — heute bis 21 Uhr für Euch da.' };
    }
    if (isOpenDay && hour < OPEN_FROM) {
      return { open: false, text: 'Heute ab 11 Uhr wieder für Euch da.' };
    }
    // geschlossen: nächsten offenen Tag finden
    const names = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    let d = day;
    for (let i = 1; i <= 7; i++) {
      d = (day + i) % 7;
      if (OPEN_DAYS.includes(d)) break;
    }
    const dayName = (d === (day + 1) % 7) ? 'morgen' : 'am ' + names[d];
    return { open: false, text: 'Gerade geschlossen — ' + dayName + ' ab 11 Uhr wieder für Euch da.' };
  }

  $$('[data-open-status]').forEach((el) => {
    const s = openStatus();
    el.classList.toggle('is-closed', !s.open);
    el.innerHTML = '<span class="dot" aria-hidden="true"></span>' + s.text;
  });

  /* ── Mobile Navigation ─────────────────────────────────────── */
  const toggle = $('.nav-toggle');
  const mobileMenu = $('#mobile-menu');
  if (toggle && mobileMenu) {
    mobileMenu.hidden = true;
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
      mobileMenu.hidden = !open;
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', () => setOpen(mobileMenu.hidden));
    $$('a', mobileMenu).forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.hidden) setOpen(false);
    });
  }

  /* ── Speisekarte: Rendern & Filtern ────────────────────────── */
  const CHILI_SVG = '<svg class="chili-ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 4.5c.3-1 1.2-2 2.5-2.3.4-.1.8.2.8.6 0 1-.5 2-1.3 2.6 3 .6 4.5 3 4.5 6.1 0 5.5-6.2 10-13.4 10-2.9 0-5.6-.9-5.6-1.6 0-.5.8-.5 1.7-.7C10 18.4 13 14.6 13 9.5c0-1.6.2-2.9.8-3.9-.2-.3-.2-.7.7-1.1z"/></svg>';

  function chilis(n) {
    if (!n) return '';
    let out = '<span class="menu-item__chilis" role="img" aria-label="Schärfegrad ' + n + ' von 4">';
    for (let i = 0; i < n; i++) out += CHILI_SVG;
    return out + '</span>';
  }

  function itemHTML(item) {
    const sup = item.allergens ? '<sup>' + item.allergens + '</sup>' : '';
    return (
      '<article class="menu-item">' +
        '<span class="menu-item__nr">' + (item.nr ?? '·') + '</span>' +
        '<h4 class="menu-item__name">' + item.name + sup + chilis(item.chili) + '</h4>' +
        '<span class="menu-item__price">' + item.price + ' €</span>' +
        (item.desc ? '<p class="menu-item__desc">' + item.desc + '</p>' : '') +
      '</article>'
    );
  }

  const listEl = $('#menu-list');
  const filtersEl = $('#menu-filters');
  const searchEl = $('#menu-search');
  let activeCat = 'alle';

  function normalize(s) {
    return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function renderMenu() {
    if (!listEl) return;
    const q = normalize((searchEl && searchEl.value || '').trim());
    let html = '';
    let total = 0;

    MENU_CATEGORIES.forEach((cat) => {
      if (activeCat !== 'alle' && activeCat !== cat.id) return;
      const items = MENU_ITEMS.filter((it) => {
        if (it.cat !== cat.id) return false;
        if (!q) return true;
        return (
          normalize(it.name).includes(q) ||
          normalize(it.desc).includes(q) ||
          String(it.nr) === q
        );
      });
      if (!items.length) return;
      total += items.length;
      html +=
        '<section class="menu-cat anim-up">' +
          '<header class="menu-cat__header">' +
            '<h3 class="menu-cat__title">' + cat.label + '</h3>' +
            (cat.note ? '<span class="menu-cat__note">' + cat.note + '</span>' : '') +
          '</header>' +
          '<div class="menu-cat__grid">' + items.map(itemHTML).join('') + '</div>' +
        '</section>';
    });

    listEl.innerHTML = total
      ? html
      : '<div class="menu-empty"><span class="scribble scribble--red">Nichts gefunden!</span>' +
        'Probiert es mit einem anderen Begriff — oder ruft uns einfach an: ' +
        '<a href="tel:+4922376036457">02237 / 60 36 457</a></div>';
  }

  if (filtersEl) {
    const cats = [{ id: 'alle', label: 'Alle' }].concat(MENU_CATEGORIES);
    filtersEl.innerHTML = cats.map((c) =>
      '<button type="button" class="filter-chip" data-cat="' + c.id + '" aria-pressed="' + (c.id === 'alle') + '">' + c.label + '</button>'
    ).join('');
    filtersEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-chip');
      if (!btn) return;
      activeCat = btn.dataset.cat;
      $$('.filter-chip', filtersEl).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
      renderMenu();
    });
  }

  if (searchEl) {
    let t;
    searchEl.addEventListener('input', () => {
      clearTimeout(t);
      t = setTimeout(renderMenu, 160);
    });
  }

  renderMenu();

  /* ── Legenden ──────────────────────────────────────────────── */
  const spiceEl = $('#spice-legend');
  if (spiceEl) {
    spiceEl.innerHTML = SPICE_LEVELS.map((s) => {
      let ch = '';
      for (let i = 0; i < s.chili; i++) ch += CHILI_SVG;
      return '<li><span class="chilis" aria-hidden="true">' + ch + '</span>' +
             s.label + '<span class="surcharge">+' + s.surcharge + ' €</span></li>';
    }).join('');
  }
  const allergensEl = $('#allergens-legend');
  if (allergensEl) {
    allergensEl.innerHTML = Object.entries(ALLERGENS_LEGEND)
      .map(([k, v]) => '<strong>' + k + ')</strong> ' + v).join(' · ');
  }
  const additivesEl = $('#additives-legend');
  if (additivesEl) {
    additivesEl.innerHTML = Object.entries(ADDITIVES_LEGEND)
      .map(([k, v]) => '<strong>' + k + ')</strong> ' + v).join(' · ');
  }

  /* ── Mobile Call-Bar ───────────────────────────────────────── */
  const callBar = $('[data-call-bar]');
  if (callBar) {
    callBar.hidden = false;
    const onScroll = () => {
      callBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.7);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Animation (GSAP + Lenis) ──────────────────────────────── */
  const hasGsap = typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined';

  if (prefersReducedMotion || !hasGsap) {
    // Statische Darstellung: Foto-Stack als normale Liste zeigen
    document.querySelectorAll('.showcase__stack').forEach((el) => el.classList.add('showcase__stack--static'));
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Smooth Scroll
  let lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // Anker-Navigation mit Header-Offset
  const HEADER_OFFSET = 80;
  $$('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length < 2) return;
      const target = $(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { offset: -HEADER_OFFSET });
      else target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Hero: Buchstaben splitten & einfliegen
  $$('[data-split]').forEach((el) => {
    const text = el.textContent;
    el.setAttribute('aria-hidden', 'true');
    el.innerHTML = text.split('').map((c) =>
      '<span class="char">' + (c === ' ' ? '&nbsp;' : c) + '</span>'
    ).join('');
  });

  const intro = gsap.timeline({ defaults: { ease: 'power3.out' } });
  intro
    .from('.hero__title .char', { yPercent: 115, duration: 0.7, stagger: 0.035 })
    .from('.anim-hero', { y: 26, autoAlpha: 0, duration: 0.55, stagger: 0.09 }, '-=0.35')
    .from('.hero__seal', { scale: 0.4, autoAlpha: 0, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.45');

  // Hauptfoto schwebt dezent
  gsap.to('.polaroid--main', {
    y: 12, duration: 3,
    ease: 'sine.inOut', yoyo: true, repeat: -1, delay: 1.2,
  });

  // Scroll-Reveals
  ScrollTrigger.batch('.anim-up', {
    start: 'top 88%',
    once: true,
    onEnter: (batch) => gsap.fromTo(batch,
      { y: 34, autoAlpha: 0 },
      { y: 0, autoAlpha: 1, duration: 0.6, stagger: 0.08, ease: 'power2.out', overwrite: true }
    ),
  });
  // Elemente, die nie getriggert werden (bereits sichtbar), absichern:
  gsap.set('.anim-up', { autoAlpha: 1 });
  ScrollTrigger.batch && ScrollTrigger.refresh();

  // Gepinnter Foto-Stack: Karten wischen nacheinander rein
  const stackCards = $$('[data-stack-card]');
  if (stackCards.length > 1 && window.innerWidth > 640) {
    gsap.set(stackCards.slice(1), { yPercent: 120, rotation: 8 });
    const stackTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.showcase__pin',
        start: 'top top',
        end: '+=' + (stackCards.length - 1) * 90 + '%',
        pin: true,
        scrub: 0.6,
      },
      defaults: { ease: 'none' },
    });
    stackCards.slice(1).forEach((card, i) => {
      stackTl.to(card, { yPercent: 0, rotation: [2.5, -1.5][i] || 0, duration: 1 }, i);
      stackTl.to(stackCards[i], { scale: 0.94, duration: 1 }, i);
    });
  }

  // Menü-Rerender: neue .anim-up-Elemente sichtbar halten
  const menuObserver = new MutationObserver(() => {
    gsap.set('#menu-list .anim-up', { clearProps: 'all', autoAlpha: 1 });
    ScrollTrigger.refresh();
  });
  if (listEl) menuObserver.observe(listEl, { childList: true });
})();
