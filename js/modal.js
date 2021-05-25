import blockScroll from './blockScroll.js';

const {disableScroll, enableScroll} = blockScroll;

export default function modal() {

  const designBlockElem = document.querySelector('.design-block');
  const modalElem = document.querySelector('.modal');

  const openModal = () => {
    modalElem.classList.remove('hidden');
    disableScroll();
  };
  const closeModal = () => {
    modalElem.classList.add('hidden');
    enableScroll();
  };

  designBlockElem.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.more')) {
      openModal();
    }
  });

  modalElem.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('overlay') ||
      target.classList.contains('modal__close')) {
      closeModal();
    }
  });

}













