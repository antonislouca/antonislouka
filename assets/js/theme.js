(function () {
  const initTheme = () => {
    const btn = document.querySelector('.theme-toggle');
    if (!btn || btn.dataset.themeInit) return;
    btn.dataset.themeInit = 'true';

    const setTheme = (theme) => {
      document.documentElement.dataset.theme = theme;
      localStorage.setItem('theme', theme);
    };

    btn.addEventListener('click', () => {
      const current = document.documentElement.dataset.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  };

  const initBibToggle = () => {
    document.querySelectorAll('.bib-toggle').forEach(btn => {
      // Avoid double listeners
      if (btn.dataset.bibInit) return;
      btn.dataset.bibInit = 'true';
      
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = btn.getAttribute('data-target');
        const target = document.getElementById(targetId);
        if (target) {
          const isHidden = target.style.display === 'none';
          target.style.display = isHidden ? 'block' : 'none';
        }
      });
    });
  };

  // Run on initial load
  initTheme();
  initBibToggle();

  // If using SPA navigation, re-init when page content changes
  document.addEventListener('page:loaded', () => {
    initTheme();
    initBibToggle();
  });
})();
