export default function addTelInputMasks() {
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
