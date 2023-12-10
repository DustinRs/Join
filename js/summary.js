let toDo = [];
let done = [];
let inProgress = [];
let awaitFeedback = [];
let urgent = [];


async function init() {
  await getAllTasks(remoteKey);
  getUser(sessionKey);
  renderNotes(activeUser);
  navActive(0)
}

async function statusFilter() {
  clearSubArrays(toDo, done, inProgress, awaitFeedback, urgent);
  hasContent(toDo, "status", "To-Do")
  hasContent(done, "status", "Done")
  hasContent(inProgress, "status", "In-Progress")
  hasContent(awaitFeedback, "status", "Await-Feedback")
  hasContent(urgent, "prio", "urgent")
}


function renderNotes(activeUser) {
  statusFilter();
  let nav = document.querySelector('nav');
  let header=document.querySelector('header')
  let main = document.querySelector('main');
  nav.innerHTML = renderNavBar();
  header.innerHTML = renderHeader(activeUser);
  main.innerHTML = gridContainer();
  let grid = document.getElementById('grid')
  grid.innerHTML += greeting(activeUser)
}


function hasContent(statusArray, property, string) {
  let arr = allTasks.filter((e) => e[property] == string)
  if (arr.length!=0) {
    statusArray.splice(0, statusArray.length, ...arr);
    return statusArray
  }
}

function clearSubArrays(...array) {
  return array.length = 0
}