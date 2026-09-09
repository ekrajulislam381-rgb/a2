/* CosmicGearLine Master Interactive Navigation & UI Script */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.querySelector('.mobile-toggle');
  const mainNav = document.querySelector('.main-nav');
  
  let backdrop = document.querySelector('.nav-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'nav-backdrop';
    document.body.appendChild(backdrop);
  }

  function toggleMenu() {
    const isOpen = mainNav.classList.toggle('active');
    backdrop.classList.toggle('active', isOpen);
    toggleBtn.setAttribute('aria-expanded', isOpen);
    toggleBtn.innerHTML = isOpen ? '✕' : '☰';
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  function closeMenu() {
    if (mainNav) mainNav.classList.remove('active');
    if (backdrop) backdrop.classList.remove('active');
    if (toggleBtn) {
      toggleBtn.setAttribute('aria-expanded', 'false');
      toggleBtn.innerHTML = '☰';
    }
    document.body.style.overflow = '';
  }

  if (toggleBtn && mainNav) {
    toggleBtn.addEventListener('click', toggleMenu);
    backdrop.addEventListener('click', closeMenu);
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html') || (currentPath.includes(href) && href !== 'index.html' && href !== '../index.html')) {
      link.classList.add('active');
    }
  });

  // Tabs
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
      btn.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) targetContent.classList.add('active');
    });
  });

  // FAQs
  document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
      const parent = item.parentElement;
      const answer = parent.querySelector('.faq-answer');
      const icon = item.querySelector('.faq-icon');
      if (answer) {
        const isHidden = answer.style.display === 'none';
        answer.style.display = isHidden ? 'block' : 'none';
        if (icon) icon.style.transform = isHidden ? 'rotate(180deg)' : 'rotate(0deg)';
      }
    });
  });
});
