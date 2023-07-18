export function mainMenuAppearing({ menuItemsElementsArr, openMenuClassName }) {
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

export function mainMenuMobileShow({ menuEl, menuBurgerButton, cssClassForOpen }) {
  function burgerClickHandler() { menuEl.classList.toggle(cssClassForOpen); }

  menuBurgerButton.addEventListener('click', burgerClickHandler);
}
