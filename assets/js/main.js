'use strict';

// =========================================
// ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И ДАННЫЕ
// =========================================

// teacherData теперь загружается из внешнего файла assets/js/teachers_data.js

// =========================================
// ОСНОВНАЯ ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
// =========================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initDropdowns();
    initScrollAnimations();
    initLanguageSwitcher();
    initCalendar();
    initTabs();
    initQuoteSlider();
    initFaq();
    initTeacherModal();
    initFilters();
    initPopularSlider();
    initNewsSearch();
    initPagination();
    initStatsAnimation();
    initTimeline();
    initLoginForm();
    initScheduleActions();
    initPrintDownload();

    // Показать демо-сообщение для новых посетителей
    if (!localStorage.getItem('visited')) {
        setTimeout(() => {
            showWelcomeMessage();
            localStorage.setItem('visited', 'true');
        }, 2000);
    }
});

// =========================================
// МАРШРУТИЗАТОР ЯЗЫКОВ
// =========================================
function initLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');
    if (langButtons.length === 0) return;

    // Определяем язык по ссылке (если есть /ru/, значит русский)
    const isRu = window.location.pathname.startsWith('/ru');
    const currentLang = isRu ? 'ru' : 'kk';

    langButtons.forEach(btn => {
        // Подсвечиваем активную
        if(btn.dataset.lang === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }

        // Переключение по клику
        btn.addEventListener('click', () => {
            if(btn.dataset.lang === currentLang) return; // Если уже тут, ничего не делаем

            let currentPath = window.location.pathname;
            if(btn.dataset.lang === 'ru') {
                // Переход на русский: добавляем /ru в начало
                window.location.href = '/ru' + currentPath;
            } else {
                // Переход на казахский: убираем /ru из начала
                window.location.href = currentPath.replace('/ru', '') || '/';
            }
        });
    });
}

// =========================================
// МОБИЛЬНОЕ МЕНЮ
// =========================================
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeBtn = document.querySelector('.mobile-menu-close');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileContent = document.querySelector('.mobile-menu-content');
    
    if (!menuBtn || !mobileMenu) return;
    
    // Копируем основное меню в мобильное
    const mainNav = document.querySelector('nav ul');
    if (mainNav && mobileContent) {
        mobileContent.innerHTML = mainNav.outerHTML;
        
        // Добавляем дополнительные пункты
        const loginBtn = document.querySelector('.login-btn');
        if (loginBtn) {
            const loginClone = loginBtn.cloneNode(true);
            loginClone.classList.add('mobile-login-btn');
            mobileContent.appendChild(loginClone);
        }
        
        // После копирования вешаем обработчики на все ссылки в мобильном меню
        const mobileLinks = mobileContent.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('show');
                document.body.style.overflow = '';
            });
        });
    }
    
    menuBtn.addEventListener('click', function() {
        mobileMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';
        });
    }
    
    // Закрытие при клике вне меню
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-menu') && 
            !e.target.closest('.mobile-menu-btn') &&
            mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            document.body.style.overflow = '';
        }
    });
}

// =========================================
// ВЫПАДАЮЩИЕ МЕНЮ
// =========================================
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-toggle, a, button');
        if (!trigger) return;
        
        trigger.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('open');
            }
        });
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('open');
            });
        }
    });
}

// =========================================
// АНИМАЦИИ ПРИ СКРОЛЛЕ
// =========================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll(
        '.access-card, .news-card, .feature-card, .widget, .teacher-card, .club-card, .info-card, .mission-card, .infra-item, .director-card, .achievement-card, .benefit-card, .step-card, .legacy-item, .document-card, .specialist-card, .resource-item, .council-member, .hours-card, .dept-card, .emergency-card'
    );
    
    elementsToAnimate.forEach(element => {
        element.classList.add('animate-on-scroll');
        observer.observe(element);
    });
}

