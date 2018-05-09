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
      // todoWrap
      const todoWrap = document.createElement('div');
      todoWrap.classList.add('todoWrap');
      todoWrap.id = position;
      // checkbox
      const todoCheckbox = document.createElement('input');
      todoCheckbox.type = "checkbox";
      // list item itself
      const todoLi = document.createElement('li');
      todoLi.innerHTML = todo.todoText;
      todoLi.classList.add('todoItem');
      // delete button
      const todoDeleteButton = document.createElement('button');
      todoDeleteButton.classList.add('todoDeleteButton');
      todoDeleteButton.id = position;

      // put everything in the todoWrap div
      todoWrap.appendChild(todoCheckbox);
      todoWrap.appendChild(todoLi);
      todoWrap.appendChild(todoDeleteButton);

      // add todo to the unordered list
      todosUl.appendChild(todoWrap);
      
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
  console.log(e.target.id);
  // if the thing clicked has a class of 'todoDeleteButton'
  if (e.target.classList.contains('todoDeleteButton')) {
    // then loop over all of todoUl's children
    if (todosUl.childNodes.forEach(child => {
      // and check if any of their ids match the id of the target
      if (child.id === e.target.id) {
        child.remove();
      }
      return;
    }))
    return;
  }
});

// toggle item complete

// toggle all complete
