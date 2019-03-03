const btnAddItem = document.querySelector('.todo-button');

btnAddItem.addEventListener('click', addTodoItem);
/* btnAddItem.addEventListener('keyup', (e) => {
  console.log(e);
}); */

function addTodoItem() {
  event.preventDefault();

  const inputItem = document.querySelector('.todo-input');
  const inputText = inputItem.value;
  inputItem.value = '';

  if (inputText) {
    createTodoItem(inputText);
  }
}

function createTodoItem(inputText) {
  const list = document.querySelector('.todo-list-active');

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

  remove.addEventListener('click', removeTodoItem);

  const done = document.createElement('button');
  done.classList.add('button', 'button-done');
  const doneIcon = document.createElement('span');
  doneIcon.classList.add('icon', 'icon-done');
  done.append(doneIcon);

  done.addEventListener('click', completeTodoItem);

  item.append(text, remove, done);
  list.insertBefore(item, list.childNodes[0]);  
}

function removeTodoItem() {
  const item = this.parentNode;
  item.remove();
}

function completeTodoItem() {
  const item = this.parentNode;
  const list = item.parentNode;
  const id = list.id;
  const button = this.lastChild.parentNode;  
  
  const target = (id === "todo-list-active") 
    ? document.getElementById('todo-list-completed') 
    : document.getElementById('todo-list-active');
  
  target.insertBefore(item, target.childNodes[0]);
  button.classList.toggle('button-completed');
}