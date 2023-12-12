function renderComponents(activeUser) {
    let nav = document.querySelector('nav');
    let header = document.querySelector('header');
    let main = document.querySelector('main');
    nav.innerHTML = renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML =/*html*/`
    <div id="info"><div id="info-text">Task added to board</div><img src="/assets/img/nav-board.png" id="error" alt=""></div>
    <div  class="column">
        <div class="sections-drag">
            <div class="headline">
                <h1>Board</h1>
                    <div id="find-task-container" class="input-group sub-container row">
                        <input id="find-task" class="form-control subtask-input" type="text" placeholder="Find Task"/>
                        <div class="input-border"></div>
                        <button class="btn btn-outline-secondary sub-active" 
                                id="search-btn"
                                type="button"
                                onclick="focusInput()">
                            <img id="#search-img" src="/assets/img/search.png" alt="">
                         </button>
                    </div>
                    <div class="buttonAdd" onclick="openPopUp(),changeStatus('To-Do')">Add Task
                        <img id="white-plus" src="/assets/img/white-plus.png" alt="">
                    </div>
            </div>
            <div id="content-headlines">
                <div class="drag-headlines"><h4>To do</h4> <img class="drag-headlines-plus" src="/assets/img/board-plus.png" alt="plus in box" onclick="openPopUp(),changeStatus('To-Do')"></div>
                <div class="drag-headlines"><h4>In progress</h4> <img class="drag-headlines-plus" src="/assets/img/board-plus.png" alt="plus in box" onclick="openPopUp(),changeStatus('In-Progress')"></div>
                <div class="drag-headlines"><h4>Await feedback</h4> <img class="drag-headlines-plus" src="/assets/img/board-plus.png" alt="plus in box" onclick="openPopUp(),changeStatus('Await-Feedback')"></div>
                <div class="drag-headlines"><h4>Done</h4></div>
            </div>
            <div id="content-box" class="content">
                <div class="drag-area" onclick="opendTodoPopUp()" id="To-Do" 
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
    `,
        addSearchBarHandler()
}


function generateTodoHTML(element) {
    let category = convertCategory(element);
    return /*html*/`
    <div id=${element.id} data-value="${element.assignees}" draggable="true" ondragstart="startDragging(${element.id})" onclick="openTodoPopup(${element.id})" class="todo">
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
            <div data-value="${element.assignees}" class="profile-initials-container"></div>
            <div class="prioriy-container" >${returnPriority(element.prio)}</div>
        </div>
    </div>
    `;
}

function returnPriority(priority) {
    if (priority === 'urgent') {
        return /*html*/`
        <img src="/assets/img/urgent-priority.png" alt="urgent">
        `
    } else if (priority === 'medium') {
        return /*html*/`
        <img src="/assets/img/medium-priority.png" alt="medium">
        `
    } else if (priority === 'low') {
        return /*html*/`
        <img src="/assets/img/low-priority.png" alt="low">
        `
    }
}


function renderPopUpAddTask() {
    let popUp = document.getElementById('pop-up-container');
    popUp.innerHTML = /*html*/`
        <div id="task-container">
            <div id="close-pop-up" onclick="closePopUp()"><img src="/assets/img/btn-x.png" alt=""></div>
            ${renderAddTaskSections()}
        </div>
`,
        styleAddTask()
    // setupInputListeners()
}

function renderPopUpTodo() {
    let body = document.querySelector('body');
    body.innerHTML += /*html*/`
    <div id="add-pop" class="pop-up-add-task d-none">
        <div id=pop-up-container>
            <div id="task-container">
                <div id="close-pop-up" onclick="closePopUp()"><img src="/assets/img/btn-x.png" alt=""></div>
                ${taskFilter(allTasks, "To-Do", todoArr)}
            </div>
        </div>
    </div>
    `;
}

function renderBoardPopUp() {
    return/*html*/`
    <div id="boardPopUp" class="pop-up-board d-none">
        <div id="" class="">User Story</div>
        <div id="" class="">Title</div>
        <div id="" class="">Description</div>
        <div id="" class="">Due Date</div>
        <div id="" class="">Priority</div>
        <div id="" class="">Assigned To</div>
        <div id="" class="">Subtasks</div>
        <div id="" class=""><button>Delete</button><button>Edit</button></div>
    </div>
    `;
}

function renderTodoIcons() {
    let divs = document.getElementsByClassName('profile-initials-container');
    for (let i = 0; i < divs.length; i++) {
        let div = divs[i];
        let index = div.getAttribute('data-value');
        if (index && index.trim() !== '') {
            index = index.split(',');
            for (let j = 0; j < index.length; j++) {
                div.innerHTML += /*html*/`
                    <div class="profile-initials" data-value="${index[j]}" style="background-color:${contacts[index[j]].color}">${contacts[index[j]].initials}</div>
                `;
            }
        }
    }
}


    
function renderSingleTodo(id) {
    if (id === undefined) { return }
    let index = allTasks.findIndex((task) => task.id === id);
    let element = allTasks[index];
    let text = element.description.split('\n').join('<br/>');
    let date = element.date.split('-').reverse().join('/');
    let priority = element.prio.slice(0,1).toUpperCase()+element.prio.slice(1);
    let category = convertCategory(element);
    let popUp = document.getElementById('pop-up-container');
    popUp.innerHTML = /*html*/`
    <div id="single-todo" data-value="${element.assignees}" class="todo">
        <div class="${category}">${element.category}</div>          
        <h5 id="pop-headline" class="drag-headline">${element.title}</h5>
        <div class="todo-content">${text}</div>
        <div id="dead-line">Due date: ${date}</div>
        <div id="pop-priority">Priority: ${priority} ${returnPriority(element.prio)}</div>
        <ul id="assignement">
        </ul>
        <ul id=subtask-list>
        </ul>
        <div id="sub${element.id}" class="progress-container">
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0"
                    aria-valuemax="100"></div>
            </div>
            <div class="subtask-content">
                <div>${element.subTaskCounter}</div>
                <div>/${element.subTask.length}</div>
                <div>Subtasks</div>
            </div>
        </div>
        <div class="footer-box">
            <div data-value="${element.assignees}" class="profile-initials-container"></div>
            <div class="prioriy-container">${returnPriority(element.prio)}</div>
        </div>
    </div>
`
    styleTodo()
}

function styleTodo() {
    let popUp = document.getElementById('pop-up-container');
    let sheet = document.getElementById('single-todo');

    sheet.style.boxShadow = 'none';
    popUp.style = 'width:30rem; padding:2rem 1rem';
}

function styleAddTask() {
    let popUp = document.getElementById('pop-up-container');
    popUp.style.width = '80%';

}


//      single container
// position: absolute;
// display: flex;
// background-color: white;
// inset: 0px;
// height: 87%;
// margin: auto;
// padding: 0px 5.5em;
// width: 45%;
// border-radius: 30px;
// flex-direction: column;
// transform: translateX(75rem);


// function getSubLi(subtaskList){
//     return subtaskList.map((subtask) => {
//         return /*html*/`<li class="subtask">${subtask}</li>`
//     }).join('')}