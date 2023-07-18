export default function animateAccordion(accListEl, openAccordionClassName) {
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
