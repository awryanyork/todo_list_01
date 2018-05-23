const toggleAllButton = document.querySelector('.toggleAllButton');
const displayAllButton = document.querySelector('.displayAllButton');
const displayActiveButton = document.querySelector('.displayActiveButton');
const displayCompletedButton = document.querySelector('.displayCompletedButton');
const deleteCompletedButton = document.querySelector('.deleteCompletedButton');
const todoInput = document.querySelector('.todoInput');
const form = document.querySelector('form');
const todosUl = document.querySelector('ul');
const todos = [];


const handlers = {
  focusOnInput: function () {
    todoInput.focus();
  },
  addTodo: function (todoText) {
    const maxId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    todos.push({
      id: maxId + 1,
      todoText,
      completed: false,
    });
  },
  displayTodos: () => {
    todosUl.innerHTML = '';

    todos.forEach((todo, position) => {
    // todoWrap
      const todoWrap = document.createElement('div');
      const completionState = String(todo.completed);
      todoWrap.classList.add(completionState);
      todoWrap.classList.add('todoWrap');
      todoWrap.setAttribute('data-id', todo.id);
      todoWrap.id = position;
      // checkbox
      const todoCheckbox = document.createElement('input');
      todoCheckbox.type = 'checkbox';
      todoCheckbox.id = position;
      // list item itself
      const todoItem = document.createElement('label');
      todoItem.innerHTML = todo.todoText;
      todoItem.setAttribute('contenteditable', true);
      todoItem.classList.add('editable');
      todoItem.classList.add('todoItem');
      // delete button
      const todoDeleteButton = document.createElement('button');
      todoDeleteButton.classList.add('todoDeleteButton');
      todoDeleteButton.id = position;

      // put everything in the todoWrap div
      todoWrap.appendChild(todoCheckbox);
      todoWrap.appendChild(todoItem);
      todoWrap.appendChild(todoDeleteButton);
      // add to the DOM
      todosUl.appendChild(todoWrap);
    });
  }, // end of 'displayTodos' method
  handleTodoEdits: function (e) {
    // check if the item is editable
    if (e.target.classList.contains('editable')) {
      const currentEl = e.target;
      // listen for the enter key to pressed down
      currentEl.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          // set the value of the element to be its current value
          const text = currentEl.innerHTML;
          currentEl.innerHTML = text;
          // return focus to the todo input up top
          handlers.focusOnInput();
        }
      });
    }
  }, // end of 'handleTodoEdits' method
}; // end of 'handlers' object

const view = {
  displayTodos: function (e) {
    e.preventDefault();
    handlers.addTodo(todoInput.value);
    handlers.displayTodos();
    view.handleCheckboxCheckedStatus();
    toggleAllButton.checked = false;
    // clear out the 'todoInput' value
    form.reset();
  },
  deleteTodo: function (e) {
    const isDeleteButton = e.target.classList.contains('todoDeleteButton');
    const itemToDelete = e.target.parentNode;

    if (isDeleteButton && itemToDelete) { itemToDelete.remove(); }
  }, // end of 'deleteTodo' method
  toggleAll: function () {
    const allTodosAreIncomplete = todos.every(todo => !todo.completed);
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
    }
    handlers.displayTodos();
    view.handleCheckboxCheckedStatus();

    if (displayActiveButton.classList.contains('hiding')) {
      view.displayActiveOnly();
    }
    if (displayCompletedButton.classList.contains('hiding')) {
      view.displayCompletedOnly();
    }

    handlers.focusOnInput();
  }, // end of 'toggleAll' method
  handleChecboxClick: function (e) {
    /* checks if the thing you're clicking is
    a checkbox and updates the checked property to
    match the completed status of the todo item */
    const clickedACheckbox = e.target.type === 'checkbox';
    if (clickedACheckbox) {
      const isMarkedCompleted = e.target.checked === true;
      if (isMarkedCompleted) {
        e.target.parentNode.classList.add('true');
        e.target.parentNode.classList.remove('false');
        if (displayActiveButton.classList.contains('hiding')) {
          e.target.parentNode.classList.add('hide');
        }
      } else {
        e.target.parentNode.classList.remove('true');
        e.target.parentNode.classList.add('false');
        if (displayCompletedButton.classList.contains('hiding')) {
          e.target.parentNode.classList.add('hide');
        }
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
  displayAll: function () {
    // removes styling from other view option buttons and adds it to the 'displayAllButton'
    displayCompletedButton.classList.remove('hiding');
    displayActiveButton.classList.remove('hiding');
    displayAllButton.classList.add('hiding');
    todosUl.childNodes.forEach(todo => {
      todo.classList.remove('hide');
    });    
  }, // end of 'displayAll' method
  displayActiveOnly: function () {
    // removes styling from other view option buttons and adds it to the 'displayActiveButton'
    displayCompletedButton.classList.remove('hiding');
    displayAllButton.classList.remove('hiding');
    displayActiveButton.classList.add('hiding');
    // adds class of 'hide' to the .todoWrap divs if their completed state is true
    todosUl.childNodes.forEach(todo => {
      const todoIsComplete = todo.classList.contains('true');
      if (todoIsComplete) {
        todo.classList.add('hide');
      } else {
        todo.classList.remove('hide');
      }
    });
  }, // end of 'toggleHideCompleted' method
  displayCompletedOnly: function () {
    // removes styling from other view option buttons and adds it to the 'displayActiveButton'
    displayActiveButton.classList.remove('hiding');
    displayAllButton.classList.remove('hiding');
    displayCompletedButton.classList.add('hiding');
    // adds class of 'hide' to the .todoWrap divs if their completed state is true
    todosUl.childNodes.forEach(todo => {
      let todoIsIncomplete = todo.classList.contains('false');
      if (todoIsIncomplete) {
        todo.classList.add('hide');
      } else {
        todo.classList.remove('hide');
      }
    });
  }, // end of 'displayCompletedOnly' method
  deleteCompleted: function () {
    Array.from(todosUl.childNodes).forEach((todo, i) => {
      if (todo.classList.contains('true')) {
        const todoIndex = todos.findIndex(item =>
          item.id === Number(todo.getAttribute('data-id')));
        todos.splice(todoIndex, 1);
        todo.remove();
      }
    });
    view.changeToggleAllCheckedStatus();
  }, // end of 'deleteCompleted' method
  changeToggleAllCheckedStatus: function () {
    toggleAllButton.checked = !toggleAllButton;
  }
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

// displays all todos when clicked
displayAllButton.addEventListener('click', view.displayAll);

/* hides all completed todos and updates the styling of the
 'displayActiveButton' to reflect that completed todos are being hidden */
displayActiveButton.addEventListener('click', view.displayActiveOnly);

/* hides all completed todos and updates the styling of the
 'displayActiveButton' to reflect that incomplete todos are being hidden */
displayCompletedButton.addEventListener('click', view.displayCompletedOnly);

// permanently removes any todos that are completed
deleteCompletedButton.addEventListener('click', view.deleteCompleted);

/* checks if you clicked on an editable div and puts focus back 
on the todoInput when the enter key is pressed */
todosUl.addEventListener('focus', handlers.handleTodoEdits);
todosUl.addEventListener('click', handlers.handleTodoEdits);
