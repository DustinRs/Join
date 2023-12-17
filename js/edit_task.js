// date form-validation, title description, (addinputhandler)listener, 


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