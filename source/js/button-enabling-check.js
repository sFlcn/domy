export default function buttonEnabling(element, buttoncssClass, cb) {
  const elInputs = element.querySelectorAll('input[type=radio]');
  const elButton = element.querySelector(`.${buttoncssClass}`);

  const checkInputs = () => {
    if (Array.from(elInputs).some((el) => el.checked === true)) {
      cb();
    }
  };

  if ((elInputs.length) && (elButton)) {
    elButton.addEventListener('click', checkInputs);
  } else if (elButton) {
    elButton.addEventListener('click', cb);
  }
}
