let allTasks = [];
let toDo = [];
let done = [];
let inProgress = [];
let awaitFeedback = [];
let urgent = [];


async function init() {
  await getAllTasks(remoteKey);
  getUser(sessionKey);
  renderNotes(activeUser)
}

async function categoryFilter() {
  toDo.push(allTasks.filter((e) => e["category"] == "To Do"));
  done.push(allTasks.filter((e) => e["category"] == "Done"));
  inProgress.push(allTasks.filter((e) => e["category"] == "In Progress"));
  awaitFeedback.push(allTasks.filter((e) => e["category"] == "Await Feedback"));
  return toDo, done, inProgress, awaitFeedback;
}
async function prioFilter() {
  urgent.push(allTasks.filter((e) => e["prio"] == "urgent"));
  console.log(allTasks);
  return urgent;

}

 function renderNotes(activeUser) {
  categoryFilter();
  prioFilter();
  let body = document.querySelector('body');
  body.innerHTML = renderNavBar();
  body.innerHTML += renderHeader(activeUser);
  let main = document.querySelector('main');
  main.innerHTML = gridContainer();
  let grid = document.getElementById('grid')
  grid.innerHTML += greeting(activeUser)
}


