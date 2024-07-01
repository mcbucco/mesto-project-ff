// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(name, link, description, deleteFunction, clickFunction, likeFunction) {
  const cardSample = cardTemplate.cloneNode(true);
  const deleteCardButton = cardSample.querySelector('.card__delete-button');
  const likeButton = cardSample.querySelector('.card__like-button');
  const cardImage = cardSample.querySelector('.card__image');

  cardSample.querySelector('.card__title').textContent = name;
  cardImage.src = link;
  cardImage.alt = description;
  
  deleteCardButton.addEventListener('click', deleteFunction);
  cardImage.addEventListener('click', clickFunction)
  
  likeButton.addEventListener('click', likeFunction);

  return cardSample;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  evt.target.parentElement.remove();
}

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}