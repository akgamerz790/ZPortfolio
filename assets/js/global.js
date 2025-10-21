// Simple component include + nav active + smooth scroll
(async function () {
  // inject header/footer if placeholders exist
  const inject = async (sel, file) => {
    const host = document.querySelector(sel);
    if (!host) return;
    const res = await fetch(file);
    host.innerHTML = await res.text();
  };

  await inject('#site-header', '/components/header.html');
  await inject('#site-footer', '/components/footer.html');

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
    document.querySelectorAll('nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.nav === activeKey);
    });
  }

  // Smooth scroll for in‑page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
