import Swiper, {
  Navigation,
  Pagination,
  Controller,
  FreeMode,
  EffectCreative,
} from 'swiper';
import 'swiper/swiper-bundle.min.css';

const mainMenuElements = {
  menuItemsElementsArr: document.querySelectorAll('.header__nav-list--desktop .site-nav__link'),
  openMenuClassName: 'menu--active',
};

const mainMenuMobileBurgerElements = {
  menuEl: document.querySelector('.header__nav-block'),
  menuBurgerButton: document.querySelector('.header__burger'),
  cssClassForOpen: 'header__nav-block--open',
};

const basequipmentAccordions = document.querySelectorAll('.basequipment__category');
const faqAccordions = document.querySelectorAll('.faq__category-list');

const promoSliderEl = document.querySelector('.slider-img');
const auxTextSliderEl = document.querySelector('.slider-txt');
let promoSwiper;
let txtSwiper;

const quizSliderEl = document.querySelector('.slider-quiz');
let quizSwiper;

// const callbackPopupOption = {
//   popupElement: document.querySelector('.popup-form'),
//   popupBtns: document.querySelectorAll('.callback-button'),
// };

const userForms = document.querySelectorAll('.form');
const quizForms = document.querySelectorAll('.quiz__form');

// Functions:

// animate accordion function

function animateAccordion(accListEl, openAccordionClassName) {
  const accordionButtons = accListEl.querySelectorAll('.accordion-button');

  function accordionClickHandler(evt) {
    const clickedItem = evt.currentTarget;
    const clickedItemParent = clickedItem.parentElement;
    const clickedItemDescr = clickedItemParent.querySelector('.accordion-content');
    const isClosing = clickedItemParent.classList.contains(openAccordionClassName);

    accordionButtons.forEach((element) => {
      const accordionParentElement = element.parentElement;
      const accordionDescrElement = accordionParentElement.querySelector('.accordion-content');
      accordionParentElement.classList.remove(openAccordionClassName);
      accordionDescrElement.style.maxHeight = null;
    });

    if (!isClosing) {
      clickedItemParent.classList.add(openAccordionClassName);
      clickedItemDescr.style.maxHeight = `${clickedItemDescr.scrollHeight}px`;
    }
  }
  accordionButtons.forEach((element) => {
    element.addEventListener('click', accordionClickHandler);
  });
}

// telephone input mask

function addTelInputMasks() {
  function telMask(input) {
    let keyCode;
    function mask(event) {
      if (event.keyCode) {
        keyCode = event.keyCode;
      }
      const pos = this.selectionStart;
      if (pos < 3) event.preventDefault();
      const matrix = '+7 (___) ___ ____';
      let i = 0;
      const def = matrix.replace(/\D/g, '');
      const val = this.value.replace(/\D/g, '');
      let newValue = matrix.replace(/[_\d]/g, (a) => {
        if (i < val.length) {
          i += 1;
          const result = val.charAt(i - 1) || def.charAt(i);
          return result;
        }
        return a;
      });
      i = newValue.indexOf('_');
      if (i !== -1) {
        if (i < 5) i = 3;
        newValue = newValue.slice(0, i);
      }
      let reg = matrix.substring(0, this.value.length)
        .replace(/_+/g, (a) => `\\d{1,${a.length}}`)
        .replace(/[+()]/g, '\\$&');
      reg = new RegExp(`^${reg}$`);
      if (!reg.test(this.value) || (this.value.length < 5) || (keyCode > 47 && keyCode < 58)) {
        this.value = newValue;
      }
      if (event.type === 'blur' && this.value.length < 5) this.value = '';
    }

    input.addEventListener('input', mask, false);
    input.addEventListener('focus', mask, false);
    input.addEventListener('blur', mask, false);
    input.addEventListener('keydown', mask, false);
  }

  [].forEach.call(document.querySelectorAll('[type="tel"]'), telMask);
}

// animated appearance

function isPartiallyVisible(element) {
  const { bottom, height } = element.getBoundingClientRect();
  return (bottom - height < window.innerHeight);
}

function animateAppearance(elementsCssClass, throttleTimer) {
  const elementsList = document.querySelectorAll(`.${elementsCssClass}`);
  if (!elementsList) { return; }

  function scrollingResolve() {
    elementsList.forEach((element) => {
      if (isPartiallyVisible(element)) {
        element.classList.remove(`${elementsCssClass}--hidden`);
        element.classList.add(`${elementsCssClass}--shown`);
      }
    });
  }

  let isThrottle = false;

  function throttledScroll() {
    if (isThrottle) { return; }

    isThrottle = true;

    setTimeout(() => {
      scrollingResolve(elementsList, elementsCssClass);
      isThrottle = false;
    }, throttleTimer);
  }

  elementsList.forEach((element) => { element.classList.add(`${elementsCssClass}--hidden`); });
  window.addEventListener('scroll', throttledScroll);
  document.addEventListener('DOMContentLoaded', scrollingResolve);
}

