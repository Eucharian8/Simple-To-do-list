document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const taskCounter = document.getElementById("counter");
  
    addTaskBtn.addEventListener("click", addTask);
  
    function addTask() {
      const taskText = taskInput.value.trim();
      
      if (taskText === "") return;
  
      const newTask = document.createElement("li");
      newTask.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
      `;
  
      newTask.querySelector(".delete-btn").addEventListener("click", deleteTask);
      taskList.appendChild(newTask);
  
      updateTaskCounter();
      taskInput.value = "";
    }
  
    function deleteTask(event) {
      const taskItem = event.target.closest("li");
      taskItem.remove();
      updateTaskCounter();
    }
  
    function updateTaskCounter() {
      const totalTasks = document.querySelectorAll("#taskList li").length;
      const completedTasks = document.querySelectorAll("#taskList li.completed").length;
      const remainingTasks = totalTasks - completedTasks;
      taskCounter.textContent = `Tasks left: ${remainingTasks}`;
    }
  });
  