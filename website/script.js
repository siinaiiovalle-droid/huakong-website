// 平滑滚动 + 移动端菜单
(function () {
  // 平滑滚动
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id.length <= 1) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.pageYOffset - 68;
      window.scrollTo({ top: top, behavior: 'smooth' });
      // 关闭移动端菜单
      var nav = document.querySelector('.primary-nav');
      if (nav) nav.classList.remove('open');
    });
  });

  // 移动端菜单切换
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });
  }

  // 滚动时高亮当前章节（简单 scrollspy）
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.primary-nav a[href^="#"]');
  function updateActive() {
    var scrollY = window.pageYOffset + 120;
    var current = '';
    sections.forEach(function (s) {
      if (s.offsetTop <= scrollY) current = s.id;
    });
    navLinks.forEach(function (l) {
      l.style.color = '';
      if (l.getAttribute('href') === '#' + current) {
        l.style.color = 'var(--c-ink)';
      }
    });
  }
  window.addEventListener('scroll', updateActive, { passive: true });
  updateActive();
})();
