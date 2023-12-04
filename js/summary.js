
const STORAGE_TOKEN = "QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let allTasks = [];
let toDo = [];
let done = [];
let inProgress = [];
let awaitFeedback = [];
let urgent = [];
let activeUser;
const sessionKey = "activeUser"
const remoteKey = "allTasks";

async function init() {
  await getItem(remoteKey);
  getUser(sessionKey);
  renderNotes()
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

 function renderNotes() {
   categoryFilter();
  prioFilter();
  let body = document.querySelector('body');
  body.innerHTML = renderNavBar();
  body.innerHTML += renderHeader();
  let main = document.querySelector('main');
  main.innerHTML = gridContainer();
  let grid = document.getElementById('grid')
  grid.innerHTML += greeting(activeUser)
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
 await fetch(url)
 .then((res) => res.json())
 .then(json=>{
  let arr=json.data.value;
  let parsedArr = JSON.parse(arr);
  Array.isArray(parsedArr) ? allTasks.push([...parsedArr]):allTasks.push(parsedArr);
  return allTasks
 });

}

function getUser(sessionKey) {
  return activeUser = sessionStorage.getItem(sessionKey)
}
