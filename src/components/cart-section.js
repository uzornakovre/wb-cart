export class CartSection {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(productItems) {
    productItems.forEach((item) => {
      if (item.count) {
        this._item = this._renderer(item);
        this._addItem(this._item);
      }
    });
  }

  renderOutOfStockItems(productItems) {
    productItems.forEach((item) => {
      if (!item.count) {
        this._item = this._renderer(item);
        this._addItem(this._item);
      }
    });
  }

  _addItem(card) {
    this._container.append(card);
  }
}
