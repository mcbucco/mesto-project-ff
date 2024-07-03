// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(name, link, description, deleteFunction, clickFunction, likeFunction) {
  const cardSample = cardTemplate.cloneNode(true);
  const deleteCardButton = cardSample.querySelector('.card__delete-button');
  const likeButton = cardSample.querySelector('.card__like-button');
  const cardImage = cardSample.querySelector('.card__image');
  const card = cardSample.querySelector('.card');
  
  cardSample.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = description;
  
  cardImage.addEventListener('click', () => clickFunction({name, link})); 
  
  likeButton.addEventListener('click', () => likeFunction(likeButton));
  
  deleteCardButton.addEventListener('click', () => deleteFunction(card));

  return cardSample;
}

// @todo: Функция удаления карточки
export function deleteCard(card) { 
  card.remove();
}

export function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
  // evt.target.classList.toggle('card__like-button_is-active');
}