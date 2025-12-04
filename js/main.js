// Main JavaScript File for Automize Website

// --- DOM Elements ---
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mainNav = document.getElementById('mainNav');
const categoryBtn = document.getElementById('categoryBtn');
const categoryMenu = document.getElementById('categoryMenu');
const backToTop = document.getElementById('backToTop');
const brandsGrid = document.getElementById('brandsGrid');
const categoriesGrid = document.getElementById('categoriesGrid');

// --- 1. Mobile Menu Toggle ---
if (mobileMenuToggle && mainNav) {
    mobileMenuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        const icon = mobileMenuToggle.querySelector('i');
        if (mainNav.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// --- 2. Category Menu Toggle ---
if (categoryBtn && categoryMenu) {
    categoryBtn.addEventListener('click', () => {
        categoryMenu.classList.toggle('active');
    });

    // Đóng menu khi click ra ngoài
    document.addEventListener('click', (e) => {
        if (!categoryBtn.contains(e.target) && !categoryMenu.contains(e.target)) {
            categoryMenu.classList.remove('active');
        }
    });
}

// --- 3. Back to Top Button ---
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// --- 4. LOAD BRANDS (SỬA LỖI: Dùng vòng lặp lấy ảnh brand-1 -> brand-12) ---
function loadBrands() {
    if (!brandsGrid) return;
    
    let htmlContent = '';
    // Vòng lặp từ 1 đến 12 khớp với tên file của bạn
    for (let i = 1; i <= 12; i++) {
        htmlContent += `
            <div class="brand-item" style="animation-delay: ${i * 0.05}s">
                <img src="assets/images/brands/brand-${i}.png" 
                     alt="Brand ${i}" 
                     onerror="this.style.display='none'">
            </div>
        `;
    }
    
    brandsGrid.innerHTML = htmlContent;
}

// --- 5. LOAD CATEGORIES (SỬA LỖI: Dùng ảnh banner làm icon) ---
const featuredCategories = [
    {
        name: 'Tires & Wheels',
        // Dùng banner-1.jpg làm icon đại diện
        icon: 'assets/images/categories/banner-1.jpg', 
        brands: ['Michelin', 'Goodyear', 'Continental']
    },
    {
        name: 'Brakes System',
        icon: 'assets/images/categories/banner-2.jpg',
        brands: ['Brembo', 'Akebono', 'Bosch']
    },
    {
        name: 'Suspension',
        icon: 'assets/images/categories/banner-3.jpg',
        brands: ['Bilstein', 'KYB', 'Ohlins']
    },
    {
        name: 'Audio System',
        icon: 'assets/images/categories/banner-4.jpg',
        brands: ['Sony', 'JBL', 'Pioneer']
    },
    {
        name: 'Headlight',
        icon: 'assets/images/categories/banner-5.jpg',
        brands: ['Philips', 'Osram', 'Hella']
    }
];

function loadFeaturedCategories() {
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = featuredCategories.map((category, index) => `
        <div class="category-card" style="animation-delay: ${index * 0.1}s">
            <div class="category-icon">
                <img src="${category.icon}" alt="${category.name}" 
                     style="width: 50px; height: 50px; object-fit: cover; border-radius: 50%;">
            </div>
            <h3>${category.name}</h3>
            <ul class="category-brands">
                ${category.brands.map((brand, i) => `
                    <li class="${i === 0 ? 'highlight' : ''}">${brand}</li>
                `).join('')}
            </ul>
        </div>
    `).join('');
}

// --- 6. Countdown Timer ---
function startCountdown() {
    const countdownElement = document.getElementById('countdown');
    if (!countdownElement) return;

    // Đếm ngược 391 ngày
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 391);
    targetDate.setHours(10, 12, 47);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById('days')) document.getElementById('days').textContent = days;
        if (document.getElementById('hours')) document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        if (document.getElementById('minutes')) document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        if (document.getElementById('seconds')) document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

        const countdownItems = document.querySelectorAll('.countdown-item');
        countdownItems.forEach(item => {
            item.classList.add('updating');
            setTimeout(() => item.classList.remove('updating'), 300);
        });

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<p>SALE ENDED!</p>';
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
}

// --- 7. Scroll Animation & Header ---
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, observerOptions);

function initScrollAnimations() {
    const scrollElements = document.querySelectorAll('.scroll-fade-in');
    scrollElements.forEach(el => scrollObserver.observe(el));
}

let lastScroll = 0;
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// --- 8. Cart & Wishlist Logic ---
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
function updateWishlistCount() {
    const wishlistBtn = document.getElementById('wishlistBtn');
    if (wishlistBtn) {
        const badge = wishlistBtn.querySelector('.badge');
        if (badge) badge.textContent = wishlist.length;
    }
}
function addToWishlist(productId) {
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        showNotification('Added to wishlist!');
    } else {
        wishlist = wishlist.filter(id => id !== productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistCount();
        showNotification('Removed from wishlist!');
    }
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCartCount() {
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        const badge = cartBtn.querySelector('.badge');
        if (badge) badge.textContent = cart.length;
    }
}
function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Added to cart!');
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.classList.add('cart-add-animation');
        setTimeout(() => cartBtn.classList.remove('cart-add-animation'), 500);
    }
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `<i class="fas fa-check-circle"></i><span>${message}</span>`;
    notification.style.cssText = `position: fixed; top: 100px; right: 20px; background: ${type === 'success' ? '#22c55e' : '#ef4444'}; color: white; padding: 16px 24px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.2); z-index: 9999; display: flex; align-items: center; gap: 12px; font-weight: 600;`;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.animation = 'slideInNotification 0.4s ease-out reverse';
        setTimeout(() => notification.remove(), 400);
    }, 3000);
}

// --- 9. Search & Newsletter ---
const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');
if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') performSearch(); });
}
function performSearch() {
    const query = searchInput.value.trim();
    if (query) showNotification(`Searching for "${query}"...`, 'info');
}

const subscribeForm = document.querySelector('.subscribe-form');
if (subscribeForm) {
    const subscribeBtn = subscribeForm.querySelector('button');
    const emailInput = subscribeForm.querySelector('input[type="email"]');
    if (subscribeBtn && emailInput) {
        subscribeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value.trim())) {
                showNotification('Successfully subscribed!');
                emailInput.value = '';
            } else {
                showNotification('Please enter a valid email address', 'error');
            }
        });
    }
}

// --- 10. Lazy Load ---
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    images.forEach(img => imageObserver.observe(img));
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    loadBrands();
    loadFeaturedCategories();
    startCountdown();
    initScrollAnimations();
    updateWishlistCount();
    updateCartCount();
    lazyLoadImages();
    console.log('Automize website loaded successfully!');
});

// Export functions for global usage (e.g., inline onclick in HTML)
window.AutomizeApp = { addToWishlist, addToCart, showNotification, updateWishlistCount, updateCartCount };