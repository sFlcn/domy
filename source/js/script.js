const mainMenuItems = document.querySelectorAll('.site-nav__link');
const basequipmentAccordions = document.querySelectorAll('.basequipment__category');
const faqAccordions = document.querySelectorAll('.faq__category-list');

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

// main-menu showing

function mainMenuShowing(menuItemsElementsArr, openMenuClassName) {
  let currentMenuItem;

  function onMouseover() {
    const parentEl = this.parentElement;
    menuItemsElementsArr.forEach((el) => el.parentElement.classList.remove(openMenuClassName));

    if (currentMenuItem) {
      currentMenuItem.classList.remove(openMenuClassName);
    }
    parentEl.classList.add(openMenuClassName);
    currentMenuItem = parentEl;
  }

  menuItemsElementsArr.forEach((el) => {
    el.addEventListener('mouseover', onMouseover);
  });
}

// LAUNCHING:

window.addEventListener('DOMContentLoaded', addTelInputMasks);
animateAppearance('animated-appearance', 250);
mainMenuShowing(mainMenuItems, 'menu--active');

basequipmentAccordions.forEach((el) => {
  animateAccordion(el, 'basequipment__item--open');
});

faqAccordions.forEach((el) => {
  animateAccordion(el, 'faq__item--open');
});
