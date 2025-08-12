//Dom Elements
const addButton = document.getElementById("add-button");
const taskInput = document.querySelector("input");
const tasksList = document.querySelector(".tasks-list");
const toast = document.querySelector(".toast");
const placeholderTask = document.getElementById("placeholder-task");

taskInput.focus();

//Events
addButton.addEventListener("click", handleAddTask);
taskInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") handleAddTask();
});

// Event delegation, Bubbling
tasksList.addEventListener("click", (e) => {
  // Gets the parent of the clicked element
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

// Add task and dom manipulation functionality
function handleAddTask() {
  const taskData = taskInput.value.trim();
  if (!taskData) return null;

  if (placeholderTask) placeholderTask.remove();

  const newTask = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("complete-task");

  // span element to wrap task data and checkbox together
  const span = document.createElement("span");
  span.textContent = taskData;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-task");

  span.append(checkbox);
  newTask.append(span, deleteButton);
  tasksList.append(newTask);

  showToast("Task Added successfully");

  taskInput.value = "";
  taskInput.focus();
}

function showToast(message) {
  toast.textContent = message;
  toast.style.display = "block";
  setTimeout(() => {
    toast.style.display = "none";
  }, 2000);
}
