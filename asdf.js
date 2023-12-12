function renderSingleTodo(id) {
    if (id === undefined) { return }
    let index = allTasks.findIndex((task) => task.id === id);
    let element = allTasks[index];
    let obj=generateVarObj(element)
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
            <button onclick="deleteTask('${id}')" id="delete-todo"><img src="/assets/img/delete.png" alt=""> Delete</button><button onclick="editCurrentTodo('${element,obj}')"><img src="/assets/img/edit.png" alt=""> Edit</button>
        </div>
    </div>`
}

function generateVarObj(obj) {
    let todoObject = {
        text : obj.description.split('\n').join('<br/>'),
        date : obj.date.split('-').reverse().join('/'),
        priority : obj.prio.slice(0, 1).toUpperCase() + element.prio.slice(1),
        category : convertCategory(obj)
    }
    return todoObject
}