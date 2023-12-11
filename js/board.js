async function init() {
    await getAllTasks(tasksKey);
    await getContacts(contactKey);
    getUser(sessionKey);
    renderComponents(activeUser);
    navActive(2);
    updateBoard();
}


function updateBoard() {
    taskFilter(allTasks, "To-Do", todoArr);
    taskFilter(allTasks, "In-Progress", progressArr)
    taskFilter(allTasks, "Await-Feedback", awaitArr);
    taskFilter(allTasks, "Done", doneArr);
    checkDragArea();
    hideBar()
}

function taskFilter(arr, string, parentArr) {
    let statusArr = arr.filter(e => e.status == string);
    document.getElementById(string).innerHTML = '';
    for (let i = 0; i < statusArr.length; i++) {
        const element = statusArr[i];
        document.getElementById(string).innerHTML += generateTodoHTML(element)
    }
    return parentArr = statusArr
}


function startDragging(id) {
    currentDraggedElement = id;
}


// hideBar(element)

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
        updateBoard();
        hideBar();
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
    let categories = element.category.split(' ');
    let capitalizedCategories = categories.map((category) => {
        return category.charAt(0).toLowerCase() + category.slice(1);
    });
    let category = capitalizedCategories.join('-');
    return category;
}


function hideBar() {
    for (let i = 0; i < allTasks.length; i++) {
        let element = allTasks[i];
        if (element.subTask.length === 0) {
            let bar = document.getElementById(`sub${element.id}`);
            if (bar) {
                bar.classList.add('d-none')
            }
        }
    }
}


function closePopUp() {
    let popup = document.getElementById('add-pop-up');
    let container = document.getElementById('pop-up-container');
    container.style.animation = "slide-out 0.15s ease-in-out forwards"
    setTimeout(() => {
        popup.classList.add('d-none')
        container.style.animation = "";
    }, 150);
}

function openPopUp() {
    renderPopUpAddTask();
    checkInputs();
    let popup = document.getElementById('add-pop-up');
    popup.classList.remove('d-none')
}

function animatePopUp() {

}


function changeStatus(string) {
    let btn = document.getElementById('createTaskButton')
    btn.setAttribute('onclick', `addTask('${string}')`)
}

function checkDragArea() {
    let dragArea = document.getElementsByClassName('drag-area')
    for (let i = 0; i < dragArea.length; i++) {
        if (dragArea[i].innerHTML.includes('Technical Task') || dragArea[i].innerHTML.includes('User Story')) {
            if (dragArea[i].firstElementChild) {
                dragArea[i].style='justify-content: flex-start';
                dragArea[i].style = 'border:none;background-color: transparent;border-radius:3rem;justify-content: flex-start' 
            }
        } else {
            dragArea[i].style = '';
            dragArea[i].innerText = 'No tasks to do';
        }
    }
}

function opendTodoPopUp() {
document.getElementById('boardPopUp').classList.remove('d-none');
}

function addAssignees(){
    let idArr = [];
    for (let i = 0; i < assignees.length; i++) {
        idArr.push(allTasks[assignees[i]].id)
    }
    return idArr
}   