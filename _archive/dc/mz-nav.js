/* Maslow Ascent — mobile nav: staircase burger + navy curtain menu.
   Injected outside the React root so re-renders can't clobber it. */
(function () {
  if (window.__mzNav) return; window.__mzNav = 1;
  var TICKS = ['#73C1AE', '#A070A6', '#EBA93D', '#DA85B2', '#654C8F', '#86E8CE'];
  var EASE = 'cubic-bezier(.2,.7,.2,1)';

  function boot() {
    var nav = document.querySelector('[data-screen-label="Nav"]');
    if (!nav) return void setTimeout(boot, 180);
    var row = nav.querySelector(':scope>div');
    if (!row) return; // minimal landing nav — logo + single CTA already fit
    var anchors = [].slice.call(row.querySelectorAll('a'));
    if (anchors.length < 2) return;
    var cta = null;
    anchors.forEach(function (a) {
      var attr = a.getAttribute('style') || '';
      var bg = (getComputedStyle(a).backgroundColor || '').replace(/\s/g, '');
      if (/EE7BB3/i.test(attr) || bg === 'rgb(238,123,179)') cta = a;
    });
    var links = anchors.filter(function (a) { return a !== cta; });
    build(links, cta);
  }

  function samePage(href) {
    try {
      var u = new URL(href, location.href);
      return decodeURIComponent(u.pathname) === decodeURIComponent(location.pathname) && !u.hash;
    } catch (e) { return false; }
  }

  function build(links, cta) {
    var html = document.documentElement;
    html.classList.add('mz-has-burger');

    var css = document.createElement('style');
    css.id = 'mz-nav-css';
    css.textContent =
      '.mz-nav-cluster{position:fixed;top:8px;right:12px;z-index:220;display:none;align-items:center;gap:8px}' +
      '@media (max-width:860px){html.mz-has-burger .mz-nav-cluster{display:flex}}' +
      'html[data-mz-nav-demo] .mz-nav-cluster{display:flex!important}' +
      '.mz-nav-book{height:44px;display:inline-flex;align-items:center;padding:0 16px;border-radius:8px;background:#EE7BB3;color:#FFFFFF;font:600 11px "Manrope",sans-serif;letter-spacing:1.6px;text-decoration:none;white-space:nowrap;transition:opacity .25s,transform .3s ' + EASE + '}' +
      '.mz-nav-book:active{transform:scale(.96)}' +
      '.mz-nav-book .s{display:none}' +
      '@media (max-width:404px){.mz-nav-book .l{display:none}.mz-nav-book .s{display:inline}}' +
      'html.mz-open .mz-nav-book{opacity:0;pointer-events:none;transform:translateX(8px)}' +
      '.mz-burger{width:48px;height:48px;border:1px solid #E6EAF3;border-radius:10px;background:rgba(255,255,255,.92);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;transition:background .3s,border-color .3s}' +
      '.mz-burger:active{transform:scale(.95)}' +
      'html.mz-open .mz-burger{background:rgba(255,255,255,.07);border-color:rgba(184,196,217,.32)}' +
      '.mz-burger .mzb-w{width:22px;display:flex;flex-direction:column;align-items:flex-end;gap:5px}' +
      '.mz-burger .mzb{display:block;height:2px;border-radius:1px;background:#192332;transition:width .35s ' + EASE + ',transform .35s ' + EASE + ',opacity .2s,background .3s}' +
      '.mz-burger .mzb1{width:10px}.mz-burger .mzb2{width:16px}.mz-burger .mzb3{width:22px}' +
      '.mz-burger:hover .mzb1,.mz-burger:hover .mzb2{width:22px}' +
      'html.mz-open .mz-burger .mzb{background:#FFFFFF;width:22px}' +
      'html.mz-open .mz-burger .mzb1{transform:translateY(7px) rotate(45deg)}' +
      'html.mz-open .mz-burger .mzb2{opacity:0}' +
      'html.mz-open .mz-burger .mzb3{transform:translateY(-7px) rotate(-45deg)}' +
      '.mz-menu{position:fixed;inset:0;z-index:200;background:#192332;display:flex;flex-direction:column;overflow:auto;-webkit-overflow-scrolling:touch;padding:calc(8px + env(safe-area-inset-top)) 20px calc(22px + env(safe-area-inset-bottom));visibility:hidden;clip-path:inset(0 0 102% 0);transition:clip-path .5s cubic-bezier(.75,0,.2,1),visibility 0s .5s}' +
      'html.mz-open .mz-menu{visibility:visible;clip-path:inset(0 0 -1% 0);transition:clip-path .5s cubic-bezier(.75,0,.2,1)}' +
      '.mz-menu>*{width:100%;max-width:640px;margin-left:auto;margin-right:auto}' +
      '.mz-menu-wm{position:fixed;right:-52px;bottom:-46px;width:300px;opacity:.07;pointer-events:none;animation:mzNavFloat 9s ease-in-out infinite}' +
      '@keyframes mzNavFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}' +
      '.mz-menu-link,.mz-menu-cta,.mz-menu-eyebrow,.mz-menu-meta{opacity:0;transform:translateY(16px);transition:opacity .4s ease,transform .5s ' + EASE + ';transition-delay:0s}' +
      'html.mz-open .mz-menu-link,html.mz-open .mz-menu-cta,html.mz-open .mz-menu-eyebrow,html.mz-open .mz-menu-meta{opacity:1;transform:none;transition-delay:var(--d,.1s)}' +
      '.mz-menu-link:active{background:rgba(255,255,255,.04)}' +
      '@media (prefers-reduced-motion:reduce){.mz-menu,html.mz-open .mz-menu{transition:none}.mz-menu-link,.mz-menu-cta,.mz-menu-eyebrow,.mz-menu-meta{transition:none;transform:none}.mz-burger .mzb{transition:none}.mz-menu-wm{animation:none}}';
    document.head.appendChild(css);

    var menu = document.createElement('div');
    menu.className = 'mz-menu';
    menu.setAttribute('role', 'dialog');
    menu.setAttribute('aria-modal', 'true');
    menu.setAttribute('aria-label', 'Site menu');
    menu.id = 'mz-menu';

    var s = function (el, style) { el.style.cssText = style; return el; };
    var mk = function (tag, cls) { var el = document.createElement(tag); if (cls) el.className = cls; return el; };

    // header row: wordmark mirrors the nav, in ice/white
    var head = s(mk('div'), 'display:flex;align-items:center;height:56px;flex:none');
    var brand = mk('a'); brand.href = 'Maslow Homepage.dc.html';
    s(brand, 'display:flex;align-items:center;gap:11px;text-decoration:none');
    var mark = mk('img'); mark.src = 'assets/maslow-mark-white.svg'; mark.alt = 'Maslow AI';
    s(mark, 'width:36px;height:23px');
    var wm1 = mk('span'); wm1.textContent = 'MASLOW'; s(wm1, "font:600 14px 'Manrope',sans-serif;letter-spacing:2px;color:#FFFFFF");
    var wsep = mk('span'); wsep.textContent = '|'; s(wsep, "color:#3A4A6B;font:400 14px 'Manrope',sans-serif");
    var wm2 = mk('span'); wm2.textContent = 'AI'; s(wm2, "font:500 10px 'IBM Plex Mono',monospace;letter-spacing:3px;color:#FFFFFF");
    brand.appendChild(mark); brand.appendChild(wm1); brand.appendChild(wsep); brand.appendChild(wm2);
    head.appendChild(brand);
    menu.appendChild(head);

    var eyebrow = mk('div', 'mz-menu-eyebrow'); eyebrow.textContent = 'NAVIGATE';
    eyebrow.style.cssText = "font:500 10px 'IBM Plex Mono',monospace;letter-spacing:3px;color:#B8C4D9;margin:26px auto 4px";
    eyebrow.style.setProperty('--d', '.08s');
    menu.appendChild(eyebrow);

    var list = s(mk('nav'), 'display:flex;flex-direction:column;flex:none');
    links.forEach(function (src, i) {
      var here = samePage(src.getAttribute('href'));
      var a = mk('a', 'mz-menu-link');
      a.href = src.getAttribute('href');
      s(a, 'display:flex;align-items:center;gap:16px;min-height:60px;padding:6px 2px;border-bottom:1px solid rgba(184,196,217,.16);text-decoration:none');
      a.style.setProperty('--d', (0.14 + i * 0.055).toFixed(3) + 's');
      var idx = mk('span'); idx.textContent = '0' + (i + 1);
      s(idx, "font:500 11px 'IBM Plex Mono',monospace;letter-spacing:2px;color:" + TICKS[i % TICKS.length]);
      var lbl = mk('span'); lbl.textContent = src.textContent.trim();
      s(lbl, "font:600 23px 'Manrope',sans-serif;letter-spacing:-.4px;color:" + (here ? '#FFF860' : '#FFFFFF'));
      var arrow = mk('span'); arrow.textContent = here ? 'YOU ARE HERE' : '\u2197';
      s(arrow, 'margin-left:auto;' + (here
        ? "font:500 9px 'IBM Plex Mono',monospace;letter-spacing:2px;color:#FFF860"
        : "font:400 18px 'Manrope',sans-serif;color:rgba(184,196,217,.55)"));
      a.appendChild(idx); a.appendChild(lbl); a.appendChild(arrow);
      list.appendChild(a);
    });
    menu.appendChild(list);

    var ctas = mk('div', 'mz-menu-cta');
    s(ctas, 'display:flex;flex-direction:column;gap:12px;margin-top:30px;flex:none');
    ctas.style.setProperty('--d', (0.14 + links.length * 0.055 + 0.06).toFixed(3) + 's');
    var c1 = mk('a'); c1.href = cta ? cta.getAttribute('href') : 'Contact.dc.html';
    c1.textContent = cta ? cta.textContent.trim() : 'BOOK A CONSULTATION';
    s(c1, "height:52px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:#EE7BB3;color:#FFFFFF;font:600 12px 'Manrope',sans-serif;letter-spacing:2px;text-decoration:none;text-align:center");
    var c2 = mk('a'); c2.href = 'Assessment.dc.html'; c2.textContent = 'TAKE THE 2-MINUTE ASSESSMENT';
    s(c2, "height:52px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid rgba(184,196,217,.4);color:#FFFFFF;font:600 12px 'Manrope',sans-serif;letter-spacing:2px;text-decoration:none;text-align:center");
    ctas.appendChild(c1); ctas.appendChild(c2);
    menu.appendChild(ctas);

    var meta = mk('div', 'mz-menu-meta');
    s(meta, 'display:flex;justify-content:space-between;align-items:center;gap:14px;margin-top:auto;padding-top:26px;flex:none');
    meta.style.setProperty('--d', (0.14 + links.length * 0.055 + 0.12).toFixed(3) + 's');
    var mail = mk('a'); mail.href = 'mailto:hello@maslow.ai'; mail.textContent = 'hello@maslow.ai';
    s(mail, "font:400 13px 'Manrope',sans-serif;color:#B8C4D9;text-decoration:none;padding:10px 0");
    var cop = mk('span'); cop.textContent = '\u00A9 2026 MASLOW AI';
    s(cop, "font:500 9px 'IBM Plex Mono',monospace;letter-spacing:2px;color:#5A6A8C");
    meta.appendChild(mail); meta.appendChild(cop);
    menu.appendChild(meta);

    var wmark = mk('img', 'mz-menu-wm'); wmark.src = 'assets/maslow-mark-white.svg'; wmark.alt = '';
    menu.appendChild(wmark);

    var cluster = mk('div', 'mz-nav-cluster');
    var book = mk('a', 'mz-nav-book'); book.href = cta ? cta.getAttribute('href') : 'Contact.dc.html';
    book.innerHTML = '<span class="l">BOOK A CALL</span><span class="s">BOOK</span>';
    var btn = mk('button', 'mz-burger');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Open menu');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-controls', 'mz-menu');
    var bw = mk('span', 'mzb-w');
    ['mzb mzb1', 'mzb mzb2', 'mzb mzb3'].forEach(function (c) { bw.appendChild(mk('span', c)); });
    btn.appendChild(bw);
    cluster.appendChild(book); cluster.appendChild(btn);

    document.body.appendChild(menu);
    document.body.appendChild(cluster);

    var open = function () {
      html.classList.add('mz-open');
      html.style.overflow = 'hidden'; document.body.style.overflow = 'hidden';
      btn.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-label', 'Close menu');
      setTimeout(function () { var f = menu.querySelector('a'); if (f) try { f.focus({ preventScroll: true }); } catch (e) { } }, 520);
    };
    var close = function () {
      html.classList.remove('mz-open');
      html.style.overflow = ''; document.body.style.overflow = '';
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', 'Open menu');
      try { btn.focus({ preventScroll: true }); } catch (e) { }
    };
    btn.addEventListener('click', function () { html.classList.contains('mz-open') ? close() : open(); });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) close(); });
    document.addEventListener('keydown', function (e) {
      if (!html.classList.contains('mz-open')) return;
      if (e.key === 'Escape') { close(); return; }
      if (e.key === 'Tab') {
        var f = [].slice.call(menu.querySelectorAll('a')).concat([btn]);
        var first = f[0], last = btn;
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    var mq = matchMedia('(max-width:860px)');
    var onmq = function () { if (!mq.matches && !html.hasAttribute('data-mz-nav-demo')) close(); };
    mq.addEventListener ? mq.addEventListener('change', onmq) : mq.addListener(onmq);
    window.__mzNavOpen = open; window.__mzNavClose = close;
  }

  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', boot) : boot();
})();
