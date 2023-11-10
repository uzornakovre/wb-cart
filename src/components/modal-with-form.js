import Modal from "./modal";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, form, submitFunction, optionalFunction) {
    super(modalSelector);
    this._form = form;
    this._submitFunction = submitFunction;
    this._changeDeliveryType = optionalFunction;
  }

  open() {
    super.open();
    // this._form.reset();
  }

  _getInputValues() {
    this._checkedInput = this._form.querySelector(".modal__form-input:checked");
    return this._checkedInput.value;
  }

  setEventListeners() {
    this._pickUpPointButton = this._form.querySelector("#pick_up");
    this._courierButton = this._form.querySelector("#courier");

    super.setEventListeners();

    if (this._pickUpPointButton && this._courierButton) {
      this._pickUpPointButton.addEventListener("click", () => {
        this._changeDeliveryType("pick-up");
        this._pickUpPointButton.classList.add(
          "modal__delivery-type-button_active"
        );
        this._courierButton.classList.remove(
          "modal__delivery-type-button_active"
        );
      });

      this._courierButton.addEventListener("click", () => {
        this._changeDeliveryType("courier");
        this._pickUpPointButton.classList.remove(
          "modal__delivery-type-button_active"
        );
        this._courierButton.classList.add("modal__delivery-type-button_active");
      });
    }

    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }
}
