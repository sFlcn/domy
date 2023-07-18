import Swiper, {
  Navigation,
  Pagination,
  Controller,
  FreeMode,
  EffectCreative,
} from 'swiper';
import 'swiper/swiper-bundle.min.css';

const promoSliderEl = document.querySelector('.slider-img');
const auxTextSliderEl = document.querySelector('.slider-txt');
let promoSwiper;
let txtSwiper;

const quizSliderEl = document.querySelector('.slider-quiz');
let quizSwiper;

if (promoSliderEl) {
  promoSwiper = new Swiper(
    promoSliderEl,
    {
      modules: [Navigation, Pagination, Controller, FreeMode, EffectCreative],
      loop: true,
      speed: 450,
      grabCursor: true,
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
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
  if (auxTextSliderEl) {
    txtSwiper = new Swiper(
      auxTextSliderEl,
      {
        modules: [Controller],
        allowTouchMove: false,
        loop: true,
        speed: 1100,
        spaceBetween: 300,
      },
    );

    txtSwiper.controller.control = promoSwiper;
    promoSwiper.controller.control = txtSwiper;
  }
}

if (quizSliderEl) {
  // eslint-disable-next-line no-unused-vars
  quizSwiper = new Swiper(
    quizSliderEl,
    {
      modules: [Navigation, Pagination, Controller, FreeMode, EffectCreative],
      speed: 750,
      autoHeight: true,
      navigation: { nextEl: '.swiper-quiz-next' },
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
