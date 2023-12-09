async function init() {
    await getAllTasks(tasksKey);
    getUser(sessionKey);
    renderComponents(activeUser);
    updateBoard();
    hideBar();
}


function updateBoard() {
    taskFilter(allTasks, "To-Do", todoArr);
    taskFilter(allTasks, "In-Progress", progressArr)
    taskFilter(allTasks, "Await-Feedback", awaitArr);
    taskFilter(allTasks, "Done", doneArr);
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
            bar.classList.add('d-none')
        }
    }
}


