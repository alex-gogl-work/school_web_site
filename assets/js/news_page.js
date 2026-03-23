// --- ЛАЙТБОКС (Просмотр фото) ---
function openLightbox(src) {
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox-overlay').style.display = 'flex';
}

function closeLightbox() {
    document.getElementById('lightbox-overlay').style.display = 'none';
}

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeLightbox();
});

// --- СЧЕТЧИК ПРОСМОТРОВ ---
window.addEventListener('DOMContentLoaded', () => {
    // Получаем "хвост" ссылки (например: 2026-03-10-pobeda)
    const slug = window.location.pathname.replace(/\/$/, "").split("/").pop();
    
    if (slug) { 
        // Определяем локальный или боевой URL
        const apiUrl = window.location.hostname.includes("127.0.0.1") || window.location.hostname === "localhost"
            ? `http://127.0.0.1:5000/hit/${slug}` // Локально
            : `https://${window.location.hostname}/api/hit/${slug}`; // На сервере (замените на нужный путь, если нужно)

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const countElement = document.getElementById('views-count');
                if (countElement && data.views) {
                    countElement.textContent = data.views;
                }
                console.log("Просмотр новости зафиксирован:", slug, "| Текущие просмотры:", data.views);
            })
            .catch(error => console.error("Ошибка при учете просмотра:", error));
    }
});