export default class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);
    });
  }

  // Функция которая показывает ошибку
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
}

  // Функция которая прячет ошибку
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
}

// Функция которая проверяет валидность поля
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
}

  // Невалидный инпут
  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
  });
};

// Отключение кнопки сабмита
  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

// Включение кнопки сабмита
  enableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

// Функция отвечает за работу кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disableSubmitButton();
    } else {
      this.enableSubmitButton();
    }
}
  // Установка слушателей событий
  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState();
      });

      this._toggleButtonState();
    });
  }
  // Функция отвечает за включение валидации формы
  enableValidation() {
      this._formElement.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });

      this._setEventListeners();
  };
}