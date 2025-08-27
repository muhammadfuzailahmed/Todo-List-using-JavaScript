let ul = document.querySelector(".todoList");
let inputText = document.querySelector("#inputValue");
let addTaskBtn = document.querySelector(".add-task-button");


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

tasks.forEach(function(t) {
    addTask(t);
})

function addNewTask() {
    if(inputText.value === "") return;
    let text = inputText.value.trim();
    console.log(text);
    let task = {
        id: Date.now(),
        goalText: text,
        isCompleted: false,
    };
    addTask(task);
    tasks.push(task);
    saveTask();
    inputText.value = "";
}

inputText.addEventListener("keydown", (e) => {
    if(e.key === "Enter") {
        addNewTask();
    }
})

addTaskBtn.addEventListener('click', addNewTask);


function addTask(task) {
    let li = document.createElement('li');
    li.style.cursor = "pointer";
    li.style.padding = "5px"
    li.style.borderBottom = "1px solid #000"
    li.innerHTML = `
    <span>${task.goalText}</span>
    <button>Delete</button>
    `
    ul.appendChild(li);
    li.addEventListener('click', () => {
        task.isCompleted = !task.isCompleted;
        if(task.isCompleted) {
            li.classList.add("completed")
            li.remove();
        }else {
            li.classList.remove("completed")
        }
    })
    li.querySelector('button').addEventListener('click',() => {
      tasks = tasks.filter(t => t.id !== task.id)
      saveTask();
      li.remove();
    })
}

function saveTask() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
