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
                    <div class="buttonAdd" onclick="openPopUp(),changeStatus('To-Do'),addAssigneesSelection()">Add Task
                        <img id="white-plus" src="/assets/img/white-plus.png" alt="">
                    </div>
            </div>
            <div id="content-headlines">
                <div class="drag-headlines"><h4>To do</h4> <img class="drag-headlines-plus" src="/assets/img/board-plus.png" alt="plus in box" onclick="openPopUp(),changeStatus('To-Do'),addAssigneesSelection()"></div>
                <div class="drag-headlines"><h4>In progress</h4> <img class="drag-headlines-plus" src="/assets/img/board-plus.png" alt="plus in box" onclick="openPopUp(),changeStatus('In-Progress'),addAssigneesSelection()"></div>
                <div class="drag-headlines"><h4>Await feedback</h4> <img class="drag-headlines-plus" src="/assets/img/board-plus.png" alt="plus in box" onclick="openPopUp(),changeStatus('Await-Feedback'),addAssigneesSelection()"></div>
                <div class="drag-headlines"><h4>Done</h4></div>
            </div>
            <div id="content-box" class="content">
                <div class="drag-area"  id="To-Do" 
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
    editTask=element;
    let obj=generateVarObj(element);
    let popUp = document.getElementById('pop-up-container');
    popUp.innerHTML = /*html*/`
    <div id="close-pop-up" onclick="closePopUp()"><img src="/assets/img/btn-x.png" alt=""></div>
    <div id="single-todo" data-value="${element.assignees}" class="todo">
        <div class="${obj.category} categoryBoardPopUp">${element.category}</div>          
        <h5 id="pop-headline" class="drag-headline headlineBoardPopUp">${element.title}</h5>
        <div id="todo-popup-content-box">
            <div id="todo-text-content" class="todo-content descriptionBoardPopUp">${obj.text}</div>
            <div id="dead-line" class="descriptionBoardPopUp"><span>Due date:  </span>${obj.date}</div>
            <div id="pop-priority" class="descriptionBoardPopUp"><span>Priority:  </span>${obj.priority} ${returnPriority(element.prio)}</div>
            <ul id="assignement">
                <h6 class="descriptionBoardPopUp">Assigned to</h6>
                ${getAssignList(element.assignees)}
            </ul>
            <ul id=subtask-list>
                <h6 class="descriptionBoardPopUp">Subtasks</h6>
                ${getSubList(element.subTask)}
            </ul>
        </div>
        <div id="todo-edit-footer">
            <button onclick="deleteTask('${id}')" id="delete-todo"><img src="/assets/img/delete.png" alt=""> Delete</button>
            <button onclick="startEdit()"><img src="/assets/img/edit.png" alt=""> Edit</button>
        </div>
    </div>`,
    styleTodo();
    
}

function styleTodo() {
    let popUp = document.getElementById('pop-up-container');
    let sheet = document.getElementById('single-todo');

    sheet.style.boxShadow = 'none';
    popUp.style = 'width:30rem; padding:2rem 1rem';
}

function styleAddTask() {
    let popUp = document.getElementById('pop-up-container');
    popUp.style = 'width:80%; padding:0 5.5rem';

}


function getAssignList(assignees) {
    let liArr = []
    for (let i = 0; i < assignees.length; i++) {
        let contact = contacts[assignees[i]];
        liArr.push(`<li class=contact><div class="profile"><div class="icon" style="background-color:${contact.color}">${contact.initials}</div><div class="name">${contact.fullName}</div></div></li>`)
    }
    return liArr.join('')
}


function getSubList(subtaskList) {
    let subLiArr = []
    for (let i = 0; i < subtaskList.length; i++) {
        let sub = subtaskList[i];
        subLiArr.push(`<li>${sub}</li>`)
    }
    return subLiArr.join('')
}

