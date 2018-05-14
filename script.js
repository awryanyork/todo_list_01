const toggleAllButton = document.querySelector('.toggleAllButton');
const hideCompletedButton = document.querySelector('.hideCompletedButton');
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
      let CompletionState = String(todo.completed);
      todoWrap.classList.add(CompletionState);
      todoWrap.classList.add('todoWrap');
      todoWrap.id = position;
      // checkbox
      const todoCheckbox = document.createElement('input');
      todoCheckbox.type = 'checkbox';
      todoCheckbox.id = position;
      // list item itself
      const todoItem = document.createElement('input');
      todoItem.type = 'text';
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

      const todoIsCompleted = todoWrap.classList.contains('true');
      const completedAreHidden = hideCompletedButton.classList.contains('hiding');

      if (todoIsCompleted && completedAreHidden) {
        todoWrap.classList.add('hide');
      }


      // add todo to the unordered list
      todosUl.appendChild(todoWrap);
    });
  }, // end of 'displayTodos' method
}; // end of 'handlers' object

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
      // then mark all todo's as completed
      todos.forEach(todo => {
        todo.completed = true;
      });
    } else {
      // otherwise mark them all as incomplete
      todos.forEach(todo => {
        todo.completed = false;
      });
      // take away styling indicating at least one completed todo is being hidden
      hideCompletedButton.classList.remove('hiding');
    }

    handlers.displayTodos();
    view.handleCheckboxCheckedStatus();
  }, // end of 'toggleAll' method
  handleChecboxClick: function (e) {
    const clickedACheckbox = e.target.type === 'checkbox';
    if (clickedACheckbox) {
      const isMarkedCompleted = e.target.checked === true;
      if (isMarkedCompleted) {
        e.target.parentNode.classList.add('true');
        e.target.parentNode.classList.remove('false');
      } else {
        e.target.parentNode.classList.remove('true');
        e.target.parentNode.classList.add('false');
      }
    }
  }, // end of 'handleChecked' method
  handleCheckboxCheckedStatus: function () {
    /* this makes a checkbox checked if the todo is marked 
       complete by an action besides clicking the 
       checkbox (e.g. using the 'toggleAll' button) */
    const todosNodeList = document.querySelectorAll('.todoWrap');
    todosNodeList.forEach(node => {
      if (node.classList.contains('true')) {
        node.firstChild.checked = true;
      } else {
        node.firstChild.checked = false;
      }
    });
  }, // end of 'handleCheckboxCheckedStatus' method
  toggleHideCompleted: function () {
    todosUl.childNodes.forEach(todo => {
      const todoIsCompleted = todo.classList.contains('true');
      if (todoIsCompleted) {
        todo.classList.toggle('hide');
      }
    });
    const todoDivsArray = Array.from(todosUl.childNodes);
    const atLeastOneTodoHidden = todoDivsArray.some(todo => {
      return todo.classList.contains('hide');
    });
    if (atLeastOneTodoHidden) {
      hideCompletedButton.classList.add('hiding');
    } else {
      hideCompletedButton.classList.remove('hiding');
    }
  } // end of 'toggleHideCompleted' method
}; // end of 'view' object

// displays all the todos in the 'todos' array on the page
form.addEventListener('submit', view.displayTodos);

// permantly deletes a todo
todosUl.addEventListener('click', view.deleteTodo);

// toggles all todos either complete or incomplete
// also handles the case of someone marking a todo complete/incomplete via the 'toggleAll' button
toggleAllButton.addEventListener('click', view.toggleAll);

// handles the case of someone marking a todo complete/incomplete via the checkbox
todosUl.addEventListener('click', view.handleChecboxClick);

/* hides all completed todos and updates the styling of the
 'hideCompletedButton' to reflect that todos are being hidding */
hideCompletedButton.addEventListener('click', view.toggleHideCompleted);

