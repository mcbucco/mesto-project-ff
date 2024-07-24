import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, setCloseModalByClickListeners } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getCards, editProfile, addNewCard, updateAvatar } from './components/api.js';

// @todo: DOM узлы
const profileTitle = document.querySelector('.profile__title');
const profileOccupation = document.querySelector('.profile__description');
const profilePhoto = document.querySelector('.profile__image');
const editProfilePhotoButton = document.querySelector('.profile__edit-icon');
const editProfilePhotoPopup = document.querySelector('.popup_type_new-avatar');
const editProfilePhotoForm = document.forms['new-avatar'];
const editProfilePhotoInput = editProfilePhotoForm.elements['avatar-link'];

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

const renderSaving = (popup, form) => {
  const buttonElement = form.querySelector('.button');
  const buttonOldText = buttonElement.textContent;
  buttonElement.textContent = 'Сохранение...';
  closeModal(popup);
  form.reset();
  buttonElement.textContent = buttonOldText;
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

function handleUpdateProfilePhotoFormSubmit(evt) {
  evt.preventDefault();
  const newProfilePhotoLink = editProfilePhotoInput.value;
  updateAvatar(newProfilePhotoLink)
    .then(cardData => {
      profilePhoto.style.backgroundImage = `url('${cardData.avatar}')`;
      console.log(`new avatar id is ${cardData.avatar}`);
    })
    .catch((err) => console.log(err));
  renderSaving(editProfilePhotoPopup, editProfilePhotoForm);
}

function handleEditProfileFormSubmit (evt) {
  evt.preventDefault();
  const newName = editNameInput.value;
  const newAbout = editOccupationInput.value;
  profileTitle.textContent = newName;
  profileOccupation.textContent = newAbout;
  editProfile(newName, newAbout)
  renderSaving(editProfilePopup, editProfileForm);
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCardName = addPlaceNameInput.value;
  const newCardLink = addPlaceImgLinkInput.value;
  
  addNewCard(newCardName, newCardLink)
  .then(cardItem => {
    const card = createCard(true, false, cardItem._id, cardItem.name, cardItem.link, cardItem.name, cardItem.likes.length, deleteCard, openImagePopup, likeCard);
    cardsContainer.prepend(card);
    console.log(`${cardItem._id} added`);
  })
  .catch((err) => console.log(err));
  
  const formElement = addCardPopup.querySelector('form');
  clearValidation(formElement, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
  renderSaving(addCardPopup, addPlaceForm);
}

function handleEditProfileButtonClick() {
  const formElement = editProfilePopup.querySelector('form');
  openModal(editProfilePopup);
  clearValidation(formElement, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
  editNameInput.value = profileTitle.textContent;
  editOccupationInput.value = profileOccupation.textContent;
}

function openImagePopup(cardData) {
  openModal(popupImage);
  popupImagePic.src = cardData.link;
  popupImagePic.alt = cardData.name;
  popupImageTitle.textContent = cardData.name;
}


getUserInfo()
.then(cardData => {
  profileTitle.textContent = cardData.name;
  profileOccupation.textContent = cardData.about;
  profilePhoto.style.backgroundImage = `url('${cardData.avatar}')`;
})
.catch((err) => console.log(err));

// @todo: Вывести карточки на страницу
getCards()
.then(data => {
  const userID = data[0]._id;
  const cardsList = data[1];
  
  cardsList.forEach(cardItem => {
    let isOwn = false, isLiked = false;
    if (cardItem.owner._id == userID) {
      isOwn = true;
    }  
    
    const likesUsersIDs = cardItem.likes.map(likeObj => likeObj._id);
    if (likesUsersIDs.includes(userID)) {
      isLiked = true;
    }

    cardsContainer.append(
      createCard(isOwn, isLiked, cardItem._id, cardItem.name, cardItem.link, cardItem.name, cardItem.likes.length , deleteCard, openImagePopup, likeCard)
    );
  })
})
.catch((err) => console.log(err));

editProfilePhotoButton.addEventListener('click', () => openModal(editProfilePhotoPopup));

editProfileButton.addEventListener('click', handleEditProfileButtonClick);

addCardButton.addEventListener('click', () => {
  openModal(addCardPopup);
});

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

editProfilePhotoForm.addEventListener('submit', handleUpdateProfilePhotoFormSubmit);

addPlaceForm.addEventListener('submit', handleAddPlaceFormSubmit);

setCloseModalByClickListeners(popupList);