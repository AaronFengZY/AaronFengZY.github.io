(function () {
  var imgs = document.querySelectorAll('table.papers img');
  var photoLinks = document.querySelectorAll('a[data-lightbox]');
  if (!imgs.length && !photoLinks.length) return;

  var overlay = document.createElement('dialog');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('aria-label', 'Image viewer');
  overlay.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close image" autofocus>&times;</button><img alt="">';
  document.body.appendChild(overlay);

  var bigImg = overlay.querySelector('img');
  var revealFrame = 0;
  var closeTimer = 0;
  var previousOverflow = '';

  function open(src, alt) {
    clearTimeout(closeTimer);
    cancelAnimationFrame(revealFrame);
    bigImg.src = src;
    bigImg.alt = alt;
    if (!overlay.open) {
      previousOverflow = document.body.style.overflow;
      overlay.showModal();
    }
    document.body.style.overflow = 'hidden';
    revealFrame = requestAnimationFrame(function () { overlay.classList.add('visible'); });
  }

  function close() {
    cancelAnimationFrame(revealFrame);
    clearTimeout(closeTimer);
    overlay.classList.remove('visible');
    closeTimer = setTimeout(function () {
      overlay.close();
      bigImg.removeAttribute('src');
      document.body.style.overflow = previousOverflow;
    }, window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 200);
  }

  overlay.addEventListener('click', close);
  overlay.addEventListener('cancel', function (e) {
    e.preventDefault();
    close();
  });
  overlay.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  });

  imgs.forEach(function (img) {
    img.addEventListener('click', function (e) {
      e.preventDefault();
      var alt = img.getAttribute('alt') || img.closest('tr').querySelector('papertitle').textContent;
      open(img.getAttribute('src'), alt);
    });
  });
  photoLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      open(link.getAttribute('href'), link.querySelector('img').alt);
    });
  });
})();
