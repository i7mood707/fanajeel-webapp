// فناجيل — shared behaviors: mobile nav, game filters, contact form

(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => navbar.classList.toggle('is-open'));
  }

  const form = document.querySelector('.contact-card form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const msg = form.querySelector('.form-msg');
      if (msg) msg.textContent = 'وصلت رسالتك! بنرد عليك قريب.';
      form.reset();
    });
  }

  const filterBtns = document.querySelectorAll('.filter-btn');
  const gameCards = document.querySelectorAll('.game-card');
  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      gameCards.forEach((card) => {
        card.style.display = f === 'all' || card.dataset.status === f ? '' : 'none';
      });
    });
  });
})();
