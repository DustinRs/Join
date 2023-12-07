async function init() {
    await getAllTasks(tasksKey);
    getUser(sessionKey);
    renderComponents(activeUser);
    updateHTML()
}

function renderComponents(activeUser) {
    let nav = document.querySelector('nav');
    let header = document.querySelector('header');
    let main = document.querySelector('main');
    nav.innerHTML = renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML =/*html*/`
    <div class="sections-drag">
                <div class="headline">
                    <h1>Board</h1>
                    <div class="inputAndButton">
                        <div class="input">
                            <input type="text" placeholder="Find Task">
                        </div>
                        <div class="buttonAdd">Add Task
                            <img src="/assets/img/board-plus.png" alt="">
                        </div>
                    </div>
                </div>
                <div class="content">
                    <div class="drag-area" id="To-Do" 
                    ondrop="moveTo('To-Do')" 
                    ondragleave="removeHighlight('To-Do')"
                    ondragover="allowDrop(event); highlight('To-Do')">
                    </div>
                    <div class="drag-area" id="In-Progress" 
                    ondrop="moveTo('In-Progress')"
                    ondragleave="removeHighlight('In-Progress')"
                    ondragover="allowDrop(event); highlight('In-Progress')">
                    </div>
                    <div class="drag-area" id="Await-Feedback" 
                    ondrop="moveTo('Await-Feedback')" 
                    ondragleave="removeHighlight('Await-Feedback')"
                    ondragover="allowDrop(event); highlight('Await-Feedback')">
                    </div>
                    <div class="drag-area" id="Done" 
                    ondrop="moveTo('Done')" 
                    ondragleave="removeHighlight('Done')"
                    ondragover="allowDrop(event); highlight('Done')">
                    </div>
                </div>
            </div>
    `
}


let headlines = [
    {
        color: 'rot',
        task: 'Aufgabe 1'
    },
    {
        color: 'blau',
        task: 'Aufgabe 2'
    },
    // Fügen Sie weitere Überschriften hier hinzu
];

let currentDraggedElement;

function taskFilter(arr, string, parentArr) {
    let statusArr = arr.filter(e => e.status == string);
    document.getElementById(string).innerHTML = '';
    for (let i = 0; i < statusArr.length; i++) {
        const element = statusArr[i];
        document.getElementById(string).innerHTML += generateTodoHTML(element)
    }
    return parentArr = statusArr
}

function updateHTML() {
    taskFilter(allTasks, "To-Do", todoArr);
    taskFilter(allTasks, "In-Progress", progressArr)
    taskFilter(allTasks, "Await-Feedback", awaitArr);
    taskFilter(allTasks, "Done", doneArr);

}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element) {
    let category = convertCategory(element);
    return /*html*/`
    <div id=${element.id} draggable="true" ondragstart="startDragging(${element.id})" class="todo">
        <div class="${element.category}">${category}</div>
        <h5 class="drag-headline">${element.title}</h5>
        <div class="todo-content">${element.description}</div>
        
        <div id="sub${element.id}" class="progress-container">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="subtask-content">

                <div>Subtasks</div>
            </div>
        </div>
    </div>
    `
    // hideBar(element)
}

/* <div>${element.subTaskCounter}</div>
<div>/${element.subTask.length}</div>  */

function allowDrop(ev) {
    ev.preventDefault();
}

async function moveTo(status, parentArr) {
    const draggedTask = allTasks.find(task => task.id === currentDraggedElement);

    if (draggedTask) {
        draggedTask.status = status;
        draggedTask.id = Date.now();
        sortArray();
        setAllTasks(tasksKey, allTasks);
        updateHTML();
    }
}


function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}



function sortArray() {
    return allTasks.sort((a, b) => a.id - b.id)
}

function convertCategory(element) {
    let categories = element.category.split('-');
    let capitalizedCategories = categories.map((category) => {
        return category.charAt(0).toUpperCase() + category.slice(1);
    });
    let category = capitalizedCategories.join(' ');
    return category;
}


// function hideBar(element){
//     if(element.subTask.length===0){
//        let bar= document.getElementById(`sub${element.id}`);
//     //    bar.style.display="none!important";
//     }
// }