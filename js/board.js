async function init() {
    await getAllTasks(tasksKey);
    console.log(allTasks)
    getUser(sessionKey);
    renderComponents(activeUser);
    updateHTML()
}

function renderComponents(activeUser) {
    let body = document.querySelector('body')
    body.innerHTML = renderNavBar();
    body.innerHTML += renderHeader(activeUser);
    document.querySelector('main').innerHTML =/*html*/`
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
                    ondrop="moveTo('To-Do',todoArr)" 
                    ondragleave="removeHighlight('To-Do')"
                    ondragover="allowDrop(event); highlight('To-Do')">
                    </div>
                    <div class="drag-area" id="In-Progress" 
                    ondrop="moveTo('In-Progress',progressArr)"
                    ondragleave="removeHighlight('In-Progress')"
                    ondragover="allowDrop(event); highlight('In-Progress')">
                    </div>
                    <div class="drag-area" id="Await-Feedback" 
                    ondrop="moveTo('Await-Feedback',awaitArr)" 
                    ondragleave="removeHighlight('Await-Feedback')"
                    ondragover="allowDrop(event); highlight('Await-Feedback')">
                    </div>
                    <div class="drag-area" id="Done" 
                    ondrop="moveTo('Done',doneArr)" 
                    ondragleave="removeHighlight('Done')"
                    ondragover="allowDrop(event); highlight('Done')">
                    </div>
                </div>
            </div>
    `
}

// let todos = [{
//     'id': 0,
//     'title': 'Putzen',
//     'status': 'open'
// }, {
//     'id': 1,
//     'title': 'Kochen',
//     'status': 'in-progress'
// }, {
//     'id': 2,
//     'title': 'Einkaufen',
//     'status': 'closed'
// },
// {
//     'id': 3,
//     'title': 'Putzen',
//     'status': 'open'
// }, {
//     'id': 4,
//     'title': 'Kochen',
//     'status': 'in-progress'
// }, {
//     'id': 5,
//     'title': 'Einkaufen',
//     'status': 'closed'
// }];

// To-Do
// In-Progress
// Await-Feedback
// Done


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

function taskFilter(arr,string, parentArr){
    let statusArr = arr.filter(t=>t.status == string);
    console.log(statusArr)
    for(let j = 0; j<statusArr.length; j++){
        statusArr[j].id=j
    }
    document.getElementById(string).innerHTML='';
    for(let i = 0; i<statusArr.length; i++){
        const element = statusArr[i];
        document.getElementById(string).innerHTML+=generateTodoHTML(element,i)
    }
    return parentArr.splice(0,statusArr.length,[...statusArr])
}

function updateHTML() {
    taskFilter(allTasks,"Await-Feedback", awaitArr);
    taskFilter(allTasks,"Done", doneArr);
    taskFilter(allTasks,"To-Do", todoArr);
    taskFilter(allTasks,"In-Progress",progressArr)



    // let open = allTasks.filter(t => t['status'] == 'open');
    // document.getElementById('open').innerHTML = '';
    // for (let index = 0; index < open.length; index++) {
    //     const element = open[index];
    //     document.getElementById('open').innerHTML += generateTodoHTML(element);
    // }

    // let in_progress = allTasks.filter(t => t['status'] == 'in-progress');
    // document.getElementById('in-progress').innerHTML = '';
    // for (let index = 0; index < in_progress.length; index++) {
    //     const element = in_progress[index];
    //     document.getElementById('in-progress').innerHTML += generateTodoHTML(element);
    // }

    // let closed = allTasks.filter(t => t['status'] == 'closed');
    // document.getElementById('closed').innerHTML = '';
    // for (let index = 0; index < closed.length; index++) {
    //     const element = closed[index];
    //     document.getElementById('closed').innerHTML += generateTodoHTML(element);
    // }

    // let closed = allTasks.filter(t => t['status'] == 'closed');
    // document.getElementById('closed').innerHTML = '';
    // for (let index = 0; index < closed.length; index++) {
    //     const element = closed[index];
    //     document.getElementById('closed').innerHTML += generateTodoHTML(element);
    // }
}

function startDragging(id) {
    currentDraggedElement = id;
}

function generateTodoHTML(element, index) {
    return /*html*/`
    <div id=${element.status}${index} draggable="true" ondragstart="startDragging(${index})" class="todo">
        <div class="drag-headline">${element.status}</div>
        <div class="todo-content">${element.title}</div>
    </div>
    `
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(status, arr) {
    arr[currentDraggedElement]['status'] = status;
    updateHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area-highlight');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area-highlight');
}