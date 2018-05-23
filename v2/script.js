class Todo {
  constructor(text, $todos) {
    this.text = text;
    this.completed = false;
    this.$todos = $todos;

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

    this.$element.addEventListener('click', this.onClick);
  }

  onClick() {
    this.$element.style.backgroundColor = 'blue';
  }
}

class TodoApp {
  constructor() {
    this.$todos = document.querySelector('#js-todos');
    this.$form = document.querySelector('#js-add-form');
    this.$input = document.querySelector('#js-add-input');
    this.todos = [];

    this.bindHandlers();
  }

  bindHandlers() {
    this.onAddSubmit = this.onAddSubmit.bind(this);

    this.$form.addEventListener('submit', this.onAddSubmit);
  }

  onAddSubmit(event) {
    event.preventDefault();

    this.todos.push(new Todo(this.$input.value, this.$todos));
  }
}

const app = new TodoApp();

console.log(app);