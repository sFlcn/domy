export default function headsetStick({ targetEl, cssClass, scrollDistance }) {
  const el = targetEl;
  window.onscroll = function handeleStick() {
    console.log(window.scrollY);
    if (window.scrollY >= scrollDistance) {
      el.classList.add(cssClass);
    } else {
      el.classList.remove(cssClass);
    }
  };
}
