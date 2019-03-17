const btnAddItem = document.querySelector('.todo-button');

// Checks for localStorage todo list data and render this
let data = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
  active: [],
  completed: []
};
dataRender();

// Click event on the button, then take the value from input and do function
btnAddItem.addEventListener('click', () => {
  // Disable page reload on the click at button
  event.preventDefault();

  const inputItem = document.querySelector('.todo-input');
  const inputText = inputItem.value;
  inputItem.value = '';

  // Add new data to array
  if (inputText) {
    createTodoItem(inputText);
    data.active.push(inputText);
    dataUpdate();
  }
});

// Creating the new DOM item in the todo list
function createTodoItem(inputText, completed) {
  const list = (completed) ? document.querySelector('.todo-list-completed') : document.querySelector('.todo-list-active');

  const item = document.createElement('li');
  item.classList.add('todo-item');

  const text = document.createElement('span');
  text.classList.add('todo-text');
  text.innerText = inputText;

  const remove = document.createElement('button');
  remove.classList.add('button', 'button-remove');
  const removeIcon = document.createElement('span');
  removeIcon.classList.add('icon', 'icon-bin');
  remove.append(removeIcon);

  // Click event for the "remove button"
  remove.addEventListener('click', removeTodoItem);

  const done = document.createElement('button');
  done.classList.add('button', 'button-done');
  const doneIcon = document.createElement('span');
  doneIcon.classList.add('icon', 'icon-done');
  done.append(doneIcon);
  if (completed) {
    done.classList.toggle('button-completed');
  }

  // Click event for the "done button"
  done.addEventListener('click', completeTodoItem);

  item.append(text, remove, done);
  list.insertBefore(item, list.childNodes[0]);

  // Double click event on all todo items
  const items = document.querySelectorAll('.todo-item');
  items.forEach(item => item.addEventListener('dblclick', renameTodoList));
}

function renameTodoList() {
  const list = this.parentNode;
  const id = list.id;
  const itemText = this.querySelector('.todo-text');
  const input = document.createElement('input');
  
  // Remove span, add input
  input.setAttribute('placeholder', itemText.textContent);
  input.classList.add('todo-text_rename');
  this.classList.add('todo-item_active');
  itemText.remove();
  this.insertBefore(input, this.childNodes[0]);

  input.addEventListener('change', () => {
    // Remove input, add span with input text
    prevText = itemText.textContent;
    itemText.textContent = input.value;
    this.insertBefore(itemText, this.childNodes[0]);
    input.remove();
    this.classList.remove('todo-item_active');

    // Change data on the change event
    if (id === 'todo-list-active') {
      data.active.splice(data.active.indexOf(prevText), 1, itemText.textContent);
    } else {
      data.completed.splice(data.completed.indexOf(prevText), 1, itemText.textContent);
    }
    dataUpdate();
  });
}

function removeTodoItem() {
  const item = this.parentNode;
  const list = item.parentNode;
  const id = list.id;
  const text = item.firstChild.innerText;
  item.remove();

  // Remove data from array
  if (id === 'todo-list-active') {
    data.active.splice(data.active.indexOf(text), 1);
  } else {
    data.completed.splice(data.completed.indexOf(text), 1);
  } 
  dataUpdate();
}

function completeTodoItem() {
  const item = this.parentNode;
  const list = item.parentNode;
  const id = list.id;
  const button = this.lastChild.parentNode;
  const text = item.firstChild.innerText;
  
  // Does item is completed or active, target to another todo list
  const target = (id === 'todo-list-active') 
    ? document.getElementById('todo-list-completed') 
    : document.getElementById('todo-list-active');
  
  // Insert item to the another todo list
  target.insertBefore(item, target.childNodes[0]);
  button.classList.toggle('button-completed');

  // Change data array
  if (id === 'todo-list-active') {
    data.active.splice(data.active.indexOf(text), 1);
    data.completed.push(text);
  } else {
    data.completed.splice(data.completed.indexOf(text), 1);
    data.active.push(text);
  }
  dataUpdate();
}

// Add data to Local Storage
function dataUpdate() {
  localStorage.setItem('todoList', JSON.stringify(data));  
}

function dataRender() {
  // If data empty => break render
  if (!data.active.length && !data.completed.length) return;

  // Add saved data to the correct todo list 
  for (let i = 0; i < data.active.length; i++) {
    let inputText = data.active[i];
    createTodoItem(inputText);
  }
  for (let i = 0; i < data.completed.length; i++) {
    let inputText = data.completed[i];
    createTodoItem(inputText, true);
  }
}