// =========================================
// КАЛЕНДАРЬ СОБЫТИЙ
// =========================================
function initCalendar() {
    const calendarGrid = document.querySelector('.calendar-grid');
    if (!calendarGrid) return;
    
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    createCalendar(currentMonth, currentYear);
    
    const prevBtn = document.querySelector('.calendar-nav.prev');
    const nextBtn = document.querySelector('.calendar-nav.next');
    
    if (prevBtn && nextBtn) {
        let currentDisplayMonth = currentMonth;
        let currentDisplayYear = currentYear;
        
        prevBtn.addEventListener('click', function() {
            currentDisplayMonth--;
            if (currentDisplayMonth < 0) {
                currentDisplayMonth = 11;
                currentDisplayYear--;
            }
            createCalendar(currentDisplayMonth, currentDisplayYear);
        });
        
        nextBtn.addEventListener('click', function() {
            currentDisplayMonth++;
            if (currentDisplayMonth > 11) {
                currentDisplayMonth = 0;
                currentDisplayYear++;
            }
            createCalendar(currentDisplayMonth, currentDisplayYear);
        });
    }
}

function createCalendar(month, year) {
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthNames = [
        'Қаңтар', 'Ақпан', 'Наурыз', 'Сәуір', 'Мамыр', 'Маусым',
        'Шілде', 'Тамыз', 'Қыркүйек', 'Қазан', 'Қараша', 'Желтоқсан'
    ];
    const monthNamesRu = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    
    const header = document.querySelector('.calendar-header h3');
    if (header) {
        const lang = document.documentElement.lang;
        header.textContent = lang === 'kk' 
            ? `${monthNames[month]} ${year}`
            : `${monthNamesRu[month]} ${year}`;
    }
    
    const days = calendarGrid.querySelectorAll('.calendar-date');
    days.forEach(day => day.remove());
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    
    let firstDayIndex = firstDay.getDay();
    if (firstDayIndex === 0) firstDayIndex = 7;
    
    for (let i = 1; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-date empty';
        calendarGrid.appendChild(emptyDay);
    }
    
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = day;
        
        if (day === today.getDate() && 
            month === today.getMonth() && 
            year === today.getFullYear()) {
            dateElement.classList.add('today');
        }
        
        if ([5, 12, 18, 22, 25].includes(day)) {
            dateElement.classList.add('event');
            dateElement.addEventListener('click', function() {
                showEventsForDate(day, month, year);
            });
        }
        
        calendarGrid.appendChild(dateElement);
    }
}

