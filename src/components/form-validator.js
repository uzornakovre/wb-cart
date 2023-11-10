// Валидатор полей ввода

export default class FormValidator {
  constructor(settingsList, formElement) {
    this._settings = settingsList;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
  }

  enableValidation() {
    this._setEventListenersBeforeSubmit();
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._setEventListenersAfterSubmit();
      this._inputList.forEach((inputElement) => {
        this._checkInputValidity(inputElement);
      });
    });
  }

  _setSpecialRules(inputElement) {
    if (inputElement.id === "phone") {
      inputElement.addEventListener("keyup", (evt) => {
        if (evt.key !== "Backspace") {
          const matches = evt.target.value
            .replace(/\D/g, "")
            .match(/(\d)(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
          let result = "+";
          if (matches && matches.length > 0 && matches[1].length) {
            result = `+${matches[1]}`;
            for (let i = 2; i <= 5; i++) {
              if (matches[i].length > 0) {
                result += " " + matches[i];
              }
            }
          }
          evt.target.value = result;
        }
      });
    }

    if (inputElement.id === "inn") {
      inputElement.addEventListener("keyup", (evt) => {
        if (evt.key !== "Backspace") {
          const matches = evt.target.value
            .replace(/\D/g, "")
            .match(/[0-9]{0,14}/);
          evt.target.value = matches;
        }
      });
    }
  }

  _setCustomValidity(inputElement) {
    this._settings.validationMessages.forEach((item) => {
      if (inputElement.id === item.id && inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(item.valueMissing);
      } else if (
        inputElement.id === item.id &&
        inputElement.validity.typeMismatch
      ) {
        inputElement.setCustomValidity(item.typeMismatch);
      } else if (
        inputElement.id === item.id &&
        inputElement.validity.patternMismatch
      ) {
        inputElement.setCustomValidity(item.patternMismatch);
      } else if (
        inputElement.id === item.id &&
        inputElement.validity.tooShort
      ) {
        inputElement.setCustomValidity(item.tooShort);
      } else if (inputElement.id === item.id) {
        inputElement.setCustomValidity("");
      }
    });
  }

  _setEventListenersBeforeSubmit() {
    this._inputList.forEach((inputElement) => {
      this._setSpecialRules(inputElement);
      inputElement.addEventListener("change", () => {
        if (inputElement.value.length) {
          this._checkInputValidity(inputElement);
          inputElement.addEventListener("input", () => {
            this._checkInputValidity(inputElement);
          });
        }
      });
    });
  }

  _setEventListenersAfterSubmit() {
    this._inputList.forEach((inputElement) => {
      inputElement.removeEventListener("change", () => {
        if (inputElement.value.length) {
          this._checkInputValidity(inputElement);
        }
      });
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
      });
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkInputValidity(inputElement) {
    this._setCustomValidity(inputElement);
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `${this._settings.inputSelector}-error_content_${inputElement.id}`
    );
    this._errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._settings.inputErrorClass);
    this._errorElement.classList.remove(this._settings.inputTipClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(
      `${this._settings.inputSelector}-error_content_${inputElement.id}`
    );
    this._errorElement.textContent = "";
    inputElement.classList.remove(this._settings.inputErrorClass);
  }

  resetValidation() {
    this._inputList.forEach((inputElement) =>
      this._hideInputError(inputElement)
    );
  }
}
