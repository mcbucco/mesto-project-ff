import { removeCard, addLike, removeLike } from "./api";

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(cardData) {
  const cardSample = cardTemplate.cloneNode(true);
  const deleteCardButton = cardSample.querySelector('.card__delete-button');
  const likeButton = cardSample.querySelector('.card__like-button');
  const likeCounter = cardSample.querySelector('.card__like-counter');
  const cardImage = cardSample.querySelector('.card__image');
  const card = cardSample.querySelector('.card');
  const cardID = cardData.cardId;
  
  cardSample.querySelector('.card__title').textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.description;
  likeCounter.textContent = cardData.likesQty;
  
  cardImage.addEventListener('click', () => cardData.openFunction({name: cardData.name, link: cardData.link})); 
  
  likeButton.addEventListener('click', () => cardData.likeFunction({likeButton, cardID, likeCounter}));

  if (cardData.isOwn) {
    deleteCardButton.addEventListener('click', () => cardData.deleteFunction({card, cardID}));
  }
  else {
    deleteCardButton.remove();
  }

  if (cardData.isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  return cardSample;
}

// @todo: Функция удаления карточки
export function deleteCard(cardData) { 
  removeCard(cardData.cardID)
    .then(() => {
      cardData.card.remove();
      console.log(`${cardData.cardID} deleted`);
    })
    .catch(error => console.log(`Ошибка: ${error}`));
}
  
export function likeCard(cardData) {
  if (cardData.likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(cardData.cardID)
      .then(cardItem => {
        cardData.likeCounter.textContent = cardItem.likes.length;
        cardData.likeButton.classList.toggle('card__like-button_is-active');
        console.log('disliked');
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }
  else
  {
    addLike(cardData.cardID)
      .then(cardItem => {
        cardData.likeCounter.textContent = cardItem.likes.length;
        cardData.likeButton.classList.toggle('card__like-button_is-active');
        console.log('liked');
      })
      .catch(error => console.log(`Ошибка: ${error}`));
  }
}