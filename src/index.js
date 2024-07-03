import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { initialCards } from './components/cards.js'
import { openModal, closeModal, setCloseModalByClickListeners } from './components/modal.js';

// @todo: DOM узлы
const profileTitle = document.querySelector('.profile__title');
const profileOccupation = document.querySelector('.profile__description');
const cardsContainer = document.querySelector('.places__list');

const editProfilePopup = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const editProfileForm = document.forms['edit-profile'];
const editNameInput = editProfileForm.elements.name;
const editOccupationInput = editProfileForm.elements.description;

const addPlaceForm = document.forms['new-place'];
const addPlaceNameInput = addPlaceForm.elements['place-name'];
const addPlaceImgLinkInput = addPlaceForm.elements.link;

const addCardButton = document.querySelector('.profile__add-button');
const addCardPopup = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');
const popupImagePic = popupImage.querySelector('.popup__image');
const popupImageTitle = popupImage.querySelector('.popup__caption');

const popupList = document.querySelectorAll('.popup');

function handleEditProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = editNameInput.value;
  profileOccupation.textContent = editOccupationInput.value;
  closeModal(editProfilePopup);
  editProfileForm.reset();
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const card = createCard(addPlaceNameInput.value, addPlaceImgLinkInput.value, '', deleteCard, openImagePopup, likeCard);
  cardsContainer.prepend(card);
  closeModal(addCardPopup);
  addPlaceForm.reset();
}

function handleEditProfileButtonClick() {
  openModal(editProfilePopup);
  editNameInput.value = profileTitle.textContent;
  editOccupationInput.value = profileOccupation.textContent;
}

function openImagePopup(cardData) {
  openModal(popupImage);
  popupImagePic.src = cardData.link;
  popupImagePic.alt = cardData.name;
  popupImageTitle.textContent = cardData.name;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const card = createCard(item.name, item.link, item.alt, deleteCard, openImagePopup, likeCard);
  cardsContainer.append(card);
})

editProfileButton.addEventListener('click', handleEditProfileButtonClick);

addCardButton.addEventListener('click', () => {
  openModal(addCardPopup);
});

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

addPlaceForm.addEventListener('submit', handleAddPlaceFormSubmit);

setCloseModalByClickListeners(popupList);