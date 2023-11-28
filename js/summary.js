let allTasks = [
    {
        title: title,
        description: description,
        date: date,
        prio: prio,
        category: category,
        subTask: subTask,
      },
      {
        title: title,
        description: description,
        date: date,
        prio: prio,
        category: category,
        subTask: subTask,
      },
      {
        title: title,
        description: description,
        date: date,
        prio: prio,
        category: category,
        subTask: subTask,
      },
      {
        title: title,
        description: description,
        date: date,
        prio: prio,
        category: category,
        subTask: subTask,
      },
];




function init() {
    renderNotes();
}

function renderNotes() {
    let container = document.querySelector('main');
    
    container.innerHTML = `<div class="grid-container1">
    <div id="To-Do" class="grid-item">${toDo.length}</div>
    <div id="Done" class="grid-item">${done.length}</div>
  </div>
  <div class="grid-container2">
    <div id="urgent" class="grid-item">${urgent.length}</div>
  </div>
  <div class="grid-container3">
    <div id="taskInBoard" class="grid-item">${tasksInBoard.length}</div>
    <div id="taskInProgress" class="grid-item">${inProgress.length}</div>
    <div id="awaitingFeedback" class="grid-item">${awaitingFeedback.length}</div>
  </div>`;

}