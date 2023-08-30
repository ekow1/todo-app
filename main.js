// DOM ELEMENTS
const form = document.querySelector('#todo-form');
const todoContainer = document.querySelector('.todo-wrapper');
const todoList = document.querySelector('.todo-items');
const todoInput = document.querySelector('#todo-input');
const todoAdd = document.querySelector('.check-mark');
const remainingTask = document.querySelector('.remaining');
const completedTask = document.querySelector('.completed');
const totalTask = document.querySelector('.total');
const statusAll = document.querySelector('.status-all');
const statusCompleted = document.querySelector('.status-completed');
const statusIncomplete = document.querySelector('.status-incomplete');

// Initialize the local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render the local storage
if (localStorage.getItem('tasks')) {
  tasks.map(tasks => createTask(tasks));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  let inputValue = todoInput.value;

  if (inputValue === '') {
    return;
  }
  const task = {
    id: new Date().getTime(),
    name: inputValue,
    isComplete: false,
  };

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));

  createTask(task);
  form.reset();
  todoInput.focus();
});

function createTask(task) {
  const taskEl = document.createElement('div');
  taskEl.classList.add('todo-item');

  taskEl.setAttribute('id', task.id);

  if (task.isComplete) {
    taskEl.classList.add('check-complete');
  }

  const taskMarkup = `
    <div class="check-task">
      <input type="checkbox" name="" id="${task.id}" ${task.isComplete ? 'checked' : ''}>
      <div class="todo-text ${task.isComplete ? 'complete' : ''}" ${!task.isComplete ? 'contenteditable' : ''}>
        <p>${task.name}</p>
      </div>
    </div>
    <button class="close">
      <img src="/image/close.svg" alt="" srcset="">
    </button>
  `;

  taskEl.innerHTML = taskMarkup;
  todoList.appendChild(taskEl);

  // Add event listener to the delete button
  const deleteButton = taskEl.querySelector('.close');
  deleteButton.addEventListener('click', () => deleteTask(task.id));

  // Add event listener to the checkbox and contenteditable elements
  const checkbox = taskEl.querySelector('input[type="checkbox"]');
  checkbox.addEventListener('change', () => {
    toggleTaskCompletion(task.id);
    updateCompletedCount();
  });

  const todoText = taskEl.querySelector('.todo-text');
  todoText.addEventListener('input', () => updateTask(task.id, todoText));

  countTask();
}

function countTask() {
  const taskCompleted = tasks.filter(task => task.isComplete === true);

  totalTask.textContent = tasks.length;
  completedTask.textContent = taskCompleted.length;
  remainingTask.textContent = tasks.length - taskCompleted.length;
}

function updateCompletedCount() {
  const taskCompleted = tasks.filter(task => task.isComplete === true);
  completedTask.textContent = taskCompleted.length;
}

function deleteTask(taskId) {
  // Remove the task from the tasks array
  tasks = tasks.filter(task => task.id !== taskId);

  // Update the tasks in local storage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Remove the task from the DOM
  const taskElement = document.getElementById(taskId);
  taskElement.remove();

  // Recalculate the task counts
  countTask();
}

function toggleTaskCompletion(taskId) {
  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex !== -1) {
    tasks[taskIndex].isComplete = !tasks[taskIndex].isComplete;

    // Update the tasks in local storage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Update the task's visual appearance
    const taskElement = document.getElementById(taskId);
    const checkbox = taskElement.querySelector('input[type="checkbox"]');
    const todoText = taskElement.querySelector('.todo-text');

    if (checkbox.checked) {
      taskElement.classList.add('check-complete');
      todoText.removeAttribute('contenteditable');
    } else {
      taskElement.classList.remove('check-complete');
      todoText.setAttribute('contenteditable', '');
    }

    // Recalculate the task counts
    countTask();
  }
}

statusAll.addEventListener('click', () => {
  displayAllTasks();
});

statusCompleted.addEventListener('click', () => {
  displayCompletedTasks();
});

statusIncomplete.addEventListener('click', () => {
  displayIncompleteTasks();
});

function displayAllTasks() {
  const allTaskItems = todoList.querySelectorAll('.todo-item');
  allTaskItems.forEach(item => {
    item.style.display = 'flex';
  });
}

function displayCompletedTasks() {
  const completedTaskItems = todoList.querySelectorAll('.check-complete');
  const incompleteTaskItems = todoList.querySelectorAll('.todo-item:not(.check-complete)');
  completedTaskItems.forEach(item => {
    item.style.display = 'flex';
  });
  incompleteTaskItems.forEach(item => {
    item.style.display = 'none';
  });
}

function displayIncompleteTasks() {
  const incompleteTaskItems = todoList.querySelectorAll('.todo-item:not(.check-complete)');
  const completedTaskItems = todoList.querySelectorAll('.check-complete');
  incompleteTaskItems.forEach(item => {
    item.style.display = 'flex';
  });
  completedTaskItems.forEach(item => {
    item.style.display = 'none';
  });
}

// Count the initial task status
countTask();
