// Wait for the DOM to fully load before running the script
document.addEventListener("DOMContentLoaded", function () {
  // Select DOM elements
  const addButton = document.getElementById("add-task-btn");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  // Load tasks from Local Storage when page loads
  function loadTasks() {
    // Retrieve tasks from Local Storage or initialize empty array
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    // Create DOM elements for each stored task
    storedTasks.forEach((taskText) => {
      addTask(taskText, false); // false = don't save to storage again
    });
  }

  // Function to add a new task
  // save parameter controls whether to save to Local Storage
  function addTask(taskText, save = true) {
    // If taskText is not provided, get it from input field
    if (save) {
      taskText = taskInput.value.trim();

      // Check if the input is empty
      if (taskText === "") {
        alert("Please enter a task.");
        return;
      }
    }

    // Create a new list item element
    const li = document.createElement("li");
    li.textContent = taskText;

    // Create a remove button
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("remove-btn");

    // Assign onclick event to remove the task
    removeButton.onclick = function () {
      // Remove from DOM
      taskList.removeChild(li);

      // Remove from Local Storage
      removeTaskFromStorage(taskText);
    };

    // Append the remove button to the list item
    li.appendChild(removeButton);

    // Append the list item to the task list
    taskList.appendChild(li);

    // Save to Local Storage if this is a new task
    if (save) {
      saveTaskToStorage(taskText);

      // Clear the input field
      taskInput.value = "";
    }
  }

  // Function to save a task to Local Storage
  function saveTaskToStorage(taskText) {
    // Get existing tasks from Local Storage
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    // Add new task to array
    storedTasks.push(taskText);

    // Save updated array back to Local Storage
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  // Function to remove a task from Local Storage
  function removeTaskFromStorage(taskText) {
    // Get existing tasks from Local Storage
    let storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");

    // Filter out the task to be removed
    storedTasks = storedTasks.filter((task) => task !== taskText);

    // Save updated array back to Local Storage
    localStorage.setItem("tasks", JSON.stringify(storedTasks));
  }

  // Load existing tasks when page loads
  loadTasks();

  // Add event listener to the "Add Task" button
  addButton.addEventListener("click", function () {
    addTask(null, true);
  });

  // Add event listener to allow adding tasks with the "Enter" key
  taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      addTask(null, true);
    }
  });
});
