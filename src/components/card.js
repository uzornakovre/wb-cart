export class Card {
  constructor(cardData, templateSelector) {
    this._cardId = cardData.id;
    this._cardName = cardData.name;
    this._cardNumber = cardData.card;
    this._cardDate = cardData.date;
    this._cardLogo = cardData.logo;
    this._templateSelector = templateSelector;
  }

  _getCardTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(".modal__list-item")
      .cloneNode(true);

    return card;
  }

  createItem() {
    this._element = this._getCardTemplate();

    this._input = this._element.querySelector(".radio-button__input");
    this._label = this._element.querySelector(".radio-button__label");
    this._logo = this._element.querySelector(".payment-method__logo");
    this._number = this._element.querySelector(".payment-method__card-number");
    this._date = this._element.querySelector(".payment-method__card-date");

    this._input.id = this._cardId;
    this._input.value = this._cardName;
    this._label.setAttribute("for", this._cardId);
    this._logo.src = this._cardLogo;
    this._logo.alt = `Логотип платежной системы ${this._cardName}`;
    this._number.textContent = this._cardNumber;
    this._date.textContent = this._cardDate;

    return this._element;
  }
}
