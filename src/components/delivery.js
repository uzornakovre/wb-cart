export class Delivery {
  constructor(address, templateSelector) {
    this._id = address.id;
    this._value = address.value;
    this._type = address.type;
    this._templateSelector = templateSelector;
  }

  _getAddressTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".modal__list-item")
      .cloneNode(true);

    return card;
  }

  createItem() {
    this._element = this._getAddressTemplate();

    this._input = this._element.querySelector(".radio-button__input");
    this._label = this._element.querySelector(".radio-button__label");
    this._deleteButton = this._element.querySelector(".radio-button__delete");
    this._number = this._element.querySelector(".payment-method__card-number");

    this._input.id = this._id;
    this._input.value = this._value;
    this._label.setAttribute("for", this._id);
    this._label.textContent = this._value;

    return this._element;
  }
}
