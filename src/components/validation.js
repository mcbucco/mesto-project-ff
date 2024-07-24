export function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
}) {

  const formsList = Array.from(document.querySelectorAll(formSelector));
  formsList.forEach(formElement => setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass));

}

export function clearValidation(formElement, validationConfig) {
  const inputsList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  inputsList.forEach(inputElement => hideInputError(formElement, inputElement, validationConfig.inputErrorClass, validationConfig.errorClass));
  toggleButtonState(inputsList, buttonElement, validationConfig.inactiveButtonClass);
}

function setEventListeners(formElement, inputSelector, buttonSelector, inactiveButtonClass, inputErrorClass, errorClass) {
  const inputsList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(buttonSelector);

  inputsList.forEach(inputElement => inputElement.addEventListener('input', () => {
    inputIsValid(formElement, inputElement, inputErrorClass, errorClass);
    toggleButtonState(inputsList, buttonElement, inactiveButtonClass);
  })
  );
}

function toggleButtonState(inputsList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputsList)) {
    buttonElement.disabled = 'true';
    buttonElement.classList.add(inactiveButtonClass);
  }
  else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(inactiveButtonClass);
  }
}

function hasInvalidInput(inputsList) {
  return inputsList.some(inputElement => !inputElement.validity.valid);
}

function inputIsValid(formElement, inputElement, inputErrorClass, errorClass) {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  }
  else {
    inputElement.setCustomValidity('');
  }
  
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage)
  }
  else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass);
  }
}

function showInputError(formElement, inputElement, inputErrorClass, errorClass, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
  inputElement.setCustomValidity("");
}