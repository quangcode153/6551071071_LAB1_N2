// Products Data & Logic
// File này chỉ xử lý phần "Featured Products" và các Tabs

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MOCK DATA SẢN PHẨM (Đã cập nhật đúng tên file ảnh)
    const productsData = [
        // --- Tab: Tires & Wheels ---
        {
            id: 101,
            type: 'tires',
            name: 'Sport Racing Wheel 01',
            category: 'WHEELS',
            price: 350.00,
            oldPrice: 420.00,
            rating: 5,
            image: 'assets/images/products/wheel-01.jpg', // Updated path
            discount: '-20%'
        },
        {
            id: 102,
            type: 'tires',
            name: 'Luxury Alloy Wheel 02',
            category: 'WHEELS',
            price: 280.00,
            oldPrice: null,
            rating: 4,
            image: 'assets/images/products/wheel-02.jpg', // Updated path
            discount: ''
        },
        {
            id: 103,
            type: 'tires',
            name: 'Matte Black Wheel 03',
            category: 'WHEELS',
            price: 310.00,
            oldPrice: 350.00,
            rating: 5,
            image: 'assets/images/products/wheel-03.jpg', // Updated path
            discount: '-10%'
        },
        {
            id: 104,
            type: 'tires',
            name: 'Michelin Performance Tire',
            category: 'TIRES',
            price: 150.00,
            oldPrice: 180.00,
            rating: 5,
            image: 'assets/images/products/tire-01.jpg', // Updated path
            discount: '-15%'
        },

        // --- Tab: Headlight ---
        // (Using placeholder or banner image since specific product images were not provided)
        {
            id: 201,
            type: 'headlight',
            name: 'LED Headlight Kit H7',
            category: 'LIGHTING',
            price: 85.00,
            oldPrice: 120.00,
            rating: 4,
            image: 'assets/images/banners/headlight-banner.jpg', // Placeholder
            discount: '-30%'
        },
        {
            id: 202,
            type: 'headlight',
            name: 'Xenon HID Conversion',
            category: 'LIGHTING',
            price: 150.00,
            oldPrice: null,
            rating: 5,
            image: 'assets/images/banners/headlight-banner.jpg', // Placeholder
            discount: ''
        },
        {
            id: 203,
            type: 'headlight',
            name: 'Fog Light Assembly',
            category: 'LIGHTING',
            price: 60.00,
            oldPrice: 75.00,
            rating: 4,
            image: 'assets/images/banners/headlight-banner.jpg', // Placeholder
            discount: '-20%'
        },
        {
            id: 204,
            type: 'headlight',
            name: 'Tail Light LED Bar',
            category: 'LIGHTING',
            price: 200.00,
            oldPrice: 250.00,
            rating: 5,
            image: 'assets/images/banners/headlight-banner.jpg', // Placeholder
            discount: '-10%'
        },

        // --- Tab: Rims (Using other auto parts images) ---
        {
            id: 301,
            type: 'rims',
            name: 'Ceramic Brake System 01',
            category: 'BRAKES',
            price: 180.00,
            oldPrice: 220.00,
            rating: 5,
            image: 'assets/images/products/brake-system-01.jpg', // Updated path
            discount: '-18%'
        },
        {
            id: 302,
            type: 'rims',
            name: 'Performance Brake 02',
            category: 'BRAKES',
            price: 250.00,
            oldPrice: 300.00,
            rating: 4,
            image: 'assets/images/products/brake-system-02.jpg', // Updated path
            discount: '-15%'
        },
        {
            id: 303,
            type: 'rims',
            name: 'Sport Suspension Kit',
            category: 'SUSPENSION',
            price: 320.00,
            oldPrice: null,
            rating: 5,
            image: 'assets/images/products/suspension-01.jpg', // Updated path
            discount: ''
        },
        {
            id: 304,
            type: 'rims',
            name: 'Leather Steering Wheel',
            category: 'INTERIOR',
            price: 120.00,
            oldPrice: 150.00,
            rating: 4,
            image: 'assets/images/products/steering-wheel.jpg', // Updated path
            discount: '-20%'
        }
    ];

    // 2. HÀM RENDER PRODUCTS
    function renderProducts(tabType) {
        const productsGrid = document.getElementById('productsGrid');
        if (!productsGrid) return;

        // Lọc sản phẩm theo tab đang chọn
        const filteredData = productsData.filter(p => p.type === tabType);

        // Clear grid cũ với hiệu ứng fade out (optional)
        productsGrid.style.opacity = '0';

        setTimeout(() => {
            productsGrid.innerHTML = filteredData.map(product => {
                // Tạo sao đánh giá
                const stars = Array(5).fill('').map((_, i) => 
                    `<i class="${i < product.rating ? 'fas' : 'far'} fa-star"></i>`
                ).join('');

                // Badge giảm giá
                const badge = product.discount 
                    ? `<span class="discount-badge">${product.discount}</span>` 
                    : '';

                // Giá cũ
                const oldPriceHtml = product.oldPrice 
                    ? `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>` 
                    : '';

                // Xử lý sự kiện Cart/Wishlist:
                // Lưu ý: Dùng onclick để gọi hàm từ window.AutomizeApp (đã định nghĩa trong main.js)
                return `
                    <div class="product-card scroll-fade-in visible">
                        <div class="product-image">
                            ${badge}
                            <button class="wishlist-btn" onclick="window.AutomizeApp.addToWishlist(${product.id})">
                                <i class="fas fa-heart"></i>
                            </button>
                            <img src="${product.image}" 
                                 alt="${product.name}" 
                                 onerror="this.src='https://via.placeholder.com/300x300?text=${product.name.replace(/ /g, '+')}'">
                        </div>
                        <div class="product-category">${product.category}</div>
                        <h3 class="product-name">${product.name}</h3>
                        <div class="product-rating">
                            ${stars}
                            <span class="text-light">(12)</span>
                        </div>
                        <div class="product-pricing">
                            <span class="current-price">$${product.price.toFixed(2)}</span>
                            ${oldPriceHtml}
                        </div>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 10px;" 
                                onclick="window.AutomizeApp.addToCart({id: ${product.id}, name: '${product.name}', price: ${product.price}})">
                            ADD TO CART
                        </button>
                    </div>
                `;
            }).join('');
            
            // Fade in lại
            productsGrid.style.opacity = '1';
            
        }, 200);
    }

    // 3. XỬ LÝ CHUYỂN TAB
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Xóa active cũ
            document.querySelector('.tab-btn.active')?.classList.remove('active');
            
            // Active nút mới
            btn.classList.add('active');
            
            // Lấy data-tab và render
            const tabType = btn.getAttribute('data-tab'); // tires, headlight, rims
            renderProducts(tabType);
        });
    });

    // 4. KHỞI TẠO MẶC ĐỊNH
    renderProducts('tires');
});