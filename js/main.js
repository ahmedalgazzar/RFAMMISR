(function(){
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Mobile nav ---------- */
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');
  var navOverlay = document.getElementById('nav-overlay');

  function openNav(){
    mainNav.classList.add('open');
    navOverlay.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'إغلاق القائمة');
    document.body.style.overflow = 'hidden';
  }
  function closeNav(){
    mainNav.classList.remove('open');
    navOverlay.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'فتح القائمة');
    document.body.style.overflow = '';
  }
  if (navToggle) {
    navToggle.addEventListener('click', function(){
      var isOpen = mainNav.classList.contains('open');
      if (isOpen) { closeNav(); } else { openNav(); }
    });
  }
  if (navOverlay) { navOverlay.addEventListener('click', closeNav); }
  document.querySelectorAll('.nav-link').forEach(function(link){
    link.addEventListener('click', closeNav);
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape') { closeNav(); }
  });

  /* ---------- Smooth scroll with sticky-header offset ---------- */
  var header = document.getElementById('site-header');
  function headerOffset(){
    return header ? header.offsetHeight : 0;
  }
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var id = link.getAttribute('href');
      if (!id || id === '#') { return; }
      var target = document.querySelector(id);
      if (!target) { return; }
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset() + 1;
      window.scrollTo({ top: top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      history.pushState(null, '', id);
    });
  });

  /* ---------- Active nav link highlighting ---------- */
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = Array.prototype.slice.call(navLinks).map(function(link){
    var id = link.getAttribute('href');
    return document.querySelector(id);
  }).filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          var id = '#' + entry.target.id;
          navLinks.forEach(function(link){
            link.classList.toggle('active', link.getAttribute('href') === id);
          });
        }
      });
    }, { rootMargin: '-' + (headerOffset() + 20) + 'px 0px -60% 0px', threshold: 0.1 });

    sections.forEach(function(section){ navObserver.observe(section); });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if (prefersReducedMotion) {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  } else if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function(el){ revealObserver.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('is-visible'); });
  }

  /* ---------- Animated stat counters ---------- */
  var statNumbers = document.querySelectorAll('.stat-number[data-target]');
  function animateCounter(el){
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    if (prefersReducedMotion) {
      el.textContent = prefix + target + suffix;
      return;
    }
    var duration = 1400;
    var startTime = null;
    function step(timestamp){
      if (!startTime) { startTime = timestamp; }
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = Math.round(target * eased);
      el.textContent = prefix + value + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }
    requestAnimationFrame(step);
  }

  if (statNumbers.length && 'IntersectionObserver' in window) {
    var statsSection = document.getElementById('stats');
    var counted = false;
    var statsObserver = new IntersectionObserver(function(entries, obs){
      entries.forEach(function(entry){
        if (entry.isIntersecting && !counted) {
          counted = true;
          statNumbers.forEach(animateCounter);
          obs.disconnect();
        }
      });
    }, { threshold: 0.4 });
    if (statsSection) { statsObserver.observe(statsSection); }
  } else {
    statNumbers.forEach(animateCounter);
  }

  /* ---------- Portfolio lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxClose = document.getElementById('lightbox-close');
  var lastFocused = null;

  function openLightbox(src, alt){
    lastFocused = document.activeElement;
    lightboxImg.src = src;
    lightboxImg.alt = alt || '';
    lightbox.hidden = false;
    lightboxClose.focus();
    document.body.style.overflow = 'hidden';
  }
  function closeLightbox(){
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    if (lastFocused) { lastFocused.focus(); }
  }

  document.querySelectorAll('.portfolio-item').forEach(function(btn){
    btn.addEventListener('click', function(){
      var full = btn.getAttribute('data-full');
      var img = btn.querySelector('img');
      openLightbox(full, img ? img.getAttribute('alt') : '');
    });
  });

  if (lightboxClose) { lightboxClose.addEventListener('click', closeLightbox); }
  if (lightbox) {
    lightbox.addEventListener('click', function(e){
      if (e.target === lightbox) { closeLightbox(); }
    });
  }
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && lightbox && !lightbox.hidden) { closeLightbox(); }
  });

  /* ---------- Dynamic copyright year ---------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

})();
