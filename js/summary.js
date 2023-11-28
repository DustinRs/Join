const STORAGE_TOKEN = "QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

let allTasks = [
<<<<<<< HEAD
  {
    title: "apfel",
    description: "description",
    date: "date",
    prio: "low",
    category: "in progress",
    subTask: "subTask",
  },
  {
    title: "banana",
    description: "description",
    date: "date",
    prio: "low",
    category: "toDo",
    subTask: "subTask",
  },
  {
    title: "citrus",
    description: "description",
    date: "date",
    prio: "medium",
    category: "await feedback",
    subTask: "subTask",
  },
  {
    title: "dattel",
    description: "description",
    date: "date",
    prio: "urgent",
    category: "done",
    subTask: "subTask",
  },
  {
    title: "eimer",
    description: "description",
    date: "date",
    prio: "prio",
    category: "done",
    subTask: "subTask",
  },
  {
    title: "fussball",
    description: "description",
    date: "date",
    prio: "urgent",
    category: "done",
    subTask: "subTask",
  }
=======
  // {
  //   title: "apfel",
  //   description: "description",
  //   date: "date",
  //   prio: "low",
  //   category: "in progress",
  //   subTask: "subTask",
  // },
  // {
  //   title: "banana",
  //   description: "description",
  //   date: "date",
  //   prio: "low",
  //   category: "toDo",
  //   subTask: "subTask",
  // },
  // {
  //   title: "citrus",
  //   description: "description",
  //   date: "date",
  //   prio: "medium",
  //   category: "await feedback",
  //   subTask: "subTask",
  // },
  // {
  //   title: "dattel",
  //   description: "description",
  //   date: "date",
  //   prio: "urgent",
  //   category: "done",
  //   subTask: "subTask",
  // },
  // {
  //   title: "eimer",
  //   description: "description",
  //   date: "date",
  //   prio: "prio",
  //   category: "done",
  //   subTask: "subTask",
  // },
  // {
  //   title: "fussball",
  //   description: "description",
  //   date: "date",
  //   prio: "urgent",
  //   category: "done",
  //   subTask: "subTask",
  // }
>>>>>>> a839c7aa0e24d349e1c843cb3edfcfafde74d99c
];
let key = "notes";

async function init() {
<<<<<<< HEAD
  await getItem(key)
  renderNotes();
}


function todoFilter() {
  let arr = allTasks.filter((e) => e["category"] == "done");
  console.log(arr)
}

function renderNotes() {
  let toDo = allTasks.filter((e) => e["category"] == "toDo");
  let done = allTasks.filter((e) => e["category"] == "done");
  let container = document.querySelector('main');

  container.innerHTML = `<div class="grid-container1">
    <div id="To-Do" class="grid-item">${toDo.length}</div>
    <div id="Done" class="grid-item">${done.length}</div>
    ...
=======
  getItem(key);
  renderNotes();
}

 async function todoFilter(){
  let arr = allTasks.filter((e)=>e["category"] == "done");
  return arr.length
}

function renderNotes() {
    let container = document.querySelector('main');
    
    container.innerHTML = `<div class="grid-container1">
    <div id="To-Do" class="grid-item"></div>
    <div id="Done" class="grid-item">${todoFilter()}</div>
  </div>
  <div class="grid-container2">
    <div id="urgent" class="grid-item"></div>
  </div>
  <div class="grid-container3">
    <div id="taskInBoard" class="grid-item"></div>
    <div id="taskInProgress" class="grid-item"></div>
    <div id="awaitingFeedback" class="grid-item"></div>
>>>>>>> a839c7aa0e24d349e1c843cb3edfcfafde74d99c
  </div>`;
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
<<<<<<< HEAD
  fetch(url).then((res) => res.json());
  fetch(url)
    .then((res) => res.json())
    .then(json => {
      return allTasks = json.data.value;
    });
=======
 fetch(url)
 .then((res) => res.json())
 .then(json=>{
  let arr=json.data.value;
  allTasks = JSON.parse(arr)
  return allTasks
 });
>>>>>>> a839c7aa0e24d349e1c843cb3edfcfafde74d99c
}


async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}