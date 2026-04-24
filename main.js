  (function () {
    'use strict';

    const IMG_BASE = 'https://www.hatada-kuritaruto.jp/pic-labo/llimg/2026_natsu_kirinuki_';

    /* =============================================================
       ShopServe カートURL設定
       下記 ##URL_*## をShopServe管理画面の実際のURLに置換してください。

       URLの形式：
       https://[ドメイン]/cart/cart.cgi?id=[商品番号]&v=[バリエーション枝番号]&count=1

       ・商品番号(id)   : 管理画面 > 商品編集ページで確認
       ・バリエーション枝番号(v) : 項目選択肢ごとに割り振られた番号
       ・#lineup : 商品一覧TOPへ誘導するボタン（2か所）

       置換対象一覧（計17箇所）:
         #lineup
         https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=seto004&count=1  https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=seto006&count=1  https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=seto009&count=1  https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=seto012&count=1  https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=seto016&count=1
         https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=sima004&count=1  https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=sima006&count=1  https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=sima009&count=1  https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=sima012&count=1  https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=sima016&count=1
         https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=mix004&count=1   https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=mix006&count=1   https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=mix009&count=1   https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=mix012&count=1   https://www.hatada-kuritaruto.jp/cart/cart.cgi?id=2026_0001&v=mix016&count=1
       ============================================================= */
    const PRODUCTS = [
      { cat: 'seto',     name: '瀬戸内ぜりぃ\n4個入',   price: 1600, qty: '4個入',  img: '01', contents: '瀬戸内檸檬×1　白桃×1　伊予柑×1　岡山ピオーネ×1',             itm: '301-26-', var1: '4個入'  },
      { cat: 'seto',     name: '瀬戸内ぜりぃ\n6個入',   price: 2400, qty: '6個入',  img: '02', contents: '瀬戸内檸檬×2　白桃×1　伊予柑×2　岡山ピオーネ×1',             itm: '301-26-', var1: '6個入'  },
      { cat: 'seto',     name: '瀬戸内ぜりぃ\n9個入',   price: 3600, qty: '9個入',  img: '03', contents: '瀬戸内檸檬×2　白桃×2　伊予柑×3　岡山ピオーネ×2',             itm: '301-26-', var1: '9個入'  },
      { cat: 'seto',     name: '瀬戸内ぜりぃ\n12個入',  price: 4800, qty: '12個入', img: '04', contents: '瀬戸内檸檬×3　白桃×3　伊予柑×3　岡山ピオーネ×3',             itm: '301-26-', var1: '12個入' },
      { cat: 'seto',     name: '瀬戸内ぜりぃ\n16個入',  price: 6400, qty: '16個入', img: '05', contents: '瀬戸内檸檬×4　白桃×4　伊予柑×4　岡山ピオーネ×4',             itm: '301-26-', var1: '16個入' },
      { cat: 'shimanto', name: '四万十水ようかん\n4個入',  price: 1600, qty: '4個入',  img: '06', contents: 'ねり×2　小倉×1　抹茶×1',                                    itm: '242-26-', var1: '4個入'  },
      { cat: 'shimanto', name: '四万十水ようかん\n6個入',  price: 2400, qty: '6個入',  img: '07', contents: 'ねり×2　小倉×2　抹茶×2',                                    itm: '242-26-', var1: '6個入'  },
      { cat: 'shimanto', name: '四万十水ようかん\n9個入',  price: 3600, qty: '9個入',  img: '08', contents: 'ねり×3　小倉×3　抹茶×3',                                    itm: '242-26-', var1: '9個入'  },
      { cat: 'shimanto', name: '四万十水ようかん\n12個入', price: 4800, qty: '12個入', img: '09', contents: 'ねり×4　小倉×4　抹茶×4',                                    itm: '242-26-', var1: '12個入' },
      { cat: 'shimanto', name: '四万十水ようかん\n16個入', price: 6400, qty: '16個入', img: '10', contents: 'ねり×8　小倉×4　抹茶×4',                                    itm: '242-26-', var1: '16個入' },
      { cat: 'mix', name: '瀬戸内ぜりぃ×四万十水ようかん\n4個入',  price: 1600, qty: '4個入',  img: '11', contents: 'ぜりぃ 瀬戸内檸檬×1 伊予柑×1　水ようかん ねり×1 抹茶×1',                               itm: '243-26-', var1: '4個入'  },
      { cat: 'mix', name: '瀬戸内ぜりぃ×四万十水ようかん\n6個入',  price: 2400, qty: '6個入',  img: '12', contents: 'ぜりぃ 瀬戸内檸檬×1 伊予柑×1 岡山ピオーネ×1　水ようかん ねり×1 小倉×1 抹茶×1',       itm: '243-26-', var1: '6個入'  },
      { cat: 'mix', name: '瀬戸内ぜりぃ×四万十水ようかん\n9個入',  price: 3600, qty: '9個入',  img: '13', contents: 'ぜりぃ 瀬戸内檸檬×2 白桃×1 伊予柑×2 岡山ピオーネ×1　水ようかん ねり×1 小倉×1 抹茶×1', itm: '243-26-', var1: '9個入'  },
      { cat: 'mix', name: '瀬戸内ぜりぃ×四万十水ようかん\n12個入', price: 4800, qty: '12個入', img: '14', contents: 'ぜりぃ 瀬戸内檸檬×2 白桃×2 伊予柑×2 岡山ピオーネ×2　水ようかん ねり×2 小倉×1 抹茶×1', itm: '243-26-', var1: '12個入' },
      { cat: 'mix', name: '瀬戸内ぜりぃ×四万十水ようかん\n16個入', price: 6400, qty: '16個入', img: '15', contents: 'ぜりぃ 瀬戸内檸檬×2 白桃×2 伊予柑×2 岡山ピオーネ×2　水ようかん ねり×4 小倉×2 抹茶×2', itm: '243-26-', var1: '16個入' },
    ];

    const CAT_LABEL = { seto: '瀬戸内ぜりぃ', shimanto: '四万十水ようかん', mix: '詰め合わせ' };

    let fadeObserver;

    let activeCat   = 'all';
    let activePrice = 'all';

    function renderProducts() {
      const grid = document.getElementById('productGrid');
      const filtered = PRODUCTS.filter(p => {
        const catOk   = activeCat   === 'all' || p.cat === activeCat;
        const priceOk = activePrice === 'all' || p.price === Number(activePrice);
        return catOk && priceOk;
      });
      if (!filtered.length) {
        grid.innerHTML = '<div class="filter-empty">該当する商品がありません</div>';
        return;
      }
      grid.innerHTML = filtered.map(p => {
          const [line1, line2] = p.name.split('\n');
          const isPopular = p.price === 3600;
          const formattedContents = p.contents.replace(/\u3000/g, '<br>');
          return `
            <div class="product-card fade-in">
              <div class="product-card__img-wrap">
                <img loading="lazy" src="${IMG_BASE}${p.img}.jpg" alt="${p.name.replace('\n', ' ')}" />
                <span class="product-card__type type--${p.cat}">${CAT_LABEL[p.cat]}</span>
                ${isPopular ? '<span class="product-card__badge">人　気</span>' : ''}
              </div>
              <div class="product-card__body">
                <div class="product-card__name">${line2 ? `${line1}<br>${line2}` : line1}</div>
                <div class="product-card__divider"></div>
                <p class="product-card__contents">${formattedContents}</p>
                <div class="product-card__divider"></div>
                <div class="product-card__price-row">
                  <div>
                    <div class="product-card__price">${p.price.toLocaleString()}<span>円</span></div>
                    <div class="product-card__price-tax">税込</div>
                  </div>
                  <div class="product-card__qty">${p.qty}</div>
                </div>
                <div class="product-card__cta-wrap">
                  <form class="product-card__cart-form" method="POST" action="https://www.hatada-kuritaruto.jp/CART/cart.php">
                    <input type="hidden" name="ITM-1" value="${p.itm}">
                    <input type="hidden" name="ITEM_NO" value="${p.itm}">
                    <input type="hidden" name="VAR1-1" value="${p.var1}">
                    <input type="hidden" name="CNT-1" value="1">
                    <button type="submit" class="product-card__cta">カートに入れる →</button>
                  </form>
                </div>
              </div>
            </div>`;
        })
        .join('');
      if (fadeObserver) grid.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
    }

    function initFilter() {
      const catTabs   = document.querySelectorAll('.filter-tab--cat');
      const priceTabs = document.querySelectorAll('.filter-tab--price');

      // HTMLの data-default-cat 属性から初期カテゴリを設定
      const filterGroup = document.getElementById('filterGroup');
      const defaultCat  = filterGroup && filterGroup.dataset.defaultCat;
      if (defaultCat && defaultCat !== 'all') {
        activeCat = defaultCat;
        catTabs.forEach(t => delete t.dataset.active);
        const defaultTab = document.querySelector('[data-filter="' + defaultCat + '"]');
        if (defaultTab) defaultTab.dataset.active = defaultCat;
      }

      catTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          catTabs.forEach(t => delete t.dataset.active);
          tab.dataset.active = tab.dataset.filter;
          activeCat = tab.dataset.filter;
          renderProducts();
        });
      });

      priceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
          priceTabs.forEach(t => delete t.dataset.active);
          tab.dataset.active = tab.dataset.price;
          activePrice = tab.dataset.price;
          renderProducts();
        });
      });
    }

    function initCarousel() {
      const root    = document.getElementById('carousel');
      const track   = root.querySelector('.carousel__track');
      const slides  = root.querySelectorAll('.carousel__slide');
      const dotsEl  = document.getElementById('carouselDots');
      const btnPrev = root.querySelector('.carousel__btn--prev');
      const btnNext = root.querySelector('.carousel__btn--next');
      if (!track || !slides.length) return;

      let current = 0, timer;

      function goTo(i) {
        current = (i + slides.length) % slides.length;
        track.style.transform = `translateX(-${current * 100}%)`;
        dotsEl.querySelectorAll('.carousel__dot').forEach((d, j) => d.classList.toggle('is-active', j === current));
      }

      function startAuto() { timer = setInterval(() => goTo(current + 1), 4500); }
      function resetAuto() { clearInterval(timer); startAuto(); }

      slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'carousel__dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', `スライド ${i + 1}`);
        dot.addEventListener('click', () => { goTo(i); resetAuto(); });
        dotsEl.appendChild(dot);
      });

      btnPrev.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
      btnNext.addEventListener('click', () => { goTo(current + 1); resetAuto(); });

      // Touch / swipe support
      let touchStartX = 0;
      root.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
      root.addEventListener('touchend', e => {
        const dx = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(dx) > 45) { goTo(current + (dx > 0 ? 1 : -1)); resetAuto(); }
      }, { passive: true });

      startAuto();
    }

    function initCountdown() {
      const timerEl = document.querySelector('.early-bird__timer');
      if (!timerEl) return;
      const DEADLINE = new Date('2026-07-31T23:59:59');
      function update() {
        const diff  = DEADLINE - new Date();
        if (diff <= 0) { timerEl.innerHTML = '残り <span class="early-bird__days">0</span> 日'; return; }
        const days  = Math.floor(diff / 86400000);
        const hours = Math.floor(diff / 3600000);
        const unit  = days >= 1 ? `${days}</span> 日` : `${hours}</span> 時間`;
        timerEl.innerHTML = `残り <span class="early-bird__days">${unit}`;
      }
      update();
      setInterval(update, 60000);
    }

    function initFadeIn() {
      if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.fade-in').forEach(el => el.classList.add('is-visible'));
        return;
      }
      fadeObserver = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('is-visible'); fadeObserver.unobserve(e.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' });
      document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));
    }

    function initFaq() {
      document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
          const item = btn.closest('.faq-item');
          const answer = item.querySelector('.faq-a');
          const isOpen = item.classList.contains('is-open');

          // Close all others
          document.querySelectorAll('.faq-item.is-open').forEach(open => {
            if (open !== item) {
              open.classList.remove('is-open');
              open.querySelector('.faq-a').style.maxHeight = '0';
              open.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
            }
          });

          if (isOpen) {
            item.classList.remove('is-open');
            answer.style.maxHeight = '0';
            btn.setAttribute('aria-expanded', 'false');
          } else {
            item.classList.add('is-open');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            btn.setAttribute('aria-expanded', 'true');
          }
        });
      });
    }

    function initBackToTop() {
      const btn = document.getElementById('backTop');
      if (!btn) return;
      window.addEventListener('scroll', () => {
        btn.classList.toggle('is-visible', window.scrollY > 400);
      }, { passive: true });
      btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    function init() {
      initFadeIn();
      initCountdown();
      initCarousel();
      initFilter();
      renderProducts();
      initFaq();
      initBackToTop();
    }

    document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init();
  }());
