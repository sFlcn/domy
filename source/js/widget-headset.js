export default function headsetStick({ targetEl, cssClass, scrollDistance }) {
  const el = targetEl;
  if (el) {
    window.onscroll = function handeleStick() {
      if (window.scrollY >= scrollDistance) {
        el.classList.add(cssClass);
      } else {
        el.classList.remove(cssClass);
      }
    };
  }
}
