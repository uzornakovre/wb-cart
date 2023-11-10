// Компонент адреса доставки

export class DeliveryAddress {
  constructor({ address, handleDeleteClick }, templateSelector) {
    this._id = address.id;
    this._value = address.value;
    this._type = address.type;
    this._handleDeleteClick = handleDeleteClick;
    this._templateSelector = templateSelector;
  }

  _getAddressTemplate() {
    const address = document
      .querySelector(this._templateSelector)
      .content.querySelector(".modal__list-item")
      .cloneNode(true);

    return address;
  }

  createItem() {
    this._element = this._getAddressTemplate();

    this._setEventListeners();

    this._input = this._element.querySelector(".radio-button__input");
    this._label = this._element.querySelector(".radio-button__label");
    this._number = this._element.querySelector(".payment-method__card-number");
    this._listItemBottom = this._element.querySelector(
      ".modal__list-item-bottom"
    );

    this._input.id = this._id;
    this._input.value = this._value;
    this._label.setAttribute("for", this._id);
    this._label.textContent = this._value;

    if (this._type === "courier") {
      this._listItemBottom.classList.remove("modal__list-item-bottom_visible");
    } else
      this._listItemBottom.classList.add("modal__list-item-bottom_visible");

    return this._element;
  }

  removeItem() {
    this._element.remove();
  }

  _setEventListeners() {
    this._deleteButton = this._element.querySelector(".radio-button__delete");
    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });
  }
}
