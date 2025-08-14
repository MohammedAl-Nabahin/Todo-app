//Dom Elements
const form = document.querySelector("form");
const taskInput = document.querySelector("input");
const tasksList = document.querySelector(".tasks-list");
const toast = document.querySelector(".toast");
const placeholderTask = document.getElementById("placeholder-task");

taskInput.focus();

//Events
form.addEventListener("submit", handleAddTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") handleAddTask();
});

tasksList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;

  if (e.target.classList.contains("complete-task")) {
    li.classList.toggle("completed");
  }

  if (e.target.classList.contains("delete-task")) {
    li.remove();
    showToast("Task Deleted");
  }
});

function handleAddTask(e) {
  e.preventDefault();

  const taskData = getTaskInput();
  if (!taskData) return;
  removePlaceholderTask();

  const newTask = createTaskElement(taskData);
  tasksList.append(newTask);

  showToast("Task added successfully");
  resetTaskInput();
}

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}

function getTaskInput() {
  return taskInput.value.trim();
}

function removePlaceholderTask() {
  if (placeholderTask) placeholderTask.remove();
}

function createTaskElement(taskText) {
  const li = document.createElement("li");

  const checkbox = createCheckbox();
  const textSpan = addTaskText(taskText, checkbox);
  const deleteButton = createDeleteButton();

  li.append(textSpan, deleteButton);
  return li;
}

function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
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
