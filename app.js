// Define UI vars
const form = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const clearTasksButton = document.getElementById('clearTasks');
const filterInput = document.getElementById('filterInput');
const taskInput = document.getElementById('taskInput');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear task event
  clearTasksButton.addEventListener('click', clearTasks);
  // Filter tasks event
  filterInput.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'box';
  // Create text node & append to li
  li.appendChild(document.createTextNode(task));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete';
  // Append link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  });
}

// Add task
function addTask(e) {
  if (taskInput.value === '') {
    alert('Add a task');
  } else {
  // Create li element
  const li = document.createElement('li');
  // Add class
  li.className = 'box';
  // Create text node & append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete';
  // Append link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  // Store in LS
  storeTaskInLocalStorage(taskInput.value);
  // Clear input
  taskInput.value = '';

  e.preventDefault();
  }
}

// Store task in LS
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task
function removeTask(e) {
  if (e.target.classList.contains('delete')) {
    if (confirm('Are you Sure?')) {
      e.target.parentElement.remove();
      // Remove from LS
      removeTaskFromLocalStorage(e.target.parentElement);
    }
  }
}

// Remove task from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  // Clear from LS
  clearTasksFromLocalStorage();
}

// Clear tasks from LS
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

// Filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.box').forEach(function(task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });
}