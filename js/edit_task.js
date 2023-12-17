// date form-validation, title description, (addinputhandler)listener, 

/**
 * Pushes the eddited task into the 'allTasks' array.
 * 
 * @param {string} status - The status of the task.
 * @param {string} index - The index of the task.
 * @param {string} prio - The prio of the task.
 */
async function editTodoInAllTasks(status, index, prio) {
    let title = document.getElementById("title").value;
    let taskArr;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let category = document.getElementById("category").value;
    let task = createEditTaskObject(status, title, taskArr, description, date, category, prio);
    allTasks.splice(index, 1, task);
    await setAllTasks(tasksKey, allTasks);
    assignees = [];
    subTasks = [];
    finishedSubTasks = [];
    pushInfo();
}

/**
 * Creates an eddited task by taking the value of the inputfields.
 * 
 * @param {string} title - This is the 'title' value.
 * @param {string} taskArr - ?
 * @param {string} description - This is the 'description' value.
 * @param {string} date - This is the 'date' value.
 * @param {string} prio - This is the 'prio' value.
 * @param {string} category - This is the 'category' value.
 * @param {string} status - This is the 'status' value.
 * @returns 
 */
function createEditTaskObject(status, title, taskArr, description, date, category, prio) {
    let task = {
        title: title,
        description: description,
        date: date,
        prio: editArr[0] || prio,
        category: category,
        status: status,
        counter: finishedSubTasks.length,
        subTask: taskArr = [...subTasks],
        finishedTaskList: taskArr = [...finishedSubTasks],
        totalSubTasks: subTasks.length + finishedSubTasks.length,
        id: Date.now(),
        assignees: assignees
    }; return task
}
/*
function inputHandlerEdit() {
    let name = document.getElementById("editName");
    name.addEventListener('click', addTitleListener);
    
}

function nameListenerEdit() {
    let input = document.getElementById('editName');
    input.addEventListener('input', validateNameInput);
    input.addEventListener('input', checkAllInputs)
}

function validateNameInput() {
    let name = document.getElementById("editName");
    let container = document.getElementById('edit-task-name-container');
    let message = document.getElementById('name-requirement');
    let btn = document.getElementById('saveButtonEdit');
    if (name.value.length === 0) {
        container.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;"
        message.classList.remove('d-none');
        btn.disabled = true;
    } else {
        message.classList.add('d-none');
        container.style = ""
        return true
    }
}*/

function addInputHandler() {
    let title = document.getElementById("title");
    let description = document.getElementById("description");
    let date = document.getElementById("date");
    let assignSelect = document.getElementById('assign-select');
    let categorySelect = document.getElementById('category-select');
    title.addEventListener('click', addTitleListener);
    description.addEventListener('click', addDescriptionListener);
    date.addEventListener('focusout', validateDateInput);
    date.addEventListener('focusout', checkAllInputs);
    assignSelect.addEventListener('click', setClosingAssign);
    categorySelect.addEventListener('click', setClosingCategory);
}


function addTitleListener() {
    let input = document.getElementById('title');
    input.addEventListener('input', validateTitleInput);
    input.addEventListener('input', checkAllInputs)
}


function addDescriptionListener() {
    let input = document.getElementById('description');
    input.addEventListener('input', validateDescriptionInput);
    input.addEventListener('input', checkAllInputs)
}


function validateTitleInput() {
    let title = document.getElementById("title");
    let container = document.getElementById('add-task-titlte-container');
    let message = document.getElementById('title-requirement') || document.getElementById('title-requirement-edit');
    let btn = document.getElementById('createTaskButton') || document.getElementById('edit-ok-btn');
    if (title.value.length === 0) {
        container.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;"
        message.classList.remove('d-none')
        btn.disabled = true;
    } else {
        message.classList.add('d-none')
        container.style = ""
        return true
    }
}

function validateDescriptionInput() {
    let description = document.getElementById("description");
    let container = document.getElementById('area-container');
    let message = document.getElementById('description-requirement') || document.getElementById('description-requirement-edit');
    let btn = document.getElementById('createTaskButton') || document.getElementById('edit-ok-btn');
    if (description.value.length === 0) {
        container.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
        message.classList.remove('d-none')
        btn.disabled = true;
    } else {
        container.style = ""
        message.classList.add('d-none')
        return true
    }
}

