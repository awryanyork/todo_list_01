const form = document.querySelector('form');
const todoInput = document.querySelector('.todoInput');
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
  displayTodos: () => {
    todosUl.innerHTML = '';

      todos.forEach((todo, position) => {
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
  }, // end of 'displayTodos' method
} // end of 'handlers' object

const view = {
  displayTodos: function () {
    handlers.addTodo(todoInput.value);
    handlers.displayTodos();
    form.reset();
  },


  //  WHY IS UNDEFINED 'E' UNDEFINED IN THIS METHOD WHEN USED AS A CALLBACK, EVEN IF I ADD 'E' AS A PARAMETER TO THE METHOD'S FUNCTION
  // deleteTodo: function () {
  //   const isDeleteButton = e.target.classList.contains('todoDeleteButton');
  //   const todoHasMatchingId = todosUl.childNodes.forEach(child => {
  //    return (child.id === e.target.id);
  //   });

  //   if (isDeleteButton && todoHasMatchingId) { child.remove(); }
  // }// end of 'deleteTodo' method


} // end of 'view' object

// add todo to the todos array and display it's contents on the page
form.addEventListener('submit', function (e) {
  e.preventDefault();
  view.displayTodos();
});

// delete todo
todosUl.addEventListener('click', function (e) {
  const itemToDelete = e.target.parentNode;
  const isDeleteButton = e.target.classList.contains('todoDeleteButton');
  const todoHasMatchingId = function () {
    if (todosUl.childNodes.forEach(child => {
      return (child.id === e.target.id);
    })) { return true; };
  }

  if (isDeleteButton && todoHasMatchingId) { itemToDelete.remove(); }
});

// toggle item complete

// toggle all complete
