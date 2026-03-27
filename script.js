let addBtn = document.getElementById("addBtn");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");

let tasks = [];

// ✅ Save Tasks
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ✅ Load Tasks
function loadTasks() {
    let storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = storedTasks;

    tasks.forEach(task => {
        createTask(task);
    });
}
loadTasks();

// ✅ Create Task Element (MAIN FUNCTION)
function createTask(taskObj) {
    let li = document.createElement("li");
    li.innerText = taskObj.text;

    if (taskObj.completed) {
        li.classList.add("completed");
    }

    // ✅ Toggle Complete
    li.addEventListener("click", function () {
        taskObj.completed = !taskObj.completed;
        li.classList.toggle("completed");
        saveTasks();
    });

    // ✅ Delete Button
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();

        li.remove();
        tasks = tasks.filter(t => t !== taskObj);
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// ✅ Add Task
function addTask() {
    let text = taskInput.value.trim();
    if (text === "") return;

    let taskObj = {
        text: text,
        completed: false
    };

    tasks.push(taskObj);
    saveTasks();

    createTask(taskObj);

    taskInput.value = "";
}

// ✅ Button Click
addBtn.addEventListener("click", addTask);

// ✅ Press Enter
taskInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});