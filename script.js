let tasks = [];

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");




addBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";
});




function filterTasks() {

    if (currentFilter === "all") {
        return tasks;
    }

    if (currentFilter === "active") {
        return tasks.filter(function (task) {
            return !task.completed;
        });
    }

    if (currentFilter === "completed") {
        return tasks.filter(function (task) {
            return task.completed;
        });
    }
}




function renderTasks() {

    taskList.innerHTML = "";

    const filteredTasks = filterTasks();

    filteredTasks.forEach(function (task) {

        const li = document.createElement("li");

        

        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.dataset.action = "toggle";
        checkbox.dataset.id = task.id;




        const span = document.createElement("span");

        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }




        const editBtn = document.createElement("button");

        editBtn.textContent = "Edit";

        editBtn.dataset.action = "edit";
        editBtn.dataset.id = task.id;




        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.dataset.action = "delete";
        deleteBtn.dataset.id = task.id;


        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(editBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });
}




taskList.addEventListener("change", function (event) {

    const element = event.target;

    if (element.dataset.action === "toggle") {

        const taskId = Number(element.dataset.id);

        const task = tasks.find(function (item) {
            return item.id === taskId;
        });

        task.completed = element.checked;

        saveTasks();

        renderTasks();
    }
});




taskList.addEventListener("click", function (event) {

    const button = event.target;

    if (button.dataset.action === "edit") {

        const taskId = Number(button.dataset.id);

        const task = tasks.find(function (item) {
            return item.id === taskId;
        });

        const newText = prompt("Edit your task:", task.text);

        if (newText !== null && newText.trim() !== "") {

            task.text = newText.trim();

            saveTasks();

            renderTasks();
        }
    }


    if (button.dataset.action === "delete") {

        const taskId = Number(button.dataset.id);

        tasks = tasks.filter(function (item) {
            return item.id !== taskId;
        });

        saveTasks();

        renderTasks();
    }
});




allBtn.addEventListener("click", function () {

    currentFilter = "all";

    renderTasks();
});


activeBtn.addEventListener("click", function () {

    currentFilter = "active";

    renderTasks();
});


completedBtn.addEventListener("click", function () {

    currentFilter = "completed";

    renderTasks();
});



loadTasks();

renderTasks();