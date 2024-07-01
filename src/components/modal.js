export function handleOpenModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleCloseModalByEsc)
}
  
export function handleCloseModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleCloseModalByEsc);
}

export function handleCloseModalByOverlayClick(evt) {
  if (evt.target === evt.currentTarget) {
    handleCloseModal(evt.target);
  }
}

export function handleCloseModalByEsc(evt) {
  if (evt.key === 'Escape') {
    handleCloseModal(document.querySelector('.popup_is-opened'));
  }
}

export function setCloseModalByClickListeners(popupList) {
  popupList.forEach(popup => {
    const closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', () => handleCloseModal(popup));
    popup.addEventListener('click', handleCloseModalByOverlayClick);
  })
}