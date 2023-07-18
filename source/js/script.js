import addTelInputMasks from './tel-input-mask';
import animateAppearance from './animate-appearance';
import animateAccordion from './accordion-animation';
import { mainMenuAppearing, mainMenuMobileShow } from './main-menu-animation';
import submitFormHandler from './forms';
// import popupAnimate from './popup';

import './sliders-start';

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

// forms handling
document.querySelectorAll('.form').forEach((el) => { el.addEventListener('submit', submitFormHandler); });
document.querySelectorAll('.quiz__form').forEach((el) => { el.addEventListener('submit', submitFormHandler); });
