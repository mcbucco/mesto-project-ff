import './pages/index.css';
import { createCard, deleteCard, likeCard } from './components/card.js';
import { openModal, closeModal, setCloseModalByClickListeners } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getCards, editProfile, addNewCard, updateAvatar } from './components/api.js';

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

const renderSaving = (isOn, formElement) => {
  const buttonElement = formElement.querySelector('.button');

  isOn ? buttonElement.textContent = 'Сохранение...': buttonElement.textContent = 'Сохранить';
}

function closeAndReset(popup, formElement) {
  closeModal(popup);
  formElement.reset();
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
  renderSaving(true, editProfilePhotoForm);
  updateAvatar(newProfilePhotoLink)
    .then(cardData => {
      profilePhoto.style.backgroundImage = `url('${cardData.avatar}')`;
      closeAndReset(editProfilePhotoPopup, editProfilePhotoForm);
      console.log(`new avatar url is ${cardData.avatar}`);
    })
    .catch((err) => console.log(err))
    .finally(() => renderSaving(false, editProfilePhotoForm));
}

function handleEditProfileFormSubmit (evt) {
  evt.preventDefault();
  const newName = editNameInput.value;
  const newAbout = editOccupationInput.value;
  renderSaving(true, editProfileForm);
  editProfile(newName, newAbout)
    .then(newData => {
      profileTitle.textContent = newData.name;
      profileOccupation.textContent = newData.about;
      closeAndReset(editProfilePopup, editProfileForm);
      console.log(`profile updated succesfull, new name / about: ${newData.name} / ${newData.about}`)
    })
    .catch((err) => console.log(err))
    .finally(() => renderSaving(false, editProfileForm)); 
}

function handleAddPlaceButtonClick() {
  openModal(addCardPopup);
  clearValidation(addCardPopup, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
}

function handleAddPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newCardName = addPlaceNameInput.value;
  const newCardLink = addPlaceImgLinkInput.value;
  
  renderSaving(true, addPlaceForm);
  addNewCard(newCardName, newCardLink)
  .then(cardItem => {
    const cardData = {
      isOwn: true,
      isLiked: false,
      cardId: cardItem._id,
      name: cardItem.name,
      link: cardItem.link,
      description: cardItem.name,
      likesQty: cardItem.likes.length,
      deleteFunction: deleteCard,
      openFunction: openImagePopup,
      likeFunction: likeCard
    }
    const card = createCard(cardData);
    cardsContainer.prepend(card);
    closeAndReset(addCardPopup, addPlaceForm)
    console.log(`${cardItem._id} added`);
  })
  .catch((err) => console.log(err))
  .finally(() => renderSaving(false, addPlaceForm));
}

function handleEditProfilePhotoButtonClick() {
  openModal(editProfilePhotoPopup);
  clearValidation(editProfilePhotoForm, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
}

function handleEditProfileButtonClick() {
  openModal(editProfilePopup);
  clearValidation(editProfileForm, {
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
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
getCards()
.then(data => {
  const [userData, cardsList] = data;
  
  profileTitle.textContent = userData.name;
  profileOccupation.textContent = userData.about;
  profilePhoto.style.backgroundImage = `url('${userData.avatar}')`;

  cardsList.forEach(cardItem => {
    const isOwn = (cardItem.owner._id == userData._id);
    const isLiked = cardItem.likes.some(
      likeObj => likeObj._id == userData._id
    );

    const cardData = {
      isOwn: isOwn,
      isLiked: isLiked,
      cardId: cardItem._id,
      name: cardItem.name,
      link: cardItem.link,
      description: cardItem.name,
      likesQty: cardItem.likes.length,
      deleteFunction: deleteCard,
      openFunction: openImagePopup,
      likeFunction: likeCard
    }

    cardsContainer.append(createCard(cardData));
  })
})
.catch((err) => console.log(err));

editProfilePhotoButton.addEventListener('click', handleEditProfilePhotoButtonClick);

editProfileButton.addEventListener('click', handleEditProfileButtonClick);

addCardButton.addEventListener('click', handleAddPlaceButtonClick);

editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);

editProfilePhotoForm.addEventListener('submit', handleUpdateProfilePhotoFormSubmit);

addPlaceForm.addEventListener('submit', handleAddPlaceFormSubmit);

setCloseModalByClickListeners(popupList);