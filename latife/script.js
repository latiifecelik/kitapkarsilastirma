// Tüm JavaScript kodunu buraya ekleyin
function createPriceChart(canvasId, data) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }
        }
    });
}

function searchBooks() {
    const resultsDiv = document.getElementById('results');
    
    const siteColors = {
        'kitapsec.com': '#2ecc71',
        'bkmkitap.com': '#e74c3c',
        'kitapyurdu.com': '#3498db',
        'dr.com.tr': '#f1c40f'
    };

    const sitePrices = [
        { site: 'kitapsec.com', price: 100, url: '#' },
        { site: 'bkmkitap.com', price: 95, url: '#' },
        { site: 'kitapyurdu.com', price: 98, url: '#' },
        { site: 'dr.com.tr', price: 105, url: '#' }
    ].sort((a, b) => a.price - b.price);

    resultsDiv.innerHTML = `
        <div class="book-result">
            <div class="book-image">
                <img src="Acil Yayınları Problemler.png" alt="Kitap">
                <button class="favorite-btn" onclick="toggleFavorite(1)">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
            <div class="book-info">
                <h2 class="book-title">Acil Yayınları Problemler</h2>
                <div class="book-details">
                    <span class="author">Yazar Adı</span>
                    <span class="publisher">Acil Yayınları</span>
                </div>
                
                <div class="price-chart">
                    <canvas id="priceChart1"></canvas>
                </div>

                <div class="price-links">
                    ${sitePrices.map((site, index) => `
                        <div class="price-link ${index === 0 ? 'best-price' : ''}">
                            <span class="price">₺${site.price}</span>
                            <a href="${site.url}" class="price-link-text" target="_blank">
                                ${site.site}
                                ${index === 0 ? '<span class="best-price-badge">En Uygun Fiyat!</span>' : ''}
                            </a>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;

    setTimeout(() => {
        const ctx = document.getElementById('priceChart1').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['', '', '', '', ''],
                datasets: sitePrices.map(site => ({
                    label: site.site,
                    data: [site.price + 5, site.price + 2, site.price + 3, site.price + 1, site.price],
                    borderColor: siteColors[site.site],
                    tension: 0.3
                }))
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    x: {
                        display: false
                    },
                    y: {
                        ticks: {
                            callback: value => '₺' + value
                        }
                    }
                }
            }
        });
    }, 100);
}

function toggleFavorite(bookId) {
    const btn = event.currentTarget;
    btn.classList.toggle('active');
}

function setPriceAlert(bookId) {
    const modal = document.getElementById('priceAlertModal');
    modal.style.display = 'block';
    modal.dataset.bookId = bookId;
}

function savePriceAlert() {
    const modal = document.getElementById('priceAlertModal');
    modal.style.display = 'none';
    alert('Fiyat alarmı kuruldu!');
}

document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        this.closest('.modal').style.display = 'none';
    }
});

window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    searchBooks();
    
    showSimilarBooks();
});

function showSimilarBooks() {
    const similarBooks = [
        { title: 'TYT Matematik', price: '120', image: 'Acil Yayınları Problemler.png' },
        { title: 'AYT Fizik', price: '130', image: 'Acil Yayınları Problemler.png' },
        { title: 'TYT Kimya', price: '110', image: 'Acil Yayınları Problemler.png' },
        { title: 'AYT Biyoloji', price: '125', image: 'Acil Yayınları Problemler.png' }
    ];

    document.getElementById('similarBooks').innerHTML = similarBooks.map(book => `
        <div class="similar-book-card">
            <img src="${book.image}" alt="${book.title}">
            <div class="similar-book-info">
                <div class="similar-book-title">${book.title}</div>
                <div class="similar-book-price">₺${book.price}</div>
            </div>
        </div>
    `).join('');
}

// Slider fonksiyonları
function slidePrev() {
    const container = document.getElementById('similarBooks');
    container.scrollBy({ left: -200, behavior: 'smooth' });
}

function slideNext() {
    const container = document.getElementById('similarBooks');
    container.scrollBy({ left: 200, behavior: 'smooth' });
}

// Rastgele renk oluşturmak için yardımcı fonksiyon
function getRandomColor() {
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6'];
    return colors[Math.floor(Math.random() * colors.length)];
}