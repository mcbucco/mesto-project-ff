export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}
  
export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

export function closeOnOverlayClick(evt) {
  if (!evt.target.classList.contains('popup__content') || !evt.target.classList.contains('popup__image')) {
    closePopup(evt.target);
  }
}

export function closeOnEsc(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
    document.removeEventListener('keydown', closeOnEsc);
  }
}