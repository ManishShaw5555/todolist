// script.js

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") return;
    
    let taskList = document.getElementById("taskList");
    let li = document.createElement("li");
    li.innerHTML = `${taskText} <button class='delete-btn' onclick='deleteTask(this)'>X</button>`;
    li.addEventListener("click", () => li.classList.toggle("completed"));
    taskList.appendChild(li);
    
    saveTasks();
    taskInput.value = "";
}

function deleteTask(button) {
    button.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({ text: li.textContent.slice(0, -2), completed: li.classList.contains("completed") });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskList = document.getElementById("taskList");
    tasks.forEach(task => {
        let li = document.createElement("li");
        li.textContent = task.text;
        if (task.completed) li.classList.add("completed");
        li.innerHTML += " <button class='delete-btn' onclick='deleteTask(this)'>X</button>";
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
            saveTasks();
        });
        taskList.appendChild(li);
    });
}
