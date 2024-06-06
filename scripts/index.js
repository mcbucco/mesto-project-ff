// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function addCard(name, link, wishFunction) {
  const cardSample = cardTemplate.cloneNode(true);
  const deleteCardButton = cardSample.querySelector('.card__delete-button');
  cardSample.querySelector('.card__title').textContent = name;
  cardSample.querySelector('.card__image').src = link;
  cardContainer.append(cardSample); 
  deleteCardButton.addEventListener('click', wishFunction);
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.parentElement.remove();
}


// @todo: Вывести карточки на страницу
initialCards.forEach((item) => addCard(item.name, item.link, deleteCard));