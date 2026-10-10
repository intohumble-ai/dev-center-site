// 정적 페이지용 작은 스크립트: 필터·탭·(가능하면) status.json 재조회. 입력 폼 없음.
(function () {
  const f = document.querySelector('[data-filter]');
  if (f) {
    f.addEventListener('click', (e) => {
      const b = e.target.closest('button'); if (!b) return;
      f.querySelectorAll('button').forEach(x => x.classList.toggle('on', x === b));
      const k = b.dataset.f;
      document.querySelectorAll('.card[data-status]').forEach(c => {
        c.style.display = (k === 'all' || c.dataset.status === k) ? '' : 'none';
      });
    });
  }
  const t = document.querySelector('[data-tabs]');
  if (t) {
    const show = (k) => {
      t.querySelectorAll('button').forEach(x => x.classList.toggle('on', x.dataset.t === k));
      document.querySelectorAll('.tab').forEach(s => s.classList.toggle('on', s.dataset.p === k));
    };
    t.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { show(b.dataset.t); location.hash = b.dataset.t; } });
    const h = location.hash.replace('#', '');
    if (h && t.querySelector(`[data-t="${h}"]`)) show(h);
  }
  // 서비스 상태 색: status.json 을 다시 읽어 최신으로(같은 origin, 실패해도 조용히)
  const live = document.querySelector('[data-live]');
  if (live) {
    fetch('../status.json', { cache: 'no-store' }).then(r => r.json()).then(j => {
      const s = (j.projects || {})[live.dataset.live]; if (!s) return;
      const el = live.querySelector('.svc'); if (el && s.service) { el.textContent = s.service; el.classList.toggle('active', s.service === 'active'); }
    }).catch(() => {});
  }
})();
