import { removeCard, addLike, removeLike } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(isOwn, isLiked, cardId, name, link, description, likesQty, deleteFunction, clickFunction, likeFunction) {
  const cardSample = cardTemplate.cloneNode(true);
  const deleteCardButton = cardSample.querySelector('.card__delete-button');
  const likeButton = cardSample.querySelector('.card__like-button');
  const likeCounter = cardSample.querySelector('.card__like-counter');
  const cardImage = cardSample.querySelector('.card__image');
  const card = cardSample.querySelector('.card');
  const cardID = cardId;
  
  cardSample.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = description;
  likeCounter.textContent = likesQty;
  
  cardImage.addEventListener('click', () => clickFunction({name, link})); 
  
  likeButton.addEventListener('click', () => likeFunction({likeButton, cardID, likeCounter}));

  if (isOwn) {
    deleteCardButton.addEventListener('click', () => deleteFunction({card, cardID}));
  }
  else {
    deleteCardButton.remove();
  }

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  return cardSample;
}

// @todo: Функция удаления карточки
export function deleteCard(cardData) { 
  cardData.card.remove();
  removeCard(cardData.cardID);
}
  
export function likeCard(cardData) {
  if (cardData.likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(cardData.cardID)
      .then(cardItem => {
        cardData.likeCounter.textContent = cardItem.likes.length;
        console.log('disliked');
    });
  }
  else
  {
    addLike(cardData.cardID)
      .then(cardItem => {
        cardData.likeCounter.textContent = cardItem.likes.length;
        console.log('liked');
    });;
  }
  cardData.likeButton.classList.toggle('card__like-button_is-active');
}