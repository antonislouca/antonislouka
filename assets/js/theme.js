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

  const initMenuToggle = () => {
    const btn = document.querySelector('.menu-toggle');
    const topbar = document.querySelector('.topbar');
    if (!btn || !topbar || btn.dataset.menuInit) return;
    btn.dataset.menuInit = 'true';

    const icon = btn.querySelector('.menu-icon');
    btn.addEventListener('click', () => {
      const open = topbar.classList.toggle('nav-open');
      btn.setAttribute('aria-expanded', open);
      if (icon) icon.textContent = open ? '✕' : '☰';
    });

    const close = () => {
      topbar.classList.remove('nav-open');
      btn.setAttribute('aria-expanded', 'false');
      if (icon) icon.textContent = '☰';
    };

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', close);
    });

    document.addEventListener('click', (e) => {
      if (!topbar.contains(e.target)) close();
    });
  };

  const initBibToggle = () => {
    document.querySelectorAll('.bib-toggle').forEach(btn => {
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

  initTheme();
  initMenuToggle();
  initBibToggle();

  document.addEventListener('page:loaded', () => {
    initTheme();
    initMenuToggle();
    initBibToggle();
  });
})();