// main-menu

function mainMenuAppearing({ menuItemsElementsArr, openMenuClassName }) {
  function clearCurrentStatus() {
    menuItemsElementsArr.forEach((el) => el.parentElement.classList.remove(openMenuClassName));
  }

  function onMouseover() {
    clearCurrentStatus();
    this.parentElement.classList.add(openMenuClassName);
  }

  function onFocusin() {
    clearCurrentStatus();
    this.classList.add(openMenuClassName);
  }

  menuItemsElementsArr.forEach((el) => {
    el.addEventListener('mouseover', onMouseover);
    el.parentElement.addEventListener('focusin', onFocusin);
  });
}

function mainMenuMobileShow({ menuEl, menuBurgerButton, cssClassForOpen }) {
  function burgerClickHandler() { menuEl.classList.toggle(cssClassForOpen); }

  menuBurgerButton.addEventListener('click', burgerClickHandler);
}

// popup

// function popupAnimate({
//   popupElement,
//   popupBtns,
//   cssClassForPopupWindow = '.popup-wrapper',
//   cssClassForCloseBtn = '.popup__close',
//   cssClassForOpenPopup = 'popup--open',
//   cssClassForInAnimation = 'popup-in',
//   cssClassForOutAnimation = 'popup-out',
// }) {
//   const popupMainWindow = popupElement.querySelector(cssClassForPopupWindow);
//   const popupCloseBtn = popupElement.querySelector(cssClassForCloseBtn);

//   function escKeydownHandler(evt) {
//     if (evt.key === 'Escape' || evt.key === 'Esc') {
//       evt.preventDefault();
//       popupCloseHandler();
//     }
//   }

//   function popupAnimateIn() {
//     popupMainWindow.classList.remove(cssClassForInAnimation);
//     popupMainWindow.removeEventListener('animationend', popupAnimateIn);
//   }

//   function popupOpenHandler() {
//     popupCloseBtn.addEventListener('click', popupCloseHandler);
//     document.addEventListener('keydown', escKeydownHandler);
//     popupMainWindow.addEventListener('animationend', popupAnimateIn);
//     popupElement.classList.add(cssClassForOpenPopup);
//     popupMainWindow.classList.add(cssClassForInAnimation);
//   }

//   function popupAnimateOut() {
//     popupMainWindow.classList.remove(cssClassForOutAnimation);
//     popupElement.classList.remove(cssClassForOpenPopup);
//     popupMainWindow.removeEventListener('animationend', popupAnimateOut);
//   }

//   function popupCloseHandler() {
//     popupCloseBtn.removeEventListener('click', popupCloseHandler);
//     document.removeEventListener('keydown', escKeydownHandler);
//     popupMainWindow.addEventListener('animationend', popupAnimateOut);
//     popupMainWindow.classList.add(cssClassForOutAnimation);
//   }

//   popupBtns.forEach((element) => element.addEventListener('click', popupOpenHandler));
// }

// form sending
async function submitFormHandler(event) {
  event.preventDefault();
  try {
    const response = await fetch(event.target.action, { method: 'POST', body: new FormData(event.target) });
    if (!response.ok) {
      throw new Error(`Ошибка при обращении к серверу: ${response.status} ${response.statusText}`);
    }
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('Ошибка обработки. Ответ не JSON');
    }
    const json = await response.json();
    if (json.result === 'success') {
      alert(json.info);
      event.target.reset();
    } else {
      console.log(json);
      throw new Error(json.info);
    }
  } catch (error) {
    alert(error);
  }
}

// LAUNCHING:

window.addEventListener('DOMContentLoaded', addTelInputMasks);
animateAppearance('animated-appearance', 250);
mainMenuAppearing(mainMenuElements);
mainMenuMobileShow(mainMenuMobileBurgerElements);
// popupAnimate(callbackPopupOption);

userForms.forEach((el) => {
  el.addEventListener('submit', submitFormHandler);
});

quizForms.forEach((el) => {
  el.addEventListener('submit', submitFormHandler);
});

basequipmentAccordions.forEach((el) => {
  animateAccordion(el, 'basequipment__item--open');
});

faqAccordions.forEach((el) => {
  animateAccordion(el, 'faq__item--open');
});

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
