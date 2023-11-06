export class ModalSection {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._item = this._renderer(item);
      this._addItem(this._item);
    });
  }

  _addItem(item) {
    this._container.append(item);
  }
}
