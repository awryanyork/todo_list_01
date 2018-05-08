const form = document.querySelector('form');
const todoInput = document.querySelector('.todoInput');
const todosUl = document.querySelector('ul');

const todoList = {
  todos: [],
  addTodo: function (todoText) {
    todoList.todos.push({
      todoText,
      completed: false,
    });
  }
};

const view = {
  displayTodos: () => {
    todosUl.innerHTML = '';

    todoList.todos.forEach((todo, position) => {
      const todoLi = document.createElement('li');
      todoLi.innerHTML = todo.todoText;
      todoLi.classList.add('todoItem');
      todoLi.id = position;
      todosUl.appendChild(todoLi);
    });
  }
};

// add todo to the todos array and display it's contents on the page
form.addEventListener('submit', function (e) {
  e.preventDefault();
  todoList.addTodo(todoInput.value);
  view.displayTodos();
  form.reset();
});

// delete todo
todosUl.addEventListener('click', function (e) {
  e.target.remove();
});

// toggle item complete
// toggle all complete
