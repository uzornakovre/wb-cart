// Компонент модального окна

export default class Modal {
  constructor(modal) {
    this._modal = modal;
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._modal.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._modal.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._modal.addEventListener("mousedown", (evt) => {
      if (
        evt.target.classList.contains("modal_opened") ||
        evt.target.classList.contains("modal__close-button")
      ) {
        this.close();
      }
    });
    this._modal
      .querySelector(".modal__close-button")
      .addEventListener("click", this.close.bind(this));
  }
}
