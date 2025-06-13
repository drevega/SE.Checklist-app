class TodoCounter {
  // todos should be the array of initial todos
  // selector is the selector for the counter text element**
  constructor(todos, selector) {
    this._element = document.querySelector(selector);
    this._completed = 0;
    this._total = todos.length;
    this._completed = todos.filter((todo) => todo.completed).length;
    this._updateText();
  }

  // Call this when a checkbox is clicked, and when a completed
  // to-do is deleted.**
  updateCompleted = (increment) => {
    this._completed += increment ? 1 : -1;
    this._updateText();
  };

  // Call this when a to-do is deleted, or when a to-do is
  // created via the form.**
  updateTotal = (increment) => {
    this._total += increment ? 1 : -1;
    this._updateText();
  };

  // Call the method to update the text content
  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
