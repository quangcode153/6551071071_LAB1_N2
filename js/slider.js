// Hero Slider JavaScript

class HeroSlider {
    constructor() {
        this.currentSlide = 0;
        this.slides = document.querySelectorAll('.slide');
        this.totalSlides = this.slides.length;
        this.autoplayInterval = null;
        this.autoplayDelay = 5000; // 5 seconds
        this.isTransitioning = false;
        
        this.init();
    }
    
    init() {
        if (this.totalSlides === 0) return;
        
        // Create dots
        this.createDots();
        
        // Set up event listeners
        this.setupEventListeners();
        
        // Show first slide
        this.showSlide(0);
        
        // Start autoplay
        this.startAutoplay();
        
        // Pause on hover
        const sliderContainer = document.querySelector('.hero-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.stopAutoplay());
            sliderContainer.addEventListener('mouseleave', () => this.startAutoplay());
        }
    }
    
    createDots() {
        const dotsContainer = document.getElementById('sliderDots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('span');
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
        
        this.dots = dotsContainer.querySelectorAll('span');
    }
    
    setupEventListeners() {
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => this.previousSlide());
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextSlide());
        }
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
            }
        });
        
        // Touch/swipe support
        this.setupTouchEvents();
    }
    
    setupTouchEvents() {
        const slider = document.querySelector('.hero-slider');
        if (!slider) return;
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });
    }
    
    handleSwipe(startX, endX) {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next slide
                this.nextSlide();
            } else {
                // Swipe right - previous slide
                this.previousSlide();
            }
        }
    }
    
    showSlide(index) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        
        // Remove active class from all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Add active class to current slide
        if (this.slides[index]) {
            this.slides[index].classList.add('active');
        }
        
        // Update dots
        if (this.dots) {
            this.dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        this.currentSlide = index;
        
        // Reset transition flag
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }
    
    nextSlide() {
        let next = this.currentSlide + 1;
        if (next >= this.totalSlides) {
            next = 0;
        }
        this.goToSlide(next);
    }
    
    previousSlide() {
        let prev = this.currentSlide - 1;
        if (prev < 0) {
            prev = this.totalSlides - 1;
        }
        this.goToSlide(prev);
    }
    
    goToSlide(index) {
        if (index === this.currentSlide || this.isTransitioning) return;
        
        this.stopAutoplay();
        this.showSlide(index);
        this.startAutoplay();
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoplayDelay);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }
    
    destroy() {
        this.stopAutoplay();
        // Remove event listeners if needed
    }
}

// Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.currentSlide = 0;
        
        // --- CẬP NHẬT ĐƯỜNG DẪN ẢNH ĐÚNG (Thư mục testtimonials có 2 chữ t) ---
        this.testimonials = [
            {
                // File: testimonial-1-1.jpg
                avatar: 'assets/images/testtimonials/testimonial-1-1.jpg',
                name: 'Jennifer',
                location: 'California',
                rating: 5,
                title: 'Great Price & Services',
                text: 'Automize rice crackers are a staple in my pantry. They are a healthier alternative to traditional crackers and chips, but still satisfy my craving for something spicy and crunchy...'
            },
            {
                // File: testimonial-3.jpg
                avatar: 'assets/images/testtimonials/testimonial-3.jpg',
                name: 'Michael',
                location: 'New York',
                rating: 5,
                title: 'Excellent Quality',
                text: 'I have been shopping at Automize for years and have always been impressed with the quality of their products. Their customer service is top-notch and delivery is always on time.'
            },
            {
                // File: testimonial-4.jpg
                avatar: 'assets/images/testtimonials/testimonial-4.jpg',
                name: 'Sarah',
                location: 'Texas',
                rating: 5,
                title: 'Highly Recommend',
                text: 'The selection of auto parts at Automize is incredible. I was able to find everything I needed for my car restoration project. Prices are competitive and quality is excellent!'
            }
        ];
        
        this.init();
    }
    
    init() {
        this.showTestimonial(0);
        this.setupDots();
        this.startAutoplay();
    }
    
    showTestimonial(index) {
        const testimonial = this.testimonials[index];
        const container = document.querySelector('.testimonial-content');
        
        if (!container) return;
        
        const stars = '<i class="fas fa-star"></i>'.repeat(testimonial.rating);
        
        container.innerHTML = `
            <img src="${testimonial.avatar}" 
                 alt="${testimonial.name}" 
                 class="testimonial-avatar"
                 style="width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin: 0 auto 20px;"
                 onerror="this.src='https://via.placeholder.com/100?text=User'">
            <div class="testimonial-rating">${stars}</div>
            <h3>${testimonial.title}</h3>
            <p>${testimonial.text}</p>
            <p class="testimonial-author">${testimonial.name} - From ${testimonial.location}</p>
        `;
        
        this.currentSlide = index;
        this.updateDots();
    }
    
    setupDots() {
        const dotsContainer = document.querySelector('.testimonial-dots');
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        this.testimonials.forEach((_, index) => {
            const dot = document.createElement('span');
            dot.className = 'dot';
            dot.addEventListener('click', () => this.goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        this.updateDots();
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.testimonial-dots .dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    goToSlide(index) {
        this.stopAutoplay();
        this.showTestimonial(index);
        this.startAutoplay();
    }
    
    nextSlide() {
        let next = this.currentSlide + 1;
        if (next >= this.testimonials.length) {
            next = 0;
        }
        this.showTestimonial(next);
    }
    
    startAutoplay() {
        this.stopAutoplay();
        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 6000);
    }
    
    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }
}

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const heroSlider = new HeroSlider();
    const testimonialSlider = new TestimonialSlider();
    
    // Store instances globally if needed
    window.sliders = {
        hero: heroSlider,
        testimonial: testimonialSlider
    };
});

// Handle page visibility for autoplay
document.addEventListener('visibilitychange', () => {
    if (window.sliders) {
        if (document.hidden) {
            // Stop autoplay when page is hidden
            window.sliders.hero.stopAutoplay();
            window.sliders.testimonial.stopAutoplay();
        } else {
            // Resume autoplay when page is visible
            window.sliders.hero.startAutoplay();
            window.sliders.testimonial.startAutoplay();
        }
    }
});