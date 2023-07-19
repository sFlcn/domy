import { makePromoSwiper, makeAuxSwiper, makeQuizSwiper } from './swipers';
import addTelInputMasks from './tel-input-mask';
import animateAppearance from './animate-appearance';
import animateAccordion from './accordion-animation';
import { mainMenuAppearing, mainMenuMobileShow } from './main-menu-animation';
import submitFormHandler from './forms';
// import popupAnimate from './popup';

const promoSliderEl = document.querySelector('.slider-img');
const auxTextSliderEl = document.querySelector('.slider-txt');
const quizSliderEl = document.querySelector('.slider-quiz');
let promoSwiper;
let auxSwiper;
let quizSwiper;

// LAUNCHING
window.addEventListener('DOMContentLoaded', addTelInputMasks);
animateAppearance('animated-appearance', 250);

// popupAnimate({
//   popupElement: document.querySelector('.popup-form'),
//   popupBtns: document.querySelectorAll('.callback-button'),
// });

mainMenuAppearing({
  menuItemsElementsArr: document.querySelectorAll('.header__nav-list--desktop .site-nav__link'),
  openMenuClassName: 'menu--active',
});

mainMenuMobileShow({
  menuEl: document.querySelector('.header__nav-block'),
  menuBurgerButton: document.querySelector('.header__burger'),
  cssClassForOpen: 'header__nav-block--open',
});

// accordions
document.querySelectorAll('.basequipment__category').forEach((el) => { animateAccordion(el, 'basequipment__item--open'); });
document.querySelectorAll('.faq__category-list').forEach((el) => { animateAccordion(el, 'faq__item--open'); });

// sliders
if (promoSliderEl) {
  promoSwiper = makePromoSwiper(promoSliderEl);
  if (auxTextSliderEl) {
    auxSwiper = makeAuxSwiper(auxTextSliderEl);
    auxSwiper.controller.control = promoSwiper;
    promoSwiper.controller.control = auxSwiper;
  }
}

if (quizSliderEl) {
  // eslint-disable-next-line no-unused-vars
  quizSwiper = makeQuizSwiper(quizSliderEl);
}

// forms handling
document.querySelectorAll('.form').forEach((el) => { el.addEventListener('submit', submitFormHandler); });
document.querySelectorAll('.quiz__form').forEach((el) => { el.addEventListener('submit', submitFormHandler); });
