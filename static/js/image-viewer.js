(() => {
  const images = Array.from(document.querySelectorAll('.article-content img, .article-cover img'));
  if (!images.length) return;

  const dialog = document.createElement('dialog');
  dialog.className = 'spatial-image-viewer';
  dialog.setAttribute('aria-label', 'Fullscreen image viewer');
  dialog.innerHTML = [
    '<div class="image-viewer-shell">',
      '<div class="image-viewer-header">',
        '<span class="image-viewer-label" id="image-viewer-label">Image</span>',
        '<div class="image-viewer-actions">',
          '<button type="button" data-viewer-action="previous" aria-label="Previous image" title="Previous image">←</button>',
          '<span class="image-viewer-count" aria-live="polite">1 / 1</span>',
          '<button type="button" data-viewer-action="next" aria-label="Next image" title="Next image">→</button>',
          '<span class="image-viewer-separator" aria-hidden="true"></span>',
          '<button type="button" data-viewer-action="out" aria-label="Zoom out" title="Zoom out">−</button>',
          '<span class="image-viewer-zoom" aria-live="polite">100%</span>',
          '<button type="button" data-viewer-action="in" aria-label="Zoom in" title="Zoom in">+</button>',
          '<button type="button" data-viewer-action="reset" aria-label="Fit to screen" title="Fit to screen">⤢</button>',
          '<a class="image-viewer-original" href="#" target="_blank" rel="noopener noreferrer" title="Open the image in a new tab">Original ↗</a>',
          '<button type="button" class="image-viewer-close" data-viewer-action="close" aria-label="Close image" title="Close">×</button>',
        '</div>',
      '</div>',
      '<div class="image-viewer-stage" tabindex="0">',
        '<img class="image-viewer-image" alt="" draggable="false">',
      '</div>',
      '<div class="image-viewer-footer">Use + / − to zoom · drag with scrollbars to pan · ← / → for another image · Esc to close</div>',
    '</div>'
  ].join('');
  document.body.appendChild(dialog);

  const stage = dialog.querySelector('.image-viewer-stage');
  const bigImage = dialog.querySelector('.image-viewer-image');
  const label = dialog.querySelector('.image-viewer-label');
  const count = dialog.querySelector('.image-viewer-count');
  const zoomLabel = dialog.querySelector('.image-viewer-zoom');
  const originalLink = dialog.querySelector('.image-viewer-original');
  const previous = dialog.querySelector('[data-viewer-action="previous"]');
  const next = dialog.querySelector('[data-viewer-action="next"]');

  let selected = 0;
  let zoom = 1;
  let fit = 1;
  let lastFocused = null;

  const updateSize = () => {
    if (!bigImage.naturalWidth || !bigImage.naturalHeight) return;
    const safeWidth = Math.max(240, window.innerWidth - 48);
    const safeHeight = Math.max(180, window.innerHeight - 160);
    fit = Math.min(1, safeWidth / bigImage.naturalWidth, safeHeight / bigImage.naturalHeight);
    bigImage.style.width = Math.round(bigImage.naturalWidth * fit * zoom) + 'px';
    bigImage.style.height = 'auto';
    zoomLabel.textContent = Math.round(zoom * 100) + '%';
  };

  const changeZoom = (direction) => {
    const steps = [1, 1.5, 2, 3, 4];
    const current = steps.findIndex(v => v >= zoom - 0.001);
    const i = current < 0 ? 0 : current;
    zoom = steps[Math.max(0, Math.min(steps.length - 1, i + direction))];
    updateSize();
  };

  const show = (index) => {
    selected = (index + images.length) % images.length;
    const img = images[selected];
    zoom = 1;
    const url = img.currentSrc || img.src;
    bigImage.alt = img.alt || 'Enlarged screenshot';
    label.textContent = img.alt || 'Screenshot';
    count.textContent = (selected + 1) + ' / ' + images.length;
    originalLink.href = url;
    bigImage.onload = () => {
      updateSize();
      stage.scrollTop = 0;
      stage.scrollLeft = 0;
    };
    bigImage.src = url;
    previous.disabled = images.length < 2;
    next.disabled = images.length < 2;
    if (bigImage.complete) updateSize();
  };

  const open = (index) => {
    lastFocused = document.activeElement;
    show(index);
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else window.open(originalLink.href, '_blank', 'noopener');
  };

  images.forEach((img, index) => {
    img.classList.add('enlargeable-image');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge image: ' + (img.alt || 'screenshot'));
    img.addEventListener('click', () => open(index));
    img.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(index);
      }
    });
  });

  dialog.addEventListener('click', event => {
    const button = event.target.closest('[data-viewer-action]');
    if (button) {
      const action = button.dataset.viewerAction;
      if (action === 'close') dialog.close();
      if (action === 'previous') show(selected - 1);
      if (action === 'next') show(selected + 1);
      if (action === 'in') changeZoom(1);
      if (action === 'out') changeZoom(-1);
      if (action === 'reset') {
        zoom = 1;
        updateSize();
        stage.scrollTop = 0;
        stage.scrollLeft = 0;
      }
    } else if (event.target === dialog) {
      dialog.close();
    }
  });

  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      show(selected - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      show(selected + 1);
    } else if (event.key === '+' || event.key === '=') {
      event.preventDefault();
      changeZoom(1);
    } else if (event.key === '-') {
      event.preventDefault();
      changeZoom(-1);
    } else if (event.key === '0') {
      event.preventDefault();
      zoom = 1;
      updateSize();
    }
  });

  dialog.addEventListener('close', () => {
    bigImage.removeAttribute('src');
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
  });
  window.addEventListener('resize', () => {
    if (dialog.open) updateSize();
  }, { passive: true });
})();
