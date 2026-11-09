(() => {
  const menu = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menu && nav) {
    menu.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      menu.setAttribute('aria-expanded', String(open));
      menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('is-open'); menu.setAttribute('aria-expanded','false');
    }));
  }
  const cards = [...document.querySelectorAll('[data-post-grid] .post-card')];
  const filters = [...document.querySelectorAll('.filter[data-filter]')];
  const input = document.querySelector('[data-post-search]');
  let activeFilter = 'all';
  function updateEntries() {
    const term = (input?.value || '').toLowerCase().trim();
    let visible = 0;
    cards.forEach(card => {
      const category = (card.dataset.category || '').toLowerCase();
      const search = (card.dataset.search || '').toLowerCase();
      const show = (activeFilter === 'all' || category === activeFilter) && (!term || search.includes(term));
      card.hidden = !show;
      if (show) visible++;
    });
    const noEntries = document.querySelector('.empty-filter');
    if (noEntries) noEntries.hidden = visible > 0;
  }
  filters.forEach(filter => filter.addEventListener('click', () => {
    activeFilter = filter.dataset.filter;
    filters.forEach(f => { f.classList.toggle('is-active', f === filter); f.setAttribute('aria-pressed', String(f === filter)); });
    updateEntries();
  }));
  if (input) input.addEventListener('input', updateEntries);
  const progress = document.querySelector('.read-progress');
  if (progress && document.querySelector('.article-page')) {
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${Math.min(100, Math.max(0, max > 0 ? window.scrollY / max * 100 : 0))}%`;
    };
    window.addEventListener('scroll', updateProgress, {passive:true});
    updateProgress();
  }
})();
