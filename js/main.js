// فناجيل — shared behaviors: mobile nav, game filters, contact form

(function () {
  const navToggle = document.querySelector('.nav-toggle');
  const navbar = document.querySelector('.navbar');
  if (navToggle && navbar) {
    navToggle.addEventListener('click', () => navbar.classList.toggle('is-open'));
  }

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const msg = form.querySelector('.form-msg');
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      if (msg) { msg.style.color = ''; msg.textContent = 'يتم الإرسال...'; }
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        const data = await res.json().catch(() => null);
        if (!res.ok || !data || data.success === 'false' || data.success === false) {
          throw new Error((data && data.message) || 'bad response');
        }
        if (msg) msg.textContent = 'وصلت رسالتك! بنرد عليك قريب.';
        form.reset();
      } catch (err) {
        if (msg) { msg.style.color = '#c0392b'; msg.textContent = 'صار خطأ، جرب مرة ثانية أو راسلنا مباشرة على الإيميل.'; }
      } finally {
        submitBtn.disabled = false;
      }
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
