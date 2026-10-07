const form = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const error = document.getElementById("error");
const counter = document.getElementById("counter");

const allBtn = document.getElementById("allBtn");
const activeBtn = document.getElementById("activeBtn");
const completedBtn = document.getElementById("completedBtn");
const clearBtn = document.getElementById("clearBtn");

let currentFilter = "all";


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const task = taskInput.value.trim();

    error.textContent = "";

    if (task === "") {
        error.textContent = "Please enter a task";
        return;
    }

    const tasks = document.querySelectorAll(".taskText");

    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].textContent.toLowerCase() === task.toLowerCase()) {
            error.textContent = "Task already exists";
            return;
        }
    }

    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const span = document.createElement("span");
    span.textContent = task;
    span.classList.add("taskText");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteBtn");

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";

    updateCounter();
    applyFilter();
});


taskList.addEventListener("click", function(event) {

    if (event.target.type === "checkbox") {

        const span = event.target.parentElement.querySelector(".taskText");

        span.classList.toggle("completed");

        updateCounter();
        applyFilter();
    }

    if (event.target.classList.contains("deleteBtn")) {

        event.target.parentElement.remove();

        updateCounter();
    }
});


allBtn.addEventListener("click", function() {
    currentFilter = "all";
    applyFilter();
});

activeBtn.addEventListener("click", function() {
    currentFilter = "active";
    applyFilter();
});

completedBtn.addEventListener("click", function() {
    currentFilter = "completed";
    applyFilter();
});


clearBtn.addEventListener("click", function() {

    const tasks = taskList.querySelectorAll("li");

    for (let i = 0; i < tasks.length; i++) {

        const checkbox = tasks[i].querySelector("input");

        if (checkbox.checked) {
            tasks[i].remove();
        }
    }

    updateCounter();
});


function updateCounter() {

    const tasks = taskList.querySelectorAll("li");
    const remaining = taskList.querySelectorAll("li:not(:has(input:checked))");

    counter.textContent =
        "Total: " + tasks.length +
        " | Remaining: " + remaining.length;
}


function applyFilter() {

    const tasks = taskList.querySelectorAll("li");

    for (let i = 0; i < tasks.length; i++) {

        const checkbox = tasks[i].querySelector("input");

        if (currentFilter === "all") {
            tasks[i].style.display = "flex";
        }

        if (currentFilter === "active") {

            if (checkbox.checked) {
                tasks[i].style.display = "none";
            } else {
                tasks[i].style.display = "flex";
            }
        }

        if (currentFilter === "completed") {

            if (checkbox.checked) {
                tasks[i].style.display = "flex";
            } else {
                tasks[i].style.display = "none";
            }
        }
    }
}