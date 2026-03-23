document.addEventListener('DOMContentLoaded', () => {
    const newsCards = document.querySelectorAll('.news-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const subscribeForm = document.getElementById('subscribeForm');
    
    let visibleCount = 6; // Сколько новостей показывать изначально

    // --- 1. ПАГИНАЦИЯ (Загрузить еще) ---
    function updateVisibility() {
        newsCards.forEach((card, index) => {
            if (index < visibleCount) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // Скрываем кнопку, если новостей больше нет
        if (visibleCount >= newsCards.length) {
            loadMoreBtn.style.display = 'none';
        }
    }

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 6;
            updateVisibility();
        });
    }

    // --- 2. ФИЛЬТР ПО ГОДАМ (Архив) ---
    window.filterByYear = function(year) {
        newsCards.forEach(card => {
            const dateText = card.querySelector('.news-date').textContent;
            if (dateText.includes(year)) {
                card.style.display = 'block';
                card.classList.add('filtered');
            } else {
                card.style.display = 'none';
                card.classList.remove('filtered');
            }
        });
        loadMoreBtn.style.display = 'none'; // Скрываем пагинацию при фильтрации
    };

    // --- 3. СЛАЙДЕР ПОПУЛЯРНЫХ НОВОСТЕЙ (Улучшенный) ---
    const slider = document.querySelector('.popular-slider');
    const track = document.getElementById('popularTrack');
    const dotsContainer = document.getElementById('popularDots');
    const prevBtn = document.getElementById('popularPrev');
    const nextBtn = document.getElementById('popularNext');
    
    if (slider && track) {
        let currentSlide = 0;
        let slides = track.querySelectorAll('.popular-slide');
        let dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
        
        function updateSlider() {
            if (slides.length === 0) return;
            
            // Расчет смещения
            const slideWidth = slides[0].offsetWidth + 30; // 30 - gap
            const viewport = slider.querySelector('.popular-viewport');
            if (!viewport) return;
            const viewportWidth = viewport.offsetWidth;
            const maxScroll = track.scrollWidth - viewportWidth;
            
            let offset = currentSlide * slideWidth;
            if (offset > maxScroll) offset = maxScroll;
            if (offset < 0) offset = 0;
            
            track.style.transform = `translateX(-${offset}px)`;
            
            // Обновление точек
            if (dots.length > 0) {
                dots.forEach((dot, idx) => {
                    dot.classList.toggle('active', idx === currentSlide);
                });
            }
        }

        function nextSlide() {
            if (slides.length === 0) return;
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        }

        function prevSlide() {
            if (slides.length === 0) return;
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        }

        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        if (dotsContainer) {
            dotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('slider-dot')) {
                    currentSlide = parseInt(e.target.getAttribute('data-slide'));
                    updateSlider();
                }
            });
        }

        // Автозапуск
        let autoPlay = setInterval(nextSlide, 5000);
        
        // Пауза при наведении
        slider.addEventListener('mouseenter', () => clearInterval(autoPlay));
        slider.addEventListener('mouseleave', () => autoPlay = setInterval(nextSlide, 5000));

        // Инициализация при загрузке и ресайзе
        window.addEventListener('resize', updateSlider);
        setTimeout(updateSlider, 100); // Небольшая задержка для правильного расчета ширины
    }

    // --- 4. ПОДПИСКА ---
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = e.target.querySelector('input').value;
            alert(`Спасибо! Email ${email} добавлен в список рассылки.`);
            e.target.reset();
        });
    }

    // Запускаем начальный показ
    updateVisibility();
});