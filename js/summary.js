const STORAGE_TOKEN = "QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let allTasks = [];
let key = "notes";

function init() {
  renderNotes();
}

/*
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
*/
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then((res) => res.json());
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}