const toggleAllButton = document.querySelector('.toggleAllButton');
const todoInput = document.querySelector('.todoInput');
const form = document.querySelector('form');
const todosUl = document.querySelector('ul');
const todos = [];


const handlers = {
  focusOnInput: function () {
    todoInput.focus();
  },
  addTodo: function (todoText) {
    todos.push({
      todoText,
      completed: false,
    });
  },
  displayTodos: (e) => {
    todosUl.innerHTML = '';

      todos.forEach((todo, position) => {
      // todoWrap
      const todoWrap = document.createElement('div');
      todoWrap.classList.add('todoWrap');
      todoWrap.id = position;
      // checkbox
      const todoCheckbox = document.createElement('input');
      todoCheckbox.type = "checkbox";
      todoCheckbox.id = position;
      // list item itself
      const todoItem = document.createElement('input');
      todoItem.type = "text";
      todoItem.value = todo.todoText;
      todoItem.classList.add('todoItem');
      // delete button
      const todoDeleteButton = document.createElement('button');
      todoDeleteButton.classList.add('todoDeleteButton');
      todoDeleteButton.id = position;

      // put everything in the todoWrap div
      todoWrap.appendChild(todoCheckbox);
      todoWrap.appendChild(todoItem);
      todoWrap.appendChild(todoDeleteButton);

      // add todo to the unordered list
      todosUl.appendChild(todoWrap);
    });
  }, // end of 'displayTodos' method
} // end of 'handlers' object

const view = {
  displayTodos: function (e) {
    e.preventDefault();
    handlers.addTodo(todoInput.value);
    handlers.displayTodos();
    form.reset();
  },
  deleteTodo: function (e) {
    const isDeleteButton = e.target.classList.contains('todoDeleteButton');
    const itemToDelete = e.target.parentNode;
  
    if (isDeleteButton && itemToDelete) { itemToDelete.remove(); }
  },
  toggleAll: function () {
    // check if every todo's completed value is false
    const allTodosAreIncomplete = todos.every(todo => todo.completed === false );
    if (allTodosAreIncomplete) {
      //then mark all todo's as completed
      todos.forEach(todo => {
        todo.completed = true;
      });
    } else {
      // otherwise mark them all as incomplete
      todos.forEach(todo => {
        todo.completed = false;
      });
    }
  } // end of 'toggleAll' method
} // end of 'view' object

// add todo to the todos array and display it's contents on the page
form.addEventListener('submit', view.displayTodos);

// delete todo
todosUl.addEventListener('click', view.deleteTodo);

// toggle all complete
toggleAllButton.addEventListener('click', view.toggleAll);

