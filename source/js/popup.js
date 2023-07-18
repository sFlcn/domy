export default function popupAnimate({
  popupElement,
  popupBtns,
  cssClassForPopupWindow = '.popup-wrapper',
  cssClassForCloseBtn = '.popup__close',
  cssClassForOpenPopup = 'popup--open',
  cssClassForInAnimation = 'popup-in',
  cssClassForOutAnimation = 'popup-out',
}) {
  const popupMainWindow = popupElement.querySelector(cssClassForPopupWindow);
  const popupCloseBtn = popupElement.querySelector(cssClassForCloseBtn);

  function escKeydownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      popupCloseHandler();
    }
  }

  function popupAnimateIn() {
    popupMainWindow.classList.remove(cssClassForInAnimation);
    popupMainWindow.removeEventListener('animationend', popupAnimateIn);
  }

  function popupOpenHandler() {
    popupCloseBtn.addEventListener('click', popupCloseHandler);
    document.addEventListener('keydown', escKeydownHandler);
    popupMainWindow.addEventListener('animationend', popupAnimateIn);
    popupElement.classList.add(cssClassForOpenPopup);
    popupMainWindow.classList.add(cssClassForInAnimation);
  }

  function popupAnimateOut() {
    popupMainWindow.classList.remove(cssClassForOutAnimation);
    popupElement.classList.remove(cssClassForOpenPopup);
    popupMainWindow.removeEventListener('animationend', popupAnimateOut);
  }

  function popupCloseHandler() {
    popupCloseBtn.removeEventListener('click', popupCloseHandler);
    document.removeEventListener('keydown', escKeydownHandler);
    popupMainWindow.addEventListener('animationend', popupAnimateOut);
    popupMainWindow.classList.add(cssClassForOutAnimation);
  }

  popupBtns.forEach((element) => element.addEventListener('click', popupOpenHandler));
}
