function findParentEl(el, cssClassName) {
  let parentEl = el.parentElement;
  if (!parentEl.querySelector(cssClassName)) {
    parentEl = parentEl.parentElement;
  }
  return parentEl;
}

export default function animateAccordion(accListEl, openAccordionClassName, autoCollapse) {
  const accordionButtons = accListEl.querySelectorAll('.accordion-button');

  function accordionClickHandler(evt) {
    const clickedItem = evt.currentTarget;
    const clickedItemParent = findParentEl(clickedItem, '.accordion-content');
    const clickedItemDescr = clickedItemParent.querySelector('.accordion-content');
    const isClosing = clickedItemParent.classList.contains(openAccordionClassName);

    if (autoCollapse) {
      accordionButtons.forEach((element) => {
        const accordionParentElement = findParentEl(element, '.accordion-content');
        const accordionDescrElement = accordionParentElement.querySelector('.accordion-content');
        accordionParentElement.classList.remove(openAccordionClassName);
        accordionDescrElement.style.maxHeight = null;
      });
    }

    if (!isClosing) {
      clickedItemParent.classList.add(openAccordionClassName);
      clickedItemDescr.style.maxHeight = `${clickedItemDescr.scrollHeight}px`;
    } else {
      clickedItemParent.classList.remove(openAccordionClassName);
      clickedItemDescr.style.maxHeight = null;
    }
  }
  accordionButtons.forEach((element) => {
    element.addEventListener('click', accordionClickHandler);
  });
}
