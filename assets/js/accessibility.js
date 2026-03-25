(function() {
    function initAccessibility() {
        const bviBtn = document.getElementById('toggle-bvi');
        const darkBtn = document.getElementById('toggle-dark-mode');
        const body = document.body;

        // ==========================
        // 1. Dark Mode
        // ==========================
        if (darkBtn) {
            // Check system preference or localStorage
            let isDarkMode = localStorage.getItem('dark-mode') === 'true';
            if (localStorage.getItem('dark-mode') === null) {
                isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
            }
            if (isDarkMode) body.classList.add('dark-mode');

            // Set correct icon
            function updateDarkIcon() {
                darkBtn.querySelector('i').className = body.classList.contains('dark-mode') ? 'fas fa-sun' : 'fas fa-moon';
            }
            updateDarkIcon();

            darkBtn.addEventListener('click', function(e) {
                e.preventDefault();
                body.classList.toggle('dark-mode');
                localStorage.setItem('dark-mode', body.classList.contains('dark-mode'));
                updateDarkIcon();
            });
        }

        // ==========================
        // 2. BVI Panel (Версия для слабовидящих)
        // ==========================
        if (!bviBtn) return;

        const bviPanel = document.createElement('div');
        bviPanel.className = 'bvi-panel';
        bviPanel.innerHTML = `
            <div class="bvi-panel-content">
                <div class="bvi-group">
                    <span class="bvi-label">Шрифт:</span>
                    <button class="bvi-btn bvi-font-btn" data-fz="normal">A</button>
                    <button class="bvi-btn bvi-font-btn" style="font-size:18px;" data-fz="large">A+</button>
                    <button class="bvi-btn bvi-font-btn" style="font-size:22px;" data-fz="xlarge">A++</button>
                </div>
                <div class="bvi-group">
                    <span class="bvi-label">Цвет:</span>
                    <button class="bvi-btn bvi-color-btn color-bw" data-theme="bw">А</button>
                    <button class="bvi-btn bvi-color-btn color-wb" data-theme="wb">А</button>
                    <button class="bvi-btn bvi-color-btn color-by" data-theme="by">А</button>
                    <button class="bvi-btn bvi-color-btn color-normal" data-theme="normal">А</button>
                </div>
                <div class="bvi-group">
                    <span class="bvi-label">Изображения:</span>
                    <button class="bvi-btn bvi-img-btn" data-img="on"><i class="fas fa-image"></i> Вкл</button>
                    <button class="bvi-btn bvi-img-btn" data-img="off"><i class="fas fa-eye-slash"></i> Выкл</button>
                </div>
                <button class="bvi-close-btn">&times;</button>
            </div>
        `;
        document.body.prepend(bviPanel);

        let isBviActive = localStorage.getItem('bvi-active') === 'true';
        let currentFz = localStorage.getItem('bvi-fz') || 'normal';
        let currentTheme = localStorage.getItem('bvi-theme') || 'normal';
        let currentImg = localStorage.getItem('bvi-img') || 'on';

        function updateBviState() {
            body.classList.remove('bvi-fz-normal', 'bvi-fz-large', 'bvi-fz-xlarge');
            body.classList.remove('bvi-theme-bw', 'bvi-theme-wb', 'bvi-theme-by', 'bvi-theme-normal');
            body.classList.remove('bvi-img-off', 'bvi-img-on');

            if (isBviActive) {
                bviPanel.classList.add('visible');
                body.classList.add('bvi-active');
                body.classList.add('bvi-fz-' + currentFz);
                body.classList.add('bvi-theme-' + currentTheme);
                body.classList.add('bvi-img-' + currentImg);
                
                // Active button highlighting
                bviPanel.querySelectorAll('.bvi-font-btn').forEach(b => b.classList.toggle('active', b.dataset.fz === currentFz));
                bviPanel.querySelectorAll('.bvi-color-btn').forEach(b => b.classList.toggle('active', b.dataset.theme === currentTheme));
                bviPanel.querySelectorAll('.bvi-img-btn').forEach(b => b.classList.toggle('active', b.dataset.img === currentImg));
            } else {
                bviPanel.classList.remove('visible');
                body.classList.remove('bvi-active');
            }
        }

        bviBtn.addEventListener('click', function(e) {
            e.preventDefault();
            isBviActive = !isBviActive;
            localStorage.setItem('bvi-active', isBviActive);
            updateBviState();
            // Automatically turn off dark mode if BVI is activated (to prevent conflicts)
            if (isBviActive && body.classList.contains('dark-mode')) {
                darkBtn.click();
            }
        });

        bviPanel.querySelector('.bvi-close-btn').addEventListener('click', function() {
            isBviActive = false;
            localStorage.setItem('bvi-active', false);
            updateBviState();
        });

        bviPanel.querySelectorAll('.bvi-font-btn').forEach(b => {
            b.addEventListener('click', function() {
                currentFz = this.dataset.fz;
                localStorage.setItem('bvi-fz', currentFz);
                updateBviState();
            });
        });

        bviPanel.querySelectorAll('.bvi-color-btn').forEach(b => {
            b.addEventListener('click', function() {
                currentTheme = this.dataset.theme;
                localStorage.setItem('bvi-theme', currentTheme);
                updateBviState();
            });
        });

        bviPanel.querySelectorAll('.bvi-img-btn').forEach(b => {
            b.addEventListener('click', function() {
                currentImg = this.dataset.img;
                localStorage.setItem('bvi-img', currentImg);
                updateBviState();
            });
        });

        updateBviState();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAccessibility);
    } else {
        initAccessibility();
    }
})();