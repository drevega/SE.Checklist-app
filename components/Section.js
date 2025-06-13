//Section class, 1 arg, 3 properties - distructuring**
class Section {
  constructor({ items, renderer, containerSelector }) {
    //saving these args to this obj to access in other methods**
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      const addItemElement = this._renderer(item);
      this.addItem(addItemElement);
    });
  }

  addItem(element) {
    this._items.push(element);
    this._container.appendChild(element);
    //add element to the container(this._container) **
  }
}

export default Section;
