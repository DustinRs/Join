const STORAGE_TOKEN = "QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let toDo=[];
let allTasks = [];
let key = "notes";

async function init() {
 await getItem(key);
  renderNotes();
}

 function todoFilter(){
  toDo.push(allTasks.filter((e)=>e.category == "done"));
  console.log(toDo)
  return toDo
}

 function renderNotes() {
     todoFilter();
    let container = document.querySelector('main');
    
    container.innerHTML = `<div class="grid-container1">
    <div id="To-Do" class="grid-item"></div>
    <div id="Done" class="grid-item">${toDo[0].length}</div>
  </div>
  <div class="grid-container2">
    <div id="urgent" class="grid-item"></div>
  </div>
  <div class="grid-container3">
    <div id="taskInBoard" class="grid-item"></div>
    <div id="taskInProgress" class="grid-item"></div>
    <div id="awaitingFeedback" class="grid-item"></div>
  </div>`;

}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
 await fetch(url)
 .then((res) => res.json())
 .then(json=>{
  let arr=json.data.value;
  allTasks = JSON.parse(arr)
  return allTasks
 });
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}