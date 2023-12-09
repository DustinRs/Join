let prioArray = [];

async function init() {
  await getAllTasks(tasksKey);
  await getContacts(contactKey);
  getUser(sessionKey);
  renderAddTaskPage(activeUser)
  checkInputs();
  setupInputListeners();
  addAssignees()
}

function renderAddTaskPage(activeUser) {
  let header = document.querySelector('header');
  let nav = document.querySelector('nav');
  let taskContainer = document.createElement('div')
  taskContainer.id = 'task-container'
  header.innerHTML = renderHeader(activeUser);
  nav.innerHTML = renderNavBar();
  document.querySelector('main').append(taskContainer);
  taskContainer.innerHTML = renderAddTaskSections()
}

async function addTask(status) {
  let title = document.getElementById("title").value;
  let taskArr;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = getPrioValue();
  let category = document.getElementById("category").value;
  let task = {
    title: title,
    description: description,
    date: date,
    prio: prio,
    category: category,
    status: status,
    subTaskCounter:0,
    subTask: taskArr=[...subTasks],
    id: Date.now()
  };
  allTasks.push(task);
  setAllTasks(tasksKey, allTasks);
}


function checkInputs() {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;

  let button = document.querySelector(".createTaskButton");

  if (title && description && date && category) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "true");
  }
}

function setupInputListeners() {
  const inputIds = ["title", "description", "date", "category"];

  inputIds.forEach((id) => {
    const input = document.getElementById(id);

    if (input) {
      console.log(`Element with ID ${id}:`, input);
      input.addEventListener("input", checkInputs);
    } else {
      console.error(`Element with ID ${id} not found.`);
    }
  });
}

function checkBoxClicked(priority) {
  let checkbox = document.getElementById(priority);
  let image = document.getElementById(priority + "-img");
  let span = document.getElementById(priority + "-span");
  resetColor()
  if (checkbox.checked) {
    deactivateOtherCheckboxes(priority);
    span.style.backgroundColor = getColor(priority);
    changeImageSrc(priority, image);
  } else {
    image.src = "/assets/img/" + priority.toLowerCase() + "-priority.png";
  }
}


function resetColor(){
  let span= document.getElementsByClassName('priority-span');
  for (let i = 0; i < span.length; i++) {
    span[i].style.backgroundColor = "";
  }
}


function deactivateOtherCheckboxes(currentPriority) {
  const priorities = ["urgent", "medium", "low"];
  for (const priority of priorities) {
    if (priority !== currentPriority) {
      document.getElementById(priority).checked = false;
      document.getElementById(
        priority
      ).parentNode.parentNode.style.backgroundColor = "";
      document
        .getElementById(priority)
        .closest(".prio")
        .querySelector(".prioImgs").src =
        "/assets/img/" + priority.toLowerCase() + "-priority.png";
    }
  }
  pushCurrentPriority(currentPriority);
}

function pushCurrentPriority(currentPriority) {
  if (prioArray.length > 0) {
    prioArray[0] = currentPriority;
  } else {
    prioArray.push(currentPriority);
  }
}

function getColor(priority) {
  switch (priority) {
    case "urgent":
      return "#FF3D00";
    case "medium":
      return "#FFA800";
    case "low":
      return "#7AE229";
    default:
      return "";
  }
}

function changeImageSrc(priority, image) {
  let basePath = "/assets/img/";
  let activeFileName = priority.toLowerCase() + "-active.png";
  let newSrc = basePath + activeFileName;

  checkImageExists(newSrc, function (exists) {
    if (exists) {
      if (image instanceof HTMLImageElement) {
        image.onload = function () { };

        image.onerror = function () { };

        image.src = newSrc;
      } else {
      }
    } else {
    }
  });
}

function checkImageExists(url, callback) {
  let img = new Image();
  img.onload = function () {
    callback(true);
  };
  img.onerror = function () {
    callback(false);
  };
  img.src = url;
}


function getPrioValue() {
  let arr = prioArray.slice(-1)
  return arr[0]
}


function addAssignees() {
  let box = document.getElementById('assign-list')
  let contactArr = [];
  contacts.map((e)=>{if(e.firstName.length!==0){contactArr.push(e)}})
  box.innerHTML = ''
  for (let i = 0; i < contactArr.length; i++) {
    let name = contactArr[i].firstName
      box.innerHTML +=/*html*/`
        <li class=contact>
         <div class="profile">
          <div class="icon">*Bild*</div>
          <div class="name">${name} ${contactArr[i].name}</div>
        </div>
        <div class="checkbox-container">
          <input type="checkbox" id="check${i}">
          <img id="img-box${i}" src="/assets/img/checkbox.png" onclick="checkboxClick(${i})" alt="checkbox">
        </div>        
      </li>
      `
  }
}


function setValue(string) {
  let input = document.getElementById('category')
  input.setAttribute('value', string)
}

function openList(containerID, inputID, ulID, iconID) {
  let ul = document.getElementById(ulID);
  if (ul.classList.contains('d-none')) {
    let input = document.getElementById(inputID);
    let container = document.getElementById(containerID);
    let btn = document.getElementById(iconID);
    btn.style = 'transform:rotate(180deg)'
    input.style = 'z-index:6'
    container.style = 'z-index:6'
    ul.classList.remove('d-none')
    ul.style = 'z-index:5'
  } else {
    return closeList(containerID, inputID, ulID, iconID)
  }
}


function closeList(containerID, inputID, ulID, iconID) {
  let input = document.getElementById(inputID);
  let container = document.getElementById(containerID);
  let ul = document.getElementById(ulID);
  let btn = document.getElementById(iconID);
  btn.style = ''
  input.style = ''
  container.style = ''
  ul.classList.add('d-none')
  ul.style = ''
  input.blur()
}


function subTaskActive() {
  let plus = document.getElementById('sub-btn-plus');
  let subBtn = document.getElementById('sub-btn');
  plus.classList.add('d-none');
  subBtn.classList.remove('d-none');
}


function subTaskClose() {
  let plus = document.getElementById('sub-btn-plus');
  let subBtn = document.getElementById('sub-btn');

  plus.classList.remove('d-none');
  subBtn.classList.add('d-none');
}


function pushSubTasks(){
  let task = document.getElementById('subtask-input')
  if(task.value.length > 0){
    subTasks.push(task.value)
    task.value = ''
    renderSubTasksList()
    return subTaskClose()
  }else if(task.value.length == 0){
    task.setCustomValidity('Kindly type in a subtask before adding one.')
    task.reportValidity()
  }
}


function clearAll(){
  let input = document.querySelectorAll('input');
  let textarea = document.querySelectorAll('textarea');
  for (let i = 0; i < input.length; i++) {
    input[i].value = '';
  }
  for (let i = 0; i < textarea.length; i++) {
    textarea[i].value = '';
  }
}