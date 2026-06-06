document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('.main');
  if (!main) return;

  document.body.addEventListener('click', async (e) => {
    const link = e.target.closest('a');
    if (!link || !link.href) return;
    if (link.host !== window.location.host) return;
    if (link.target === '_blank') return;
    if (link.getAttribute('href').startsWith('#')) return;
    if (link.hasAttribute('download')) return;
    const path = new URL(link.href).pathname;
    if (/\.(pdf|png|jpe?g|gif|svg|zip|csv|json)$/i.test(path)) return;

    e.preventDefault();
    history.pushState(null, '', link.href);
    await loadPage(link.href);
  });

  window.addEventListener('popstate', () => loadPage(window.location.href));

  async function loadPage(url) {
    try {
      main.style.opacity = '0.4';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Network error');
      const text = await res.text();
      const doc = new DOMParser().parseFromString(text, 'text/html');

      const newMain = doc.querySelector('.main');
      if (!newMain) {
        window.location.href = url;
        return;
      }

      const newTitle = doc.querySelector('title');
      main.innerHTML = newMain.innerHTML;
      if (newTitle) document.title = newTitle.innerText;

      document.dispatchEvent(new CustomEvent('page:loaded'));

      // Update active nav link.
      const newPath = new URL(url).pathname;
      document.querySelectorAll('.nav-link').forEach((a) => {
        const aPath = new URL(a.href).pathname;
        a.classList.toggle('is-active', aPath === newPath);
      });

      window.scrollTo({ top: 0, behavior: 'instant' });
    } catch (err) {
      console.error('SPA navigation failed:', err);
      window.location.href = url;
    } finally {
      main.style.opacity = '1';
    }
  }
});
