import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { initialCards } from './components/cards.js'
import { openPopup, closePopup, closeOnEsc, closeOnOverlayClick } from './components/modal.js';

// @todo: DOM узлы
const profileTitle = document.querySelector('.profile__title');
const profileOccupation = document.querySelector('.profile__description');
const cardContainer = document.querySelector('.places__list');

const popUps = document.querySelectorAll('.popup');

const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = editProfilePopup.querySelector('.popup__close');
const editProfileForm = document.forms['edit-profile'];
const editNameInput = editProfileForm.elements.name;
const editOccupationInput = editProfileForm.elements.description;

const addPlaceForm = document.forms['new-place'];
const addPlaceNameInput = addPlaceForm.elements['place-name'];
const addPlaceImgLinkInput = addPlaceForm.elements.link;

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardCloseButton = addCardPopup.querySelector('.popup__close');

const popupImage = document.querySelector('.popup_type_image');
const popupImageCloseButton = popupImage.querySelector('.popup__close');

popUps.forEach((item) => {
  item.classList.add('popup_is-animated');
})

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const card = createCard(item.name, item.link, item.alt, deleteCard, clickCard, likeCard);
  cardContainer.append(card);
})

function clickCard(evt) {
  openPopup(popupImage);
  document.addEventListener('keydown', closeOnEsc);
  const popupImagePic = popupImage.querySelector('.popup__image');
  popupImagePic.src = evt.target.src;
  
  const popupImageTitle = popupImage.querySelector('.popup__caption');
  popupImageTitle.textContent = evt.target.parentElement.querySelector('.card__title').textContent;
}

popupImageCloseButton.addEventListener('click', () => {
  closePopup(popupImage);
});

editProfileButton.addEventListener('click', () => {
  openPopup(editProfilePopup);
  document.addEventListener('keydown', closeOnEsc);
});

editProfileCloseButton.addEventListener('click', () => {
  closePopup(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  openPopup(addCardPopup);
  document.addEventListener('keydown', closeOnEsc);
});

addCardCloseButton.addEventListener('click', () => {
  closePopup(addCardPopup);
});

document.addEventListener('click', closeOnOverlayClick);

editProfileForm.addEventListener('submit', handleFormSubmit);

addPlaceForm.addEventListener('submit', handleFormAddPlace);

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileOccupation.textContent = editOccupationInput.value;
  closePopup(editProfilePopup);
  editProfileForm.reset();
}

function handleFormAddPlace(evt) {
  evt.preventDefault();
  const card = createCard(addPlaceNameInput.value, addPlaceImgLinkInput.value, '', deleteCard, clickCard, likeCard);
  cardContainer.prepend(card);
  closePopup(addCardPopup);
  addPlaceForm.reset();
}