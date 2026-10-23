
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    const input = document.getElementById("taskInput");
    const text = input.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
        id: nextId++,
        text: text,
        completed: false
    });

    input.value = "";
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id
            ? { ...task, completed: !task.completed }
            : task
    );

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function createTaskElement(task) {
    const li = document.createElement("li");

    if (task.completed) li.classList.add("completed");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.textContent = task.text;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";
    deleteButton.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, span, deleteButton);
    return li;
}

function renderList(elementId, taskList) {
    const list = document.getElementById(elementId);
    list.innerHTML = "";

    if (taskList.length === 0) {
        const message = document.createElement("li");
        message.className = "empty";
        message.textContent = "No tasks here yet.";
        list.appendChild(message);
        return;
    }

    taskList.forEach(task => {
        list.appendChild(createTaskElement(task));
    });
}

function renderTasks() {
    const pending = tasks.filter(task => !task.completed);
    const completed = tasks.filter(task => task.completed);

    renderList("allTasks", tasks);
    renderList("pendingTasks", pending);
    renderList("completedTasks", completed);

    document.getElementById("allCount").textContent = tasks.length;
    document.getElementById("pendingCount").textContent = pending.length;
    document.getElementById("completedCount").textContent = completed.length;
}

document.getElementById("taskInput").addEventListener("keydown", event => {
    if (event.key === "Enter") addTask();
});

renderTasks();
