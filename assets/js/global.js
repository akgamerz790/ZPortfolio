// Simple component include + nav active + smooth scroll
(async function () {
  // inject header/footer if placeholders exist
  const inject = async (sel, file) => {
    const host = document.querySelector(sel);
    if (!host) return;
    try {
      const res = await fetch(file);
      if (res.ok) {
        host.innerHTML = await res.text();
      }
    } catch (error) {
      console.error(`Failed to load ${file}:`, error);
    }
  };

  await inject('#site-header', '/components/presets/header.html');
  await inject('#site-footer', '/components/presets/footer.html');

  // After injection, set active nav
  const path = location.pathname;
  const map = [
    { key: 'index.html', nav: 'home' },
    { key: '/pages/about.html', nav: 'about' },
    { key: '/pages/projects.html', nav: 'projects' },
    { key: '/pages/blog.html', nav: 'blog' },
    { key: '/pages/contacts.html', nav: 'contact' },
  ];
  const activeKey = map.find(m => path.endsWith(m.key))?.nav || (path === '/' ? 'home' : null);
  if (activeKey) {
    // Wait a bit for the nav to be injected
    setTimeout(() => {
      document.querySelectorAll('nav a').forEach(a => {
        a.classList.toggle('active', a.dataset.nav === activeKey);
      });
    }, 100);
  }

  // Smooth scroll for in‑page anchors
  document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
      const id = e.target.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
})();