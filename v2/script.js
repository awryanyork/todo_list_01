class Todo {
  constructor(text, $todos, $input) {
    this.text = text;
    this.completed = false;
    this.$todos = $todos;
    this.$input = $input;

    this.createElement();

    this.bindHandlers();
  }

  createElement() {
    this.$element = document.createElement('div');
    this.$element.innerText = this.text;
    this.$todos.appendChild(this.$element);
  }

  bindHandlers() {
    this.onClick = this.onClick.bind(this);
    this.onEnterPress = this.onEnterPress.bind(this);
    this.focusInput = this.focusInput.bind(this);

    this.$element.addEventListener('click', this.onClick);
    this.$element.addEventListener('keydown', this.onEnterPress);
  }

  onClick() {
    this.$element.contentEditable = true;
    this.$element.focus();
  }

  onEnterPress(e) {
    if (e.keyCode === 13) {
      this.focusInput();
      this.$element.value = this.$element.innerText;
    }
  }

  focusInput() {
    console.log(this);
    this.$input.focus();
  }
} // end of 'Todo' class

class TodoApp {
  constructor() {
    this.$todos = document.querySelector('#js-todos');
    this.$form = document.querySelector('#js-form');
    this.$input = document.querySelector('#js-input');
    this.todos = [];

    this.bindHandlers();
    this.focusInput();
  }

  bindHandlers() {
    this.onAddSubmit = this.onAddSubmit.bind(this);

    this.$form.addEventListener('submit', this.onAddSubmit);
  }

  focusInput() {
    this.$input.focus();
  }

  onAddSubmit(e) {
    e.preventDefault();

    this.todos.push(new Todo(this.$input.value, this.$todos, this.$input));
    this.$form.reset();
  }
} // end of 'TodoApp' class

const app = new TodoApp();
