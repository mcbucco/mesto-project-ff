import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { initialCards } from './components/cards.js'
import { handleOpenModal, handleCloseModal, setCloseModalByClickListeners } from './components/modal.js';

// @todo: DOM узлы
const profileTitle = document.querySelector('.profile__title');
const profileOccupation = document.querySelector('.profile__description');
const cardsContainer = document.querySelector('.places__list');

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
const popupImagePic = popupImage.querySelector('.popup__image');
const popupImageCloseButton = popupImage.querySelector('.popup__close');
const popupImageTitle = popupImage.querySelector('.popup__caption');

const popupList = document.querySelectorAll('.popup');

function handleEditProfileForm (evt) {
  evt.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileOccupation.textContent = editOccupationInput.value;
  handleCloseModal(editProfilePopup);
  editProfileForm.reset();
}

function handleAddPlaceForm(evt) {
  evt.preventDefault();
  const card = createCard(addPlaceNameInput.value, addPlaceImgLinkInput.value, '', deleteCard, clickCard, likeCard);
  cardsContainer.prepend(card);
  handleCloseModal(addCardPopup);
  addPlaceForm.reset();
}

function openImagePopup(evt) {
  handleOpenModal(popupImage);
  popupImagePic.src = evt.target.src;
  popupImagePic.alt = evt.target.alt;
  popupImageTitle.textContent = evt.target.parentElement.querySelector('.card__title').textContent;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const card = createCard(item.name, item.link, item.alt, deleteCard, openImagePopup, likeCard);
  cardsContainer.append(card);
})

popupImageCloseButton.addEventListener('click', () => {
  handleCloseModal(popupImage);
});

editProfileButton.addEventListener('click', () => {
  handleOpenModal(editProfilePopup);
  editNameInput.value = document.querySelector('.profile__title').textContent;
  editOccupationInput.value = document.querySelector('.profile__description').textContent;
});

editProfileCloseButton.addEventListener('click', () => {
  handleCloseModal(editProfilePopup);
});

addCardButton.addEventListener('click', () => {
  handleOpenModal(addCardPopup);
});

addCardCloseButton.addEventListener('click', () => {
  handleCloseModal(addCardPopup);
});

editProfileForm.addEventListener('submit', handleEditProfileForm);

addPlaceForm.addEventListener('submit', handleAddPlaceForm);

setCloseModalByClickListeners(popupList);