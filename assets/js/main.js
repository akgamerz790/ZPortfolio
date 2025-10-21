// main.js
(function () {
  const path = location.pathname.split('/').pop() || 'index.html';
  const map = {
    'index.html': 'home',
    'about.html': 'about',
    'projects.html': 'projects',
    'blog.html': 'blog',
    'contact.html': 'contact'
  };
  const active = map[path] || null;
  if (active) {
    document.querySelectorAll('nav a').forEach(a => {
      a.classList.toggle('active', a.dataset.nav === active);
    });
  }

  // Smooth scroll for on-page anchors
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
