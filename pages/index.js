import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = document.forms["add-todo-form"];
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

    //this creates and adds a new todo**
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    // move code from existing submittion handler to here **
    const name = inputValues.name;
    const dateInput = inputValues.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo); //this line adds to container  line 17 in Sections.js**
    // use addItem method instead of todosList.append(todo);**

    addTodoPopup.close();

    newTodoValidator.resetFields();
    todoCounter.updateTotal(true);
  },
});

addTodoPopup.setEventListeners();

//Section class, 1 arg, 3 properties **
const section = new Section({
  items: initialTodos, //pass initial todo's**
  renderer: (item) => {
    return generateTodo(item);
  },
  containerSelector: ".todos__list",
});

function handleCheck(completed) {
  todoCounter.updateCompleted(completed);
}

    //this removes a todo from the DOM**
function handleDelete(completed) {
  if (completed) {
    todoCounter.updateCompleted(false);
  }
    todoCounter.updateTotal(false);

}

const generateTodo = (data) => {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  const todoElement = todo.getView();

  return todoElement;
};

section.renderItems();

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
