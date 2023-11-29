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
  renderNotes();
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
  let section = document.querySelector('section');
  section.innerHTML = renderHeader();
  section.innerHTML += renderH1();
  let container = document.querySelector('main');
  container.innerHTML = gridContainer();
  container.innerHTML += greeting(activeUser)
}

async function getItem(remoteKey) {
  const url = `${STORAGE_URL}?key=${remoteKey}&token=${STORAGE_TOKEN}`;
  await fetch(url)
    .then((res) => res.json())
    .then(json => {
      let arr = json.data.value;
      allTasks = JSON.parse(arr)
      return allTasks
    });

}

function getUser(sessionKey) {
  return activeUser = sessionStorage.getItem(sessionKey)
}
