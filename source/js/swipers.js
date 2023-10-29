import Swiper, {
  Navigation,
  Pagination,
  Controller,
  FreeMode,
  EffectCreative,
  EffectCoverflow,
  Autoplay,
} from 'swiper';
import 'swiper/swiper-bundle.min.css';

export function makePromoSwiper(el) {
  return new Swiper(
    el,
    {
      modules: [Navigation, Pagination, Controller, FreeMode, EffectCreative, Autoplay],
      loop: true,
      speed: 1750,
      grabCursor: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      autoplay: {
        delay: 5500,
        pauseOnMouseEnter: true,
      },
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: ['-120%', 0, -500],
        },
        next: {
          shadow: true,
          translate: ['120%', 0, -500],
        },
      },
    },
  );
}

export function makeAuxSwiper(el) {
  return new Swiper(
    el,
    {
      modules: [Controller],
      allowTouchMove: false,
      loop: true,
      speed: 1100,
      spaceBetween: 300,
    },
  );
}

export function makeQuizSwiper(el) {
  return new Swiper(
    el,
    {
      modules: [Navigation, Pagination, Controller, FreeMode, EffectCreative],
      speed: 750,
      autoHeight: true,
      // navigation: { nextEl: '.swiper-quiz-next' },
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: true,
          translate: [0, 0, -400],
          rotate: [0, -180, 0],
        },
        next: {
          shadow: true,
          translate: [0, 0, -400],
          rotate: [0, 180, 0],
        },
      },
    },
  );
}

export function makeCoverflowSwiper(el) {
  return new Swiper(
    el,
    {
      modules: [Navigation, Pagination, Controller, EffectCoverflow, Autoplay],
      loop: true,
      speed: 2000,
      autoplay: { delay: 750 },
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 1,
      breakpoints: {
        660: {
          speed: 3000,
          slidesPerView: 2,
          autoplay: { delay: 1750 },
        },
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 10,
        stretch: -20,
        depth: 200,
        scale: 0.7,
        slideShadows: false,
      },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    },
  );
}