function validateDateInput() {
    let input = document.getElementById('date');
    let div = document.getElementById("add-task-date-input");
    let selectedDate = new Date(input.value);
    let currentDate = new Date();
    let message = document.getElementById('date-requirement') || document.getElementById('date-requirement-edit');
    let btn = document.getElementById('createTaskButton') || document.getElementById('edit-ok-btn');
    if (selectedDate == 'Invalid Date') {
        div.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
        message.classList.remove('d-none');
        btn.disabled = true;
    } else if (selectedDate < currentDate) {
        div.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
        message.classList.remove('d-none');
        btn.disabled = true;
    } else { message.classList.add('d-none'); div.style = ""; return true }
}

function categoryResponse() {
    let category = document.getElementById("category");
    let btn = document.getElementById('createTaskButton') || document.getElementById('edit-ok-btn');
    if (category.value == "Technical Task" || category.value == "User Story") {
        return true
    } else {
        btn.disabled = true;
        return false
    }
}


function getMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Monate sind nullbasiert
    const day = today.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}



function setClosingCategory() {
    let categoryContainer = document.getElementById('category-select');
    let categoryInput = document.getElementById('category');
    let body = document.querySelector('body')
    body.addEventListener('click', function (event) {
        if (event.target != categoryContainer && event.target != categoryInput) {
            console.log("hallo")
            closeList("category-select", "category", "category-ul", "category-icon")
        }
    })
    categoryContainer.removeEventListener('click', setClosingCategory);

}


function setClosingAssign() {
    let assignContainer = document.getElementById('assign-select');
    let assignInput = document.getElementById('assign');
    let body = document.querySelector('body')
    body.addEventListener('click', function (event) {
        if (event.target != assignContainer && event.target != assignInput) {
            console.log("hallo")
            closeList("assign-select", "assign", "assign-ul", "assign-icon")
        }
    })
    assignContainer.removeEventListener('click', setClosingAssign);

}


//returns an array of subtasks if available for listing them below the editable task
function getSubList(subtaskList, finishedTaskList) {
    let subLiArr = []
    let finListArr = getEditFinishedList(finishedTaskList);
    for (let i = 0; i < subtaskList.length; i++) {
        let sub = subtaskList[i];
        subTasks.push(sub)
        subLiArr.push(`<li class="single-subtask" id="${i}">${sub}</li>`)
    }
    return mergeSublists(subLiArr, finListArr)
}


//returns an array of finished subtasks if available for listing them below the editable task
function getEditFinishedList(finishedTaskList) {
    let finLiArr = []
    if (finishedTaskList.length === 0) {
        return false
    }
    for (let i = 0; i < finishedTaskList.length; i++) {
        let fin = finishedTaskList[i];
        finishedSubTasks.push(fin)
        finLiArr.push(`<li class="single-finished-task" id="f${i}">${fin}</li>`)
    }
    return finLiArr
}

function setEditableSubtask() {
    if (subTasks.length > 0) {
        let subtaskListItems = document.getElementsByClassName('single-subtask');
        for (let i = 0; i < subtaskListItems.length; i++) {
            let sub = subtaskListItems[i];
            console.log(sub)
            sub.addEventListener('dblclick', (event)=>{
                console.log(sub.id)
                editListItem(sub.id)
            })
        }
    }
}

function editSubaskList(id) {
    let subtaskList = document.getElementById(`${id}`).innerHTML;
    console.log(subtaskList)
    subtaskList.contentEditable = true;
    subtaskList.focus();
}


function editListItem(id) {
    // Erstelle ein textInput-Element
    let item = document.getElementById(`${id}`);
    const textInput = document.createElement("input");
    textInput.type = "text";
    textInput.value = item.textContent;
    textInput.classList.add('subtask-input');
    textInput.classList.add('edit-input');

    // Ersetze das li-Element durch das textInput-Element
    item.parentNode.replaceChild(textInput, item);

    // Füge ein Eventlistener für die "Enter"-Taste hinzu, um die Bearbeitung zu beenden
    textInput.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        // Beende die Bearbeitung und setze den neuen Text im li-Element
        item.textContent = textInput.value;
        // Ersetze das textInput-Element durch das ursprüngliche li-Element
        textInput.parentNode.replaceChild(item, textInput);
      }
    });

    // Setze den Fokus auf das Texteingabefeld
    textInput.focus();
  }