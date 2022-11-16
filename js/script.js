let todoList = document.querySelector('.todoList');
let taskInput = document.querySelector('.inputField input');
let addButton = document.querySelector('.inputField button');
let clearAllButton = document.querySelector('footer button');
let pendingTasks = document.querySelector('.pendingTasks');

let tasks = [];

init();

async function init() {
  addTaskToList('Organizar a mesa de trabalho', 1);
  addTaskToList('Lavar a louça', 2);
  addTaskToList('Enviar e-mail para os clientes', 3, true);
}

addButton.onclick = () => {
  if (taskInput.value !== '') {
    addTaskToList(taskInput.value);
    taskInput.value = '';
  }
}

function addTaskToList(taskText, id = Date.now(), done = false) {
  const task = {
    id: id,
    text: taskText,
    done: done,
  };
  
  tasks.push(task);
  addTaskToPage(task);
}

function addTaskToPage(task) {
  let li = document.createElement('li');
  if (task.done) li.className = 'done';
  li.setAttribute('data-id', task.id);
  li.innerHTML = `${task.text}<span class="remove icon"><i class="fas fa-trash"></i></span>`;
  todoList.appendChild(li);
  pendingTasks.innerText = tasks.filter(t => !t.done).length;
}

todoList.onclick = (e) => {
  if (e.target.classList.contains('remove') ||
    e.target.classList.contains('fa-trash')) {
    let id;

    if (e.target.classList.contains('remove')) {
      id = e.target.parentElement.getAttribute('data-id');
      e.target.parentElement.remove();
    }
    else {
      id = e.target.parentElement.parentElement.getAttribute('data-id');
      e.target.parentElement.parentElement.remove();
    }

    tasks = tasks.filter(t => t.id != id);
    pendingTasks.innerText = tasks.filter(t => !t.done).length;
  }
  else if (e.target.nodeName === 'LI'){
    e.target.classList.toggle('done');

    const id = e.target.getAttribute('data-id');
    const task = tasks.find(t => t.id == id);
    task.done = !task.done;
    
    pendingTasks.innerText = tasks.filter(t => !t.done).length;
  }
};

clearAllButton.onclick = () => {
  todoList.innerHTML = '';
  tasks = [];
  pendingTasks.innerText = '0';
}