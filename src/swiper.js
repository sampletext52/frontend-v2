class Swiper {
  constructor(container, options = {}) {
    this.container = typeof container === 'string' ? document.querySelector(container) : container;
    this.options = {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      ...options
    };
    
    this.currentIndex = 0;
    this.slides = this.container.querySelectorAll('.swiper-slide');
    this.wrapper = this.container.querySelector('.swiper-wrapper');
    this.nextButton = this.container.querySelector(this.options.navigation.nextEl);
    this.prevButton = this.container.querySelector(this.options.navigation.prevEl);
    
    this.init();
  }
  
  init() {
    this.setupSlides();
    this.setupNavigation();
    this.updateSlides();
  }
  
  setupSlides() {
    this.slides.forEach((slide, index) => {
      slide.style.flex = `0 0 ${100 / this.options.slidesPerView}%`;
      slide.style.marginRight = `${this.options.spaceBetween}px`;
    });
    
    this.wrapper.style.transition = 'transform 0.3s ease-in-out';
    this.wrapper.style.display = 'flex';
  }
  
  setupNavigation() {
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.next());
    }
    
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.prev());
    }
  }
  
  updateSlides() {
    const translateX = -this.currentIndex * (100 / this.options.slidesPerView);
    this.wrapper.style.transform = `translateX(${translateX}%)`;
  }
  
  next() {
    if (this.currentIndex < this.slides.length - this.options.slidesPerView) {
      this.currentIndex++;
      this.updateSlides();
    }
  }
  
  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlides();
    }
  }
}

function initSwiper() {
  const swiperContainer = document.querySelector('.business__swiper');
  if (swiperContainer) {
    new Swiper('.business__swiper', {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: '.business__swiper .swiper-button-next',
        prevEl: '.business__swiper .swiper-button-prev',
      }
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSwiper);
} else {
  initSwiper();
}
