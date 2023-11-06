import Modal from "./modal";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, form, submitFunction) {
    super(modalSelector);
    this._form = form;
    this._submitFunction = submitFunction;
  }

  open() {
    super.open();
    this._form.reset();
  }

  _getInputValues() {
    this._checkedInput = this._form.querySelector(".modal__form-input:checked");
    return this._checkedInput.value;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }

  // renderLoading(isLoading, submitType) {
  //   if (isLoading) {
  //     this._modal.querySelector('.modal__form-submit').textContent = 'Сохранение...';
  //   } else {
  //     this._modal.querySelector('.modal__form-submit').textContent = submitType;
  //   }
  // }
}