function renderEditTaskPopUp() {
    let popUp = document.getElementById('pop-up-container');
    popUp.innerHTML = /*html*/`
    <div id="close-pop-up" onclick="closePopUp()"><img src="/assets/img/btn-x.png" alt=""></div>
<div class="sectionsEdit">
    <div class="left-section">
        <h6>Title</h6>
        <div class="input-group sub-container row">
            <input id="titleEdit" class="form-control subtask-input" type="text" placeholder="Enter a title" required />
        </div>
        <h6>Description</h6>
        <div id="area-container" class="input-group sub-container row">
            <textarea id="descriptionEdit" class="form-control subtask-input" placeholder="Enter a Description" cols="30"
                rows="10" required></textarea>
        </div>
        <h6>Assigned to</h6>
        <div class="relative">
            <div id="assign-select" class="input-group sub-container ">
                <input class="form-control subtask-input contact-assign-select select"
                    onclick="openList('assign-select','assign','assign-ul','assign-icon')"
                    placeholder="Select contacts to assign" id="assignedEdit">
                <button id="assign-icon" class="divIcon"
                    onclick="openList('assign-select','assign','assign-ul','assign-icon')"><img
                        src="/assets/img/arrow_drop_down.png" alt=""></button>
            </div>
            <div id="assign-ul" class="ul-parent d-none">
                <ul id=assign-list class="drop-down-select-container ">
                    <li class=add-task-contact>
                        <div class="profile">
                            <div class="icon">*Bild*</div>
                            <div class="name">*Name*</div>
                        </div>
                        <div class="checkbox-container">
                            <input type="checkbox" id="check1">
                            <img id="img-box1" src="/assets/img/checkbox.png" onclick="checkboxClick(1)" alt="checkbox">
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    <div class="border"></div>
    <div class="right-section">
        <h6>Due date</h6>
        <div class="input-group sub-container row">
            <input id="dateEdit" class="form-control subtask-input" type="date" required />
        </div>
        <h6>Prio</h6>
        <div id="prioEdit">
            <div class="prio Urgent">
                <label>
                    <input id="urgent" 
                        type="checkbox" 
                        value="Urgent" 
                        onclick="checkBoxClicked('urgent')">
                    <span class="priority-span" id="urgent-span">Urgent <img class="prioImgs" id="urgent-img"src="/assets/img/urgent-priority.png" alt=""></span>
                </label>
            </div>
            <div class="prio Medium">
                <label>
                    <input id="medium" 
                        type="checkbox" 
                        value="Medium" 
                        onclick="checkBoxClicked('medium')">
                    <span class="priority-span" id="medium-span">Medium <img class="prioImgs" id="medium-img"src="/assets/img/medium-priority.png" alt=""></span>
                </label>
            </div>
            <div class="prio Low">
                <label>
                    <input id="low" 
                        type="checkbox" 
                        value="Low" 
                        onclick="checkBoxClicked('low')">
                    <span class="priority-span" id="low-span">Low <img class="prioImgs" id="low-img"src="/assets/img/low-priority.png" alt=""></span>
                </label>
            </div>
        </div>
        <h6>Category</h6>
        <div class="relative">
            <div id="category-select" class="input-group sub-container">
                <input class="form-control subtask-input contact-assign-select select" 
                    value=""
                    placeholder="Select task category" 
                    id="categoryEdit"
                    onclick="openList('category-select','category','category-ul','category-icon')" 
                    readonly 
                    required>
                <button id="category-icon" class="divIcon"
                    onclick="openList('category-select','category','category-ul','category-icon')"><img
                        src="/assets/img/arrow_drop_down.png" alt=""></button>
            </div>
            <div id="category-ul" class="ul-parent d-none">
                <ul class="drop-down-select-container">
                    <li class=add-task-contact>
                        <div class="profile">
                            <div class="name"
                                onclick="setValue('Technical Task');closeList('category-select','category','category-ul','category-icon');checkInputs()">
                                Technical Task</div>
                        </div>
                    </li>
                    <li class=add-task-contact>
                        <div class="profile">
                            <div class="name"
                                onclick="setValue('User Story');closeList('category-select','category','category-ul','category-icon');checkInputs()">
                                User Story</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <h6 id="header-six">Subtasks</h6>
        <div id="sub-container" class="input-group sub-container row">
            <input  id="subtaskEdit" 
                    type="text" 
                    class="form-control subtask-input" 
                    placeholder="Add new Subtask"
                    aria-label="Recipient's username with two button addons" 
                    onclick="subTaskActive()">
            <button class="btn btn-outline-secondary sub-active" 
                    onclick="subTaskActive()" 
                    id="sub-plus"
                    type="button">
                <img id="sub-btn-plus" src="/assets/img/dark-plus.png" alt="">
            </button>
            <div id="sub-btn" class="d-flex d-none">
                <button class="btn sub-active" 
                        id="cross-btn" 
                        type="button" 
                        onclick="subTaskClose()"><img id="cross"
                        src="/assets/img/btn-x.png" alt=""></button>
                <div class="input-border"></div>
                <button class="btn sub-active" 
                        id="check-btn" 
                        type="button"
                        onclick="pushSubTasks()">
                            <img id="add-subtask" src="/assets/img/darkCheckmark.png" alt="">
                </button>
            </div>
            <div id="subtask-listed">
                <ul id="task-list"></ul>
            </div>
        </div>
    </div>
</div>
</div>
<div class="edit-task-bottom-section">
    <div id="submit-btn-container">        
    <button id="createTaskButton" class="createTaskButton" onclick="addTask('To-Do')">Ok <img src="/assets/img/checkbtn-checkmark.png"
                alt="" /></button>
    </div>
</div>
`
};


