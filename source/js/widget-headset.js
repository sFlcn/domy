export default function headsetStick({
  targetEl,
  bottomEl,
  cssClassSticked,
  cssClassHidden,
  scrollDistance,
  bottomOffset,
}) {
  const el = targetEl;
  if (el) {
    window.onscroll = function handeleStick() {
      const bottomElTop = bottomEl.getBoundingClientRect().top;
      if (window.scrollY >= scrollDistance) {
        el.classList.add(cssClassSticked);
      } else {
        el.classList.remove(cssClassSticked);
      }
      if (bottomElTop + bottomOffset <= document.documentElement.clientHeight) {
        el.classList.add(cssClassHidden);
      } else {
        el.classList.remove(cssClassHidden);
      }
    };
  }
}
