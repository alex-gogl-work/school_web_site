/**
 * teachers_render.js - Логика для страницы «Педагогический состав»
 */
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('teachers-grid-container');
    if (!container) return;

    renderTeachers('all');

    // Навешиваем обработчики на фильтры (если они есть)
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderTeachers(filter);
        });
    });
});

function renderTeachers(filter) {
    const container = document.getElementById('teachers-grid-container');
    let lang = document.documentElement.lang || 'ru';
    if (window.location.pathname.includes('/ru/')) lang = 'ru';
    if (window.location.pathname.includes('/kk/')) lang = 'kk';
    
    // Очистка контейнера
    container.innerHTML = '';

    const filteredTeachers = teachersData.filter(t => {
        if (filter === 'all') return true;
        return t.subjects && t.subjects.includes(filter);
    });

    if (filteredTeachers.length === 0) {
        container.innerHTML = '<p class="no-results">Учителя данной категории не найдены.</p>';
        return;
    }

    filteredTeachers.forEach(teacher => {
        const card = document.createElement('div');
        card.className = 'teacher-card animated';
        card.setAttribute('data-category', teacher.subjects[0] || 'other');
        
        card.innerHTML = `
            <div class="teacher-photo">
                <img src="${teacher.photo}" alt="${lang === 'ru' ? teacher.name_ru : teacher.name_kk}">
                <div class="teacher-category">${lang === 'ru' ? (teacher.position_ru || '') : (teacher.position_kk || '')}</div>
            </div>
            <div class="teacher-info">
                <h3 class="teacher-name">${lang === 'ru' ? teacher.name_ru : teacher.name_kk}</h3>
                <div class="teacher-position">${lang === 'ru' ? (teacher.category_ru || '') : (teacher.category_kk || '')}</div>
                <div class="teacher-details">
                    <div class="teacher-detail"><i class="fas fa-award"></i> ${teacher.experience} ${lang === 'ru' ? 'лет стажа' : 'жыл өтілі'}</div>
                </div>
                <div class="teacher-tags">
                    ${(teacher.tags || []).map(tag => `<span class="teacher-tag">${tag}</span>`).join('')}
                </div>
                <div class="teacher-footer">
                    <div class="teacher-rating"><i class="fas fa-star" style="color: var(--bright-orange);"></i> 5.0</div>
                    <button class="teacher-btn" data-teacher-id="${teacher.id}"> ${lang === 'ru' ? 'ПОДРОБНЕЕ' : 'ТОЛЫҒЫРАҚ'} </button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    // После рендеринга нужно инициализировать модальные окна для новых кнопок
    // Если initTeacherModal доступна глобально в main.js
    if (typeof initTeacherModal === 'function') {
        initTeacherModal();
    }
}
