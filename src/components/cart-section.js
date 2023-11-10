export class CartSection {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems(productItems) {
    productItems.forEach((item) => {
      if (item.inStock || item._productInStock) {
        this._item = this._renderer(item);
        this._addItem(this._item);
      }
    });
  }

  renderOutOfStockItems(productItems) {
    productItems.forEach((item) => {
      if (!item.inStock) {
        this._item = this._renderer(item);
        this._addItem(this._item);
      }
    });
  }

  clear() {
    Array.from(this._container.getElementsByTagName("li")).forEach((item) => {
      item.remove();
    });
  }

  _addItem(card) {
    this._container.append(card);
  }
}