function showEventsForDate(day, month, year) {
    const events = [
        { time: '10:00', title: 'Математика бойынша тест', class: '7А' },
        { time: '14:00', title: 'Ата-аналар жиналысы', class: '8-11 сыныптар' }
    ];
    
    const modal = document.createElement('div');
    modal.className = 'events-modal';
    modal.innerHTML = `
        <div class="events-modal-content">
            <div class="events-modal-header">
                <h3>Оқиғалар ${day}.${month + 1}.${year}</h3>
                <button class="events-modal-close">&times;</button>
            </div>
            <div class="events-list">
                ${events.map(event => `
                    <div class="event-modal-item">
                        <div class="event-time">${event.time}</div>
                        <div class="event-details">
                            <h4>${event.title}</h4>
                            <p>${event.class}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.events-modal-close');
    closeBtn.addEventListener('click', function() {
        modal.remove();
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// =========================================
// ВЕРСИЯ ДЛЯ СЛАБОВИДЯЩИХ (BVI) — полностью в theme/assets/js/accessibility.js
// =========================================
function initAccessibility() {
    // Пустая заглушка: логика в accessibility.js, чтобы не дублировать обработчики
}

// =========================================
// ПРИВЕТСТВЕННОЕ СООБЩЕНИЕ
// =========================================
function showWelcomeMessage() {
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'welcome-message';
    
    const schoolIcon = `
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 3L1 9L12 15L21 10.09V17H23V9L12 3ZM18 9V11L12 14.5L6 11V9L12 12.5L18 9Z" fill="currentColor"/>
        </svg>
    `;
    
    welcomeMsg.innerHTML = `
        <div class="welcome-content">
            <div class="welcome-icon">${schoolIcon}</div>
            <div class="welcome-text">
                <h3>№9 Мектепке қош келдіңіз!</h3>
                <p>Жаңа веб-сайтымызға қош келдіңіз. Барлық жаңалықтар мен оқиғалардан хабардар болыңыз.</p>
            </div>
            <button class="welcome-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(welcomeMsg);
    
    const closeBtn = welcomeMsg.querySelector('.welcome-close');
    closeBtn.addEventListener('click', () => {
        welcomeMsg.remove();
    });
    
    setTimeout(() => {
        if (welcomeMsg.parentNode) welcomeMsg.remove();
    }, 7000);
}

// =========================================
// ТАБЫ (страница А. Байтурсынов)
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    if (!tabBtns.length) return; 

    function switchTab(tabId) {
        if (!tabId) return;
        const targetBtn = document.querySelector(`.tab-btn[data-tab="${tabId}"]`);
        const targetContent = document.getElementById(tabId);
        
        if (targetBtn && targetContent) {
            // Изолируем логику переключения для конкретной группы кнопок (контейнера)
            const btnContainer = targetBtn.parentElement;
            const groupBtns = btnContainer.querySelectorAll('.tab-btn');
            const groupTabIds = Array.from(groupBtns).map(b => b.dataset.tab);
            
            // Убираем active только у кнопок этой группы
            groupBtns.forEach(b => b.classList.remove('active'));
            
            // Убираем active только у контента, связанного с этой группой
            groupTabIds.forEach(id => {
                const el = document.getElementById(id);
                if (el) el.classList.remove('active');
            });
            
            // Активируем нужные элементы
            targetBtn.classList.add('active');
            targetContent.classList.add('active');
            
            // Прокрутка к табам, если переключение произошло по хешу
            if (window.location.hash === '#' + tabId) {
                targetBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.dataset.tab;
            switchTab(tabId);
            // Обновляем хеш без прыжка страницы
            history.pushState(null, null, '#' + tabId);
        });
    });

    // Обработка хеша при загрузке
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        setTimeout(() => switchTab(hash), 100);
    }

    // Обработка изменения хеша
    window.addEventListener('hashchange', function() {
        const newHash = window.location.hash.replace('#', '');
        switchTab(newHash);
    });
}

// =========================================
// СЛАЙДЕР ЦИТАТ (А. Байтурсынов) — НОВАЯ ВЕРСИЯ
// =========================================
function initQuoteSlider() {
const quotes = [
        {
            text: "«Мектептің жаны – мұғалім»<br><span class='quote-ru'>«Учитель — душа школы»</span>",
            author: "Ахмет Байтұрсынұлы"
        },
        {
            text: "«Газет – халықтың көзі, құлағы һәм тілі»<br><span class='quote-ru'>«Газета — это глаза, уши и язык нации»</span>",
            author: "Ахмет Байтұрсынұлы"
        },
        {
            text: "«Білімді болуға оқу шарт. Бай болуға кәсіп шарт. Күшті болуға бірлік шарт»<br><span class='quote-ru'>«Чтобы быть образованным, нужно учиться. Чтобы быть богатым, нужно дело. Чтобы быть сильным, нужно единство»</span>",
            author: "Ахмет Байтұрсынұлы"
        },
        {
            text: "«Тілі жоғалған жұрттың өзі де жоғалады»<br><span class='quote-ru'>«Народ, потерявший свой язык, обречен на исчезновение»</span>",
            author: "Ахмет Байтұрсынұлы"
        },
        {
            text: "«Ең ұлы, ең күшті өнер – сөз өнері»<br><span class='quote-ru'>«Самое великое, самое мощное из всех искусств — искусство слова»</span>",
            author: "Ахмет Байтұрсынұлы"
        }
    ];

    const quoteTextElement = document.querySelector('.quote-text');
    const quoteAuthorElement = document.querySelector('.quote-author');
    
    // Если на странице нет блока с цитатами, просто выходим из функции
    if (!quoteTextElement || !quoteAuthorElement) return;
    
    let currentIndex = -1;

    function changeQuote() {
        // Запускаем анимацию исчезновения
        quoteTextElement.style.opacity = 0;
        quoteAuthorElement.style.opacity = 0;
        
        setTimeout(() => {
            let randomIndex;
            // Ищем новый индекс, чтобы он не совпадал с предыдущим
            do {
                randomIndex = Math.floor(Math.random() * quotes.length);
            } while (randomIndex === currentIndex);
            
            currentIndex = randomIndex;
            
            // Подставляем новый текст
            quoteTextElement.innerHTML = quotes[randomIndex].text;
            quoteAuthorElement.textContent = quotes[randomIndex].author;
            
            // Возвращаем видимость (плавное появление)
            quoteTextElement.style.opacity = 1;
            quoteAuthorElement.style.opacity = 1;
        }, 500); // Время на исчезновение старой цитаты
    }

    // Запускаем первый раз
    changeQuote();

    // Запускаем таймер смены цитат каждые 8 секунд
    setInterval(changeQuote, 8000);
}

// =========================================
// FAQ АККОРДЕОН (для родителей)
// =========================================
function initFaq() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

// =========================================
// МОДАЛЬНОЕ ОКНО УЧИТЕЛЯ (teachers)
// =========================================
function initTeacherModal() {
    const modal = document.getElementById('teacherModal');
    const closeBtn = document.getElementById('modalClose');
    const teacherBtns = document.querySelectorAll('.teacher-btn');
    if (!modal || !teacherBtns.length) return;

    teacherBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const id = this.dataset.teacherId;
            let lang = document.documentElement.lang || 'ru';
            if (window.location.pathname.includes('/ru/')) lang = 'ru';
            if (window.location.pathname.includes('/kk/')) lang = 'kk';
            
            const teacher = teachersData.find(t => t.id === id);
            
            if (teacher) {
                document.getElementById('modalName').textContent = lang === 'ru' ? teacher.name_ru : teacher.name_kk;
                document.getElementById('modalPosition').textContent = lang === 'ru' ? teacher.position_ru : teacher.position_kk;
                document.getElementById('modalDepartment').textContent = lang === 'ru' ? (teacher.mo_id ? 'МО №' + teacher.mo_id : '') : (teacher.mo_id ? 'ӘБ №' + teacher.mo_id : '');
                document.getElementById('modalPhoto').innerHTML = `<img src="${teacher.photo}" alt="${teacher.name_ru}">`;
                document.getElementById('modalDescription').textContent = lang === 'ru' ? (teacher.description_ru || '') : (teacher.description_kk || '');
                
                const eduList = document.getElementById('modalEducation');
                eduList.innerHTML = '';
                const education = lang === 'ru' ? (teacher.education_ru || []) : (teacher.education_kk || []);
                education.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fas fa-graduation-cap" style="color: var(--electric-cyan); margin-right: 10px;"></i> ${item}`;
                    eduList.appendChild(li);
                });
                
                const achList = document.getElementById('modalAchievements');
                achList.innerHTML = '';
                const achievements = lang === 'ru' ? (teacher.achievements_ru || []) : (teacher.achievements_kk || []);
                achievements.forEach(item => {
                    const li = document.createElement('li');
                    li.innerHTML = `<i class="fas fa-award" style="color: var(--bright-orange); margin-right: 10px;"></i> ${item}`;
                    achList.appendChild(li);
                });
                
                document.getElementById('modalSchedule').innerHTML = `<p>${teacher.schedule || (lang === 'ru' ? 'Уточняется' : 'Анықталуда')}</p>`;
                
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Переключение табов внутри модалки
    const modalTabs = document.querySelectorAll('.modal-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    modalTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            modalTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            document.getElementById('tab' + tabId.charAt(0).toUpperCase() + tabId.slice(1)).classList.add('active');
        });
    });
}

// =========================================
// ФИЛЬТРЫ (учителя, кружки, новости)
// =========================================
function initFilters() {
    // Учителя
    const teacherFilterBtns = document.querySelectorAll('.filter-btn');
    const teacherCards = document.querySelectorAll('.teacher-card');
    if (teacherFilterBtns.length && teacherCards.length) {
        teacherFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                teacherFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                teacherCards.forEach(card => {
                    card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
                });
            });
        });
    }

    // Кружки
    const clubFilterBtns = document.querySelectorAll('.clubs-filters .filter-btn');
    const clubCards = document.querySelectorAll('.club-card');
    if (clubFilterBtns.length && clubCards.length) {
        clubFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filter = this.dataset.filter;
                clubFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                clubCards.forEach(card => {
                    card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
                });
            });
        });
    }

    // Новости
    const newsFilterBtns = document.querySelectorAll('.news-filter-btn');
    const newsArticles = document.querySelectorAll('.news-card');
    if (newsFilterBtns.length && newsArticles.length) {
        newsFilterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const category = this.dataset.category;
                newsFilterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                newsArticles.forEach(article => {
                    article.style.display = (category === 'all' || article.dataset.category === category) ? 'block' : 'none';
                });
            });
        });
    }
}

// =========================================
// СЛАЙДЕР ПОПУЛЯРНЫХ НОВОСТЕЙ
// =========================================
function initPopularSlider() {
    const track = document.getElementById('popularTrack');
    const dots = document.querySelectorAll('.slider-dot');
    if (!track || !dots.length) return;
    
    let current = 0;
    const slideWidth = 330; // ширина карточки + gap
    
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            current = i;
            track.style.transform = `translateX(-${current * slideWidth}px)`;
            dots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
    });
    
    setInterval(() => {
        current = (current + 1) % dots.length;
        track.style.transform = `translateX(-${current * slideWidth}px)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }, 5000);
}

// =========================================
// ПОИСК НОВОСТЕЙ (демо)
// =========================================
function initNewsSearch() {
    const searchInput = document.querySelector('.news-search input');
    const searchBtn = document.querySelector('.news-search button');
    if (!searchInput || !searchBtn) return;
    
    searchBtn.addEventListener('click', () => {
        alert('Поиск: ' + searchInput.value);
    });
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBtn.click();
    });
}

// =========================================
// ПАГИНАЦИЯ (демо)
// =========================================
function initPagination() {
    const pageBtns = document.querySelectorAll('.page-btn:not(.prev):not(.next)');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            pageBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// =========================================
// АНИМАЦИЯ СТАТИСТИКИ (about)
// =========================================
function initStatsAnimation() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.textContent);
                const suffix = stat.textContent.replace(/[0-9]/g, '');
                let current = 0;
                const increment = Math.ceil(target / 50);
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = current + suffix;
                }, 30);
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
}

// =========================================
// АНИМАЦИЯ ТАЙМЛАЙНА (history)
// =========================================
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (!timelineItems.length) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
        item.style.transition = 'opacity 0.5s, transform 0.5s';
        item.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(item);
    });
}

// =========================================
// ФОРМЫ ВХОДА (login)
// =========================================
function initLoginForm() {
    // Переключение видимости пароля
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const passwordInput = document.getElementById(targetId);
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    // Валидация форм
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            this.querySelectorAll('.error-message').forEach(error => {
                error.classList.remove('show');
                error.textContent = '';
            });
            this.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('error');
            });
            
            if (this.id === 'teacherLoginForm') {
                const email = document.getElementById('teacherEmail');
                const emailError = document.getElementById('teacherEmailError');
                if (!email.value || !isValidEmail(email.value)) {
                    email.classList.add('error');
                    emailError.textContent = 'Введите корректный email адрес';
                    emailError.classList.add('show');
                    isValid = false;
                }
            }
            
            this.querySelectorAll('input[type="password"]').forEach(input => {
                const errorId = input.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (input.value.length < 6) {
                    input.classList.add('error');
                    if (errorElement) {
                        errorElement.textContent = 'Пароль должен содержать минимум 6 символов';
                        errorElement.classList.add('show');
                    }
                    isValid = false;
                }
            });
            
            if (isValid) {
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ВХОД...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    if (this.id === 'teacherLoginForm') {
                        window.location.href = 'teacher/dashboard.html';
                    } else if (this.id === 'adminLoginForm') {
                        window.location.href = 'admin/dashboard.html';
                    } else if (this.id === 'studentLoginForm') {
                        window.location.href = 'student/dashboard.html';
                    }
                }, 1500);
            }
        });
    });
    
    function isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// =========================================
// ДЕЙСТВИЯ НА СТРАНИЦЕ РАСПИСАНИЯ (schedule)
// =========================================
function initScheduleActions() {
    // Переключение классов (демо)
    const classBtns = document.querySelectorAll('.class-btn');
    classBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            classBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            alert('Расписание для класса ' + this.textContent + ' будет загружено');
        });
    });
    
    // Кнопка печати
    const printBtn = document.getElementById('printSchedule');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Кнопка скачивания PDF (демо)
    const downloadBtn = document.getElementById('downloadSchedule');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            alert('Функция скачивания PDF будет доступна в ближайшее время');
        });
    }
}

// =========================================
// КНОПКИ ПЕЧАТИ/СКАЧИВАНИЯ (общее)
// =========================================
function initPrintDownload() {
    // Можно добавить общие обработчики для кнопок с классами .print-btn, .download-btn
    document.querySelectorAll('.print-btn').forEach(btn => {
        btn.addEventListener('click', () => window.print());
    });
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', () => alert('Скачивание будет доступно позже'));
    });
}