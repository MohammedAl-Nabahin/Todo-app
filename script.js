//Dom Elements
const form = document.querySelector("form");
const taskInput = document.querySelector("input");
const tasksList = document.querySelector(".tasks-list");
const toast = document.querySelector(".toast");
const placeholderTask = document.getElementById("placeholder-task");

const TASKS_LIST_KEY = "todos";

taskInput.focus();

//Events
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

form.addEventListener("submit", handleAddTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") handleAddTask(event);
});

tasksList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target.classList.contains("complete-task")) {
    li.classList.toggle("completed");
    completeTasksInLocalStorage(
      li.dataset.id,
      li.classList.contains("completed")
    );
  }

  if (e.target.classList.contains("delete-task")) {
    li.remove();
    deleteFromLocalStorage(li.dataset.id);
    showToast("Task Deleted successfully");
    checkAndShowPlaceholder();
  }
});

function handleAddTask(e) {
  e.preventDefault();

  const taskData = getTaskInput();
  if (!taskData) return;
  removePlaceholderTask();

  const id = Math.random().toFixed(5) + taskData.slice(3, 8);
  const newTask = createTaskElement(id, taskData);
  tasksList.append(newTask);

  saveToLocalStorage({ id, text: taskData });

  showToast("Task added successfully");
  resetTaskInput();
}

function getTaskInput() {
  return taskInput.value.trim();
}

function removePlaceholderTask() {
  if (placeholderTask) placeholderTask.remove();
}

function createTaskElement(id, taskText, completed = false) {
  const li = document.createElement("li");
  li.dataset.id = id;
  if (completed) li.classList.add("completed");

  const checkbox = createCheckbox();
  checkbox.checked = completed;
  const textSpan = addTaskText(taskText, checkbox);
  const deleteButton = createDeleteButton();

  li.append(textSpan, deleteButton);
  return li;
}

function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.name = "task-status";
  checkbox.classList.add("complete-task");
  return checkbox;
}

function addTaskText(text, checkbox) {
  const span = document.createElement("span");
  span.textContent = text;
  span.append(checkbox);
  return span;
}

function createDeleteButton() {
  const button = document.createElement("button");
  button.textContent = "Delete";
  button.classList.add("delete-task");
  return button;
}

function resetTaskInput() {
  taskInput.value = "";
  taskInput.focus();
}

function checkAndShowPlaceholder() {
  if (tasksList.children.length === 0) {
    const placeholder = document.createElement("li");
    placeholder.id = "placeholder-task";
    placeholder.textContent = "No Tasks Yet!";
    tasksList.append(placeholder);
  }
}

//localStorage
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem(TASKS_LIST_KEY)) || [];
}

function setTasksToLocalStorage(tasks) {
  localStorage.setItem(TASKS_LIST_KEY, JSON.stringify(tasks));
}

function saveToLocalStorage({ id, text, completed = false }) {
  const tasks = getTasksFromLocalStorage();
  tasks.push({ id, text, completed });
  setTasksToLocalStorage(tasks);
}

function deleteFromLocalStorage(id) {
  const tasks = getTasksFromLocalStorage();
  const filteredTasks = tasks.filter((task) => task.id !== id);
  setTasksToLocalStorage(filteredTasks);
}

function completeTasksInLocalStorage(id, completed) {
  const tasks = getTasksFromLocalStorage();
  const completedTask = tasks.find((task) => task.id === id);
  if (completedTask) completedTask.completed = completed;
  setTasksToLocalStorage(tasks);
}

function loadTasksFromLocalStorage() {
  const tasks = getTasksFromLocalStorage();
  if (tasks.length === 0) return;
  removePlaceholderTask();
  const elements = tasks.map((item) =>
    createTaskElement(item.id, item.text, item.completed)
  );
  tasksList.append(...elements);
}

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}
