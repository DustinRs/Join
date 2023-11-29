const STORAGE_TOKEN = "QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let allTasks = [];
let toDo = [];
let done = [];
let inProgress = [];
let awaitFeedback = [];
let urgent = [];
let key = "allTasks";

async function init() {
  await getItem(key);
  renderNotes();
}

 async function categoryFilter(){
  toDo.push(allTasks.filter((e)=>e["category"] == "To Do"));
  done.push(allTasks.filter((e)=>e["category"] == "Done"));
  inProgress.push(allTasks.filter((e)=>e["category"] == "In Progress"));
  awaitFeedback.push(allTasks.filter((e)=>e["category"] == "Await Feedback"));
  return toDo, done, inProgress, awaitFeedback;
}
async function prioFilter(){
    urgent.push(allTasks.filter((e) => e["prio"] == "urgent"));
    console.log(allTasks);
    return urgent;
    
  }

function renderNotes() {
    categoryFilter();
    prioFilter();

  let container = document.querySelector('main');

    container.innerHTML = `<div class="grid-container1">
    <div id="To-Do" class="grid-item"><img src="/assets/img/pen-frame.png" alt=""><div><h1>${toDo[0].length}</h1><span>To do</span></div></div>
    <div id="Done" class="grid-item"><img src="/assets/img/checkmark-frame.png" alt=""><div><h1>${done[0].length}</h1> <span>Done</span></div></div>
  </div>
  <div class="grid-container2">
    <div id="urgent" class="grid-item"><div class="displayFlex"><img src="/assets/img/arrow-up.png" alt=""><div><h1>${urgent[0].length}</h1><span>Urgent</span></div></div><div class="lineUrgent"></div>
    <div class="deadline">
      <span><b>Datum</b></span>
      <span>Upcoming Deadline</span>
    </div>
  </div></div>
  <div class="grid-container3">
    <div id="taskInBoard" class="grid-item deadline"><h1>${allTasks.length}</h1><span>Tasks in <br>Board</span></div>
    <div id="taskInProgress" class="grid-item deadline"><h1>${inProgress[0].length}</h1><span>Tasks in <br>Progress</span></div>
    <div id="awaitingFeedback" class="grid-item deadline"><h1>${awaitFeedback[0].length}</h1><span>Awaiting <br>Feedback</span></div>
    </div>
  `;
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
