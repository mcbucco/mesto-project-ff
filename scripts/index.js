// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, link, alt, deleteFunction) {
  const cardSample = cardTemplate.cloneNode(true);
  const deleteCardButton = cardSample.querySelector('.card__delete-button');
  cardSample.querySelector('.card__title').textContent = name;
  cardSample.querySelector('.card__image').src = link; 
  cardSample.querySelector('.card__image').alt = alt; 
  deleteCardButton.addEventListener('click', deleteCard);
  return cardSample;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.parentElement.remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach((item) => {
  const card = createCard(item.name, item.link, item.alt, deleteCard);
  cardContainer.append(card);
})