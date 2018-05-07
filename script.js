const todoListWrap = document.querySelector('.todoListWrap');

const todoList = {
  todos: [],
  addTodo: function (todoText) {
    this.todos.push({
      todoText,
      completed: false,
    });
  },
};

const view = {
  displayTodos: () => {
    const todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    todoList.todos.forEach((todo, position) => {
      const todoLi = document.createElement('li');
      todoLi.innerHTML = todo.todoText;
      todoLi.classList.add('todoItem');
      todoLi.id = position;
      todosUl.appendChild(todoLi);
    });
  },
};
