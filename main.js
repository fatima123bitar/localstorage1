let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksdiv = document.querySelector(".tasks");

let arrayoftasks = [];

if(localStorage.getItem("tasks")){
    arrayoftasks = JSON.parse(localStorage.getItem("tasks"));
}

getdataFromLocalstorage();

submit.onclick = function (){
    if (input.value !== ""){
        addTaskToArray(input.value);
        input.value ="";
    }
}

tasksdiv.addEventListener("click", (e) => {
    if(e.target.classList.contains("del")){
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task")){
        toggleStatusTaskWith(e.target.getAttribute("data-id"))
        e.target.classList.toggle("done");
    }
});
function  addTaskToArray(tasktext){
    const task = {
        id: Date.now(),
        title: tasktext, 
        completed: false,
    };
    arrayoftasks.push(task);
    addElementsToPageFrom(arrayoftasks);
    addataToLocalstorageFrom(arrayoftasks);
}

function addElementsToPageFrom(arrayoftasks){
    tasksdiv.innerHTML = "";
    arrayoftasks.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task";
        if(task.completed){
            div.className = "task done";
        }
        div.setAttribute("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));
        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(span);
        tasksdiv.appendChild(div);
    });
}

function addataToLocalstorageFrom(arrayoftasks){
    window.localStorage.setItem("tasks", JSON.stringify(arrayoftasks));
}

function getdataFromLocalstorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementsToPageFrom(tasks);
    }
}

function deleteTaskWith(taskId){
    arrayoftasks = arrayoftasks.filter((task) => task.id != taskId);
    addataToLocalstorageFrom(arrayoftasks);
}

function toggleStatusTaskWith(taskId){
    for(let i=0; i< arrayoftasks.length; i++){
        if(arrayoftasks[i].id == taskId){
            arrayoftasks[i].completed == false ? (arrayoftasks[i].completed = true) : (arrayoftasks[i].completed = false);
        }
    }
    addataToLocalstorageFrom(arrayoftasks);
}











