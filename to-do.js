document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const taskCounter = document.getElementById("counter");

    // Load tasks from local storage on page load
    loadTasksFromStorage();
  
    addTaskBtn.addEventListener("click", addTask);
  
    function addTask() {
      const taskText = taskInput.value.trim();
      
      if (taskText === "") return;
  
      const newTask = document.createElement("li");
      newTask.innerHTML = `
      <input type="checkbox">
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
      `;
  
      const checkbox = newTask.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", toggleTaskCompletion);

      newTask.querySelector(".delete-btn").addEventListener("click", deleteTask);
      taskList.appendChild(newTask);

      saveTaskToStorage(taskText); // Save the new task to local storage
      updateTaskCounter();
      taskInput.value = "";
    }
  
    function deleteTask(event) {
      const taskItem = event.target.closest("li");
      taskItem.remove();
      removeTaskFromStorage(taskItem.querySelector("span").textContent);
      updateTaskCounter();
    }

    function toggleTaskCompletion(event) {
        const checkbox = event.target;
        const taskItem = checkbox.closest("li");
    
        if (checkbox.checked) {
          taskItem.classList.add("completed");
        } else {
          taskItem.classList.remove("completed");
        }

        updateTaskCounter();
  }
  
    function updateTaskCounter() {
      const totalTasks = document.querySelectorAll("#taskList li").length;
      const completedTasks = document.querySelectorAll("#taskList li.completed").length;
      const remainingTasks = totalTasks - completedTasks;
      taskCounter.textContent = `Tasks left: ${remainingTasks}`;
    }

    function saveTaskToStorage(taskText) {
        // Retrieve existing tasks from local storage or initialize an empty array
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
    
        // Save the updated tasks array to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    
      function removeTaskFromStorage(taskText) {
        // Retrieve existing tasks from local storage or initialize an empty array
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
        // Remove the taskText from the tasks array
        const index = tasks.indexOf(taskText);
        if (index !== -1) {
          tasks.splice(index, 1);
        }
    
        // Save the updated tasks array to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
      }
    
      function loadTasksFromStorage() {
        // Retrieve tasks from local storage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    
        // Populate the task list with tasks from local storage
        tasks.forEach(taskText => {
          const newTask = document.createElement("li");
          newTask.innerHTML = `
            <input type="checkbox">
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
          `;
    
          const checkbox = newTask.querySelector("input[type='checkbox']");
          checkbox.addEventListener("change", toggleTaskCompletion);
    
          newTask.querySelector(".delete-btn").addEventListener("click", deleteTask);
          taskList.appendChild(newTask);
        });
    
        updateTaskCounter();
    }
  });
  