function renderComponents(activeUser) {
    let nav = document.querySelector('nav');
    let header = document.querySelector('header');
    let main = document.querySelector('main');
    nav.innerHTML = renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML =/*html*/`

    <div class="column">
        <div class="sections-drag">
            <div class="headline">
                <h1>Board</h1>
                <div class="inputAndButton">
                    <div class="input">
                        <input type="text" placeholder="Find Task">
                    </div>
                    <div class="buttonAdd" onclick="openPopUp()">Add Task
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
    </div>
    `;
    renderPopUpAddTask()
}


function generateTodoHTML(element) {
    let category = convertCategory(element);
    return /*html*/`
    <div id=${element.id} draggable="true" ondragstart="startDragging(${element.id})" class="todo">
        <div class="${category}">${element.category}</div>
        <h5 class="drag-headline">${element.title}</h5>
        <div class="todo-content">${element.description}</div>
        <div id="sub${element.id}" class="progress-container">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
            </div>
            <div class="subtask-content">
                <div>${element.subTaskCounter}</div>
                <div>/${element.subTask.length}</div>  
                <div>Subtasks</div>
            </div>
        </div>
        <div class="footer-box">
            <div class="profile-initials-container"></div>
            <div class="prioriy-container">${returnPriority(element.prio)}</div>
        </div>
    </div>
    `
}

function returnPriority(priority){
    if(priority==='urgent'){
        return /*html*/`
        <img src="/assets/img/urgent-priority.png" alt="urgent">
        `
    }else if(priority==='medium'){
        return /*html*/`
        <img src="/assets/img/medium-priority.png" alt="medium">
        `
    }else if(priority==='low'){
        return /*html*/`
        <img src="/assets/img/low-priority.png" alt="low">
        `
    }
}


function renderPopUpAddTask(){
let body  = document.querySelector('body');
body.innerHTML += /*html*/`
<div id="add-pop-up" class="pop-up-add-task d-none">
    <div id=pop-up-container>
        <div id="task-container">
            <div id="close-pop-up" onclick="closePopUp()"><img src="/assets/img/btn-x.png" alt=""></div>
            ${renderAddTaskSections()}
        </div>
    </div>
</div>
`
}

