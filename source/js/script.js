import {
  makePromoSwiper, makeAuxSwiper, makeQuizSwiper, makeCoverflowSwiper,
} from './swipers';
import addTelInputMasks from './tel-input-mask';
import animateAppearance from './animate-appearance';
import animateAccordion from './accordion-animation';
import { mainMenuMobileShow } from './main-menu-animation';
import submitFormHandler from './forms';
import buttonEnabling from './button-enabling-check';
import headsetStick from './widget-headset';
// import popupAnimate from './popup';

const promoSliderEl = document.querySelector('.slider-img');
const auxTextSliderEl = document.querySelector('.slider-txt');
const quizSliderEl = document.querySelector('.slider-quiz');
const technologySliderEl = document.querySelector('.technology__photo-slider .slider-coverflow');
let promoSwiper;
let auxSwiper;
let quizSwiper;
let coverflowSwiper;

const pageWindow = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// LAUNCHING
const noJsEl = document.querySelector('main.no-js');
if (noJsEl) {
  noJsEl.classList.remove('no-js');
}

window.addEventListener('DOMContentLoaded', addTelInputMasks);
animateAppearance('animated-appearance', 250);

// headset widget
const widgetEl = document.querySelector('.widget-headset');
headsetStick({ targetEl: widgetEl, cssClass: 'widget-headset--sticky', scrollDistance: 70 });

// popupAnimate({
//   popupElement: document.querySelector('.popup-form'),
//   popupBtns: document.querySelectorAll('.callback-button'),
// });

mainMenuMobileShow({
  menuEl: document.querySelector('.header__nav-block'),
  menuBurgerButton: document.querySelector('.header__burger'),
  cssClassForOpen: 'header__nav-block--open',
});

// accordions
document.querySelectorAll('.basequipment__category').forEach((el) => { animateAccordion(el, 'basequipment__item--open', 'autoCollapse'); });
document.querySelectorAll('.faq__category-list').forEach((el) => { animateAccordion(el, 'faq__item--open', 'autoCollapse'); });
document.querySelectorAll('.business').forEach((el) => { animateAccordion(el, 'business__container--open'); });

// sliders
if (promoSliderEl) {
  promoSwiper = makePromoSwiper(promoSliderEl);
  if (auxTextSliderEl) {
    auxSwiper = makeAuxSwiper(auxTextSliderEl);
    auxSwiper.controller.control = promoSwiper;
    promoSwiper.controller.control = auxSwiper;
  }
}

if (technologySliderEl) {
  // remove first slide on desktop version (due to the presence of a similar picture)
  if (pageWindow.width >= 1200) technologySliderEl.querySelector('.swiper-slide:first-child').remove();

  // eslint-disable-next-line no-unused-vars
  coverflowSwiper = makeCoverflowSwiper(technologySliderEl);
}

if (quizSliderEl) {
  quizSwiper = makeQuizSwiper(quizSliderEl);
  document.querySelectorAll('.quiz__container').forEach((el) => {
    buttonEnabling(el, 'swiper-quiz-next', () => { quizSwiper.slideNext(); });
  });
}

// forms handling
document.querySelectorAll('.form').forEach((el) => { el.addEventListener('submit', submitFormHandler); });
document.querySelectorAll('.quiz__form').forEach((el) => { el.addEventListener('submit', submitFormHandler); });