function editCurrentTodo(task,object) {
    console.log(task)
    let popUp = document.getElementById('pop-up-container');
    popUp.innerHTML = /*html*/`

  <div class="edit-sections">
      <div >
          <h6>Title</h6>
          <div class="input-group sub-container row">
              <input id="title" class="form-control subtask-input" type="text" value="${task.title}" placeholder="Enter a title" required />
          </div>
          <h6>Description</h6>
          <div id="area-container" class="input-group sub-container row">
              <textarea id="description" class="form-control subtask-input" value="${task.description}" placeholder="Enter a Description" cols="30"
                  rows="10" required></textarea>
          </div>
          <h6>Assigned to</h6>
          <div class="relative">
              <div id="assign-select" class="input-group sub-container ">
                  <input class="form-control subtask-input contact-assign-select select"
                      onclick="openList('assign-select','assign','assign-ul','assign-icon')"
                      placeholder="Select contacts to assign" id="assign">
                  <button id="assign-icon" class="divIcon"
                      onclick="openList('assign-select','assign','assign-ul','assign-icon')"><img
                          src="/assets/img/arrow_drop_down.png" alt=""></button>
              </div>
              <div id="assign-ul" class="ul-parent d-none">
                  <ul id=assign-list class="drop-down-select-container edit-ul">
                      <li class=add-task-contact>
                          <div class="profile">
                              <div class="icon">*Bild*</div>
                              <div class="name">*Name*</div>
                          </div>
                          <div class="checkbox-container">
                              <input type="checkbox" id="check1">
                              <img id="img-box1" src="/assets/img/checkbox.png" onclick="checkboxClick(1)" alt="checkbox">
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <div class="edit-border"></div>
      <div >
          <h6>Due date</h6>
          <div class="input-group sub-container row">
              <input id="date" class="form-control subtask-input" type="date" required />
          </div>
          <h6>Prio</h6>
          <div id="prio">
              <div class="prio Urgent">
                  <label>
                      <input id="urgent" 
                          type="checkbox" 
                          value="Urgent" 
                          onclick="checkBoxClicked('urgent')">
                      <span class="edit-priority-span" id="urgent-span">Urgent <img class="prioImgs" id="urgent-img"src="/assets/img/urgent-priority.png" alt=""></span>
                  </label>
              </div>
              <div class="prio Medium">
                  <label>
                      <input id="medium" 
                          type="checkbox" 
                          value="Medium" 
                          onclick="checkBoxClicked('medium')">
                      <span class="edit-priority-span" id="medium-span">Medium <img class="prioImgs" id="medium-img"src="/assets/img/medium-priority.png" alt=""></span>
                  </label>
              </div>
              <div class="prio Low">
                  <label>
                      <input id="low" 
                          type="checkbox" 
                          value="Low" 
                          onclick="checkBoxClicked('low')">
                      <span class="edit-priority-span" id="low-span">Low <img class="prioImgs" id="low-img"src="/assets/img/low-priority.png" alt=""></span>
                  </label>
              </div>
          </div>
          <h6>Category</h6>
          <div class="relative">
              <div id="category-select" class="input-group sub-container">
                  <input class="form-control subtask-input contact-assign-select select" 
                      value=""
                      placeholder="Select task category" 
                      id="category"
                      onclick="openList('category-select','category','category-ul','category-icon')" 
                      readonly 
                      required>
                  <button id="category-icon" class="divIcon"
                      onclick="openList('category-select','category','category-ul','category-icon')"><img
                          src="/assets/img/arrow_drop_down.png" alt=""></button>
              </div>
              <div id="category-ul" class="ul-parent d-none">
                  <ul class="drop-down-select-container">
                      <li class=add-task-contact>
                          <div class="profile">
                              <div class="name"
                                  onclick="setValue('Technical Task');closeList('category-select','category','category-ul','category-icon');checkInputs()">
                                  Technical Task</div>
                          </div>
                      </li>
                      <li class=add-task-contact>
                          <div class="profile">
                              <div class="name"
                                  onclick="setValue('User Story');closeList('category-select','category','category-ul','category-icon');checkInputs()">
                                  User Story</div>
                          </div>
                      </li>
                  </ul>
              </div>
          </div>
          <h6 id="header-six">Subtasks</h6>
          <div id="sub-container" class="input-group sub-container row">
              <input  id="subtask-input" 
                      type="text" 
                      class="form-control subtask-input" 
                      placeholder="Add new Subtask"
                      aria-label="Recipient's username with two button addons" 
                      onclick="subTaskActive()">
              <button class="btn btn-outline-secondary sub-active" 
                      onclick="subTaskActive()" 
                      id="sub-plus"
                      type="button">
                  <img id="sub-btn-plus" src="/assets/img/dark-plus.png" alt="">
              </button>
              <div id="sub-btn" class="d-flex d-none">
                  <button class="btn sub-active" 
                          id="cross-btn" 
                          type="button" 
                          onclick="subTaskClose()"><img id="cross"
                          src="/assets/img/btn-x.png" alt=""></button>
                  <div class="input-border"></div>
                  <button class="btn sub-active" 
                          id="check-btn" 
                          type="button"
                          onclick="pushSubTasks()">
                              <img id="add-subtask" src="/assets/img/darkCheckmark.png" alt="">
                  </button>
              </div>
              <div id="subtask-listed">
                  <ul id="task-list" class="edit-ul-task-list"></ul>
              </div>
          </div>
      </div>
  </div>
  </div>
  <div class="edit-bottom-section">
  <button id="edit-ok-btn" class="createTaskButton">Ok <img src="/assets/img/checkbtn-checkmark.png"
                  alt="" /></button>
  </div>
  `,
  addAssigneesSelection()};

