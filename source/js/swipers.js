import Swiper, {
  Navigation,
  Pagination,
  Controller,
  FreeMode,
  EffectCreative,
  EffectCoverflow,
  Autoplay,
  Mousewheel,
} from 'swiper';
import 'swiper/swiper-bundle.min.css';

export function makePromoSwiper(el) {
  return new Swiper(
    el,
    {
      modules: [Navigation, Pagination, Controller, EffectCreative, Autoplay],
      loop: true,
      speed: 1750,
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
      spaceBetween: 750,
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

export function makeCoverflowSwiper(el, { grabCursor = true, pauseOnMouseEnter = false }) {
  return new Swiper(
    el,
    {
      modules: [Navigation, Pagination, Controller, EffectCoverflow, Autoplay, Mousewheel],
      loop: true,
      speed: 2000,
      autoplay: {
        delay: 750,
        pauseOnMouseEnter,
      },
      mousewheel: true,
      grabCursor,
      centeredSlides: true,
      slidesPerView: 1,
      breakpoints: {
        660: {
          speed: 1500,
          slidesPerView: 2,
          autoplay: {
            delay: 2000,
            pauseOnMouseEnter,
          },
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

export function makeSimpleSwiper(el, slidesPerView = 1) {
  return new Swiper(
    el,
    {
      modules: [Navigation, Pagination, Controller, EffectCoverflow, Autoplay],
      grabCursor: true,
      slidesPerView,
      spaceBetween: 20,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
    },
  );
}
