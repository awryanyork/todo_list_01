const toggleAllButton = document.querySelector('.toggleAllButton');
const displayActiveButton = document.querySelector('.displayActiveButton');
const displayCompletedButton = document.querySelector('.displayCompletedButton');
const todoInput = document.querySelector('.todoInput');
const form = document.querySelector('form');
const todosUl = document.querySelector('ul');
const warningWrap = document.querySelector('.warningWrap');
const warningEl = document.createElement('p');
warningEl.classList.add('warningEl');
const createWarning = function (warningType) {
  warningWrap.innerHTML = '';
  warningEl.innerHTML = `you do not have any ${warningType} todos`;
  warningWrap.appendChild(warningEl);
}
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
      const completedAreHidden = displayActiveButton.classList.contains('hiding');

      if (todoIsCompleted && completedAreHidden) {
        todoWrap.classList.add('hide');
      } else {
        todoWrap.classList.remove('hide');
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
    let allTodosAreIncomplete = todos.every(todo => todo.completed === false );
    if (allTodosAreIncomplete) {
      // then mark all todo's as completed
      todos.forEach(todo => {
        todo.completed = true;
      });
      warningWrap.innerHTML = '';
      if (displayActiveButton.classList.contains('hiding')) {
        view.displayActiveOnly();
      }
    } else {
      // otherwise mark them all as incomplete
      todos.forEach(todo => {
        todo.completed = false;
        warningWrap.innerHTML = '';
        if (displayCompletedButton.classList.contains('hiding')) {
          view.displayCompletedOnly();
        }
      });
    }

    if (allTodosAreIncomplete) {
      if (displayActiveButton.classList.contains('hiding')) {
        warningWrap.remove();
        view.displayActiveOnly();
      } else if (displayCompletedButton.classList.contains('hiding')) {
        warningWrap.remove();
        view.displayCompletedOnly();
      }
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
  displayActiveOnly: function () {
    displayCompletedButton.classList.remove('hiding');
    displayActiveButton.classList.add('hiding');
    // add class of 'hide' to .todoWrap divs if their completed state is true
    todosUl.childNodes.forEach(todo => {
      const todoIsComplete = todo.classList.contains('true');
      if (todoIsComplete) {
        todo.classList.add('hide');
      } else {
        todo.classList.remove('hide');
      }
    });
    /* checks if at least on todo is hidden 
    and applies styling to the 'active' button to 
    signify that only the active todos are being shown */
    let todoDivsArray = Array.from(todosUl.childNodes);
    let allTodosHidden = todoDivsArray.every(todo => {
      return todo.classList.contains('hide');
    });
    if (allTodosHidden) {
      createWarning('active');
    } else {
      warningWrap.remove();
    }
  }, // end of 'toggleHideCompleted' method
  displayCompletedOnly: function () {
    displayActiveButton.classList.remove('hiding');
    displayCompletedButton.classList.add('hiding');
    todosUl.childNodes.forEach(todo => {
      const todoIsIncomplete = todo.classList.contains('false');
      if (todoIsIncomplete) {
        todo.classList.add('hide');
      } else {
        todo.classList.remove('hide');
      }
    });
    let todoDivsArray = Array.from(todosUl.childNodes);
    let allTodosHidden = todoDivsArray.every(todo => {
      return todo.classList.contains('hide');
    });
    if (allTodosHidden) {
      createWarning('completed');
    } else {
      const warningEl = document.querySelector('.warningEl');
      warningEl.remove();
    }
      

  } // end of 'displayCompletedOnly' method
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
 'displayActiveButton' to reflect that todos are being hidding */
displayActiveButton.addEventListener('click', view.displayActiveOnly);

displayCompletedButton.addEventListener('click', view.displayCompletedOnly);
