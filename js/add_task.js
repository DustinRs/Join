/**
 * Array wich contains the priority of an created Task
 */
let prioArray = [];

/**
 * Initializes the application by performing the necessary setup tasks.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function init() {
  await getAllTasks(tasksKey);
  await getContacts(contactKey);
  getUser(sessionKey);
  renderAddTaskPage(activeUser);
  navActive(1);
  addAssigneesSelection();
  addInputHandler();
  addSubtaskListener();
  clickMedium('medium')
}

/**
 * Renders the task creation page for the active user.
 * 
 * @param {any} activeUser - The active user object.
 */
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

/**
 * Pushes the created task into the 'allTasks' array.
 * 
 * @param {string} status - The status of the task.
 */
async function addTask(status) {
  let title = document.getElementById("title").value;
  let taskArr;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let prio = getPrioValue();
  let category = document.getElementById("category").value;
  let task = createNewTaskObject(title, taskArr, description, date, prio, category, status);
  allTasks.push(task);
  await setAllTasks(tasksKey, allTasks);
  assignees = [];
  subTasks = [];
  let btn = document.getElementById('createTaskButton');
  btn.disabled = true
  pushInfo();
}


/**
 * Creates a new task by taking the value of the inputfields.
 * 
 * @param {string} title - This is the 'title' value.
 * @param {string} taskArr - ?
 * @param {string} description - This is the 'description' value.
 * @param {string} date - This is the 'date' value.
 * @param {string} prio - This is the 'prio' value.
 * @param {string} category - This is the 'category' value.
 * @param {string} status - This is the 'status' value.
 * @returns 
 */
function createNewTaskObject(title, taskArr, description, date, prio, category, status) {
  let task = {
    title: title,
    description: description,
    date: date,
    prio: prio || "low",
    category: category,
    status: status,
    counter: 0,
    subTask: taskArr = [...subTasks],
    finishedTaskList: [],
    id: Date.now(),
    assignees: assignees,
    totalSubTasks: subTasks.length
  }; return task
}

/**
 * Gets the priority by wich one of the priority buttons is clicked.
 * 
 * @param {string} priority - The priority button thats clicked.
 */
function checkBoxClicked(priority) {
  let checkbox = document.getElementById(priority);
  let image = document.getElementById(priority + "-img");
  let span = document.getElementById(priority + "-span");
  resetColor()
  if (checkbox.checked) {
    deactivateOtherCheckboxes(priority);
    span.style.backgroundColor = getColor(priority);
    changeImageSrc(priority, image);
  } else {image.src = "/assets/img/" + priority.toLowerCase() + "-priority.png"}
}


/**
 * A function that handles the click event on medium priority
 * for every new task/todo by default.
 *
 * @param {string} priority - The priority of the medium element.
 */
function clickMedium(priority){
  let image = document.getElementById(priority + "-img");
  let span = document.getElementById(priority + "-span");
  deactivateOtherCheckboxes(priority);
    span.style.backgroundColor = getColor(priority);
    changeImageSrc(priority, image);
}


/**
 * Resets the color if the priority button is not clicked anymore.
 */
function resetColor() {
  let span = document.getElementsByClassName('priority-span');
  for (let i = 0; i < span.length; i++) {
    span[i].style.backgroundColor = "";
  } checkBoxClicked
}


/**
 * Deactivates the color of the priority buttons that are not clicked anymore.
 */
function deactivateOtherCheckboxes(currentPriority) {
  const priorities = ["urgent", "medium", "low"];
  for (const priority of priorities) {
    if (priority !== currentPriority) {
      document.getElementById(priority).checked = false;
      document.getElementById(priority).parentNode.parentNode.style.backgroundColor = "";
      document
        .getElementById(priority)
        .closest(".prio")
        .querySelector(".prioImgs").src =
        "/assets/img/" + priority.toLowerCase() + "-priority.png";
    }
  }
  pushCurrentPriority(currentPriority);
}


/**
 * Pushes the selected priority into the 'prioArray' array.
 * 
 * @param {string} currentPriority - The selected priority.
 */
function pushCurrentPriority(currentPriority) {
  if (prioArray.length > 0) {
    prioArray[0] = currentPriority;
  } else {
    prioArray.push(currentPriority);
  }
}


/**
 * Changes the backgroundcolor of the selected priority.
 * 
 * @param {string} priority - The selected priority.
 * @returns the backgroundcolor of the selected priority.
 */
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


/**
 * Changes the imagepath of the selected priority.
 * 
 * @param {string} priority - The selected priority.
 * @param {source} image - The image of the selected priority.
 */
function changeImageSrc(priority, image) {
  let basePath = "/assets/img/";
  let activeFileName = priority.toLowerCase() + "-active.png";
  let newSrc = basePath + activeFileName;
  checkImageExists(newSrc, function (exists) {
    if (exists) {
      if (image instanceof HTMLImageElement) {
        image.onload = function () { };
        image.onerror = function () { };
        image.src = newSrc} 
    } 
  });
}

/**
 * Checks if the image source is correct.
 * 
 * @param {source} url - The source of the image.
 * @param {string} callback - The function that checks the image.
 */
function checkImageExists(url, callback) {
  let img = new Image();
  img.onload = function () {
    callback(true);};
  img.onerror = function () {
    callback(false);};
  img.src = url;
}


/**
 * 
 * @returns the value of the 'prioArray' array.
 */
function getPrioValue() {
  let arr = prioArray.slice(-1)
  return arr[0]
}


/**
 * Sets the value of the priority from the current task.
 * 
 * @param {string} string - The current priority.
 */
function setValue(string) {
  let input = document.getElementById('category')
  input.innerText = string
  input.setAttribute('placeholder', string)
  input.setAttribute('value', string)
}


/**
 * Clears the category value from the current task. 
 */
function clearCategoryValue() {
  let input = document.getElementById('category')
  input.innerText = ''
  input.setAttribute('placeholder', 'Select task category')
  input.setAttribute('value', '');
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
  } else {return closeList(containerID, inputID, ulID, iconID)}
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


function pushSubTasks() {
  let task = document.getElementById('subtask-input')
  if (task.value.length > 0) {
    subTasks.push(task.value)
    task.value = ''
    renderSubTasksList()
    return subTaskClose()
  } else if (task.value.length == 0) {
    task.setCustomValidity('Kindly type in a subtask before adding one.')
    task.reportValidity()}
}


function clearAll() {
  clearAssignees()
  let input = document.querySelectorAll('input');
  let textarea = document.querySelectorAll('textarea');
  for (let i = 0; i < input.length; i++) {
    input[i].value = '';}
    for (let i = 0; i < textarea.length; i++) {
      textarea[i].value = '';};
  clearCategoryValue()
  let btn = document.getElementById('createTaskButton')||document.getElementById('edit-ok-btn');
  btn.disabled = true
}


function clearAssignees(){
  let clickList = [];
  clickList.push(...assignees)
  for(let i=0; i < clickList.length; i++){
    addboxClick(clickList[i])
  }
}


function pushInfo() {
  let info = document.getElementById('info')
  info.classList.add('push-up');
  setTimeout(() => {goToBoard()}, 2000)
};


function goToBoard() {
  window.location.href = '/html/board.html';
};


function addboxClick(i) {
  let checkbox = document.getElementById(`check${i}`);
  let img = document.getElementById(`img-box${i}`);
  logTaskCheckBox(checkbox, img, i);
  renderEditIcons()
}


function logTaskCheckBox(box, img, i) {
  if (box.checked) {
    box.checked = false;
    img.src = '/assets/img/checkbox.png';
    img.style = "";
    assignees.splice(assignees.indexOf(i), 1)
  } else if (!box.checked) {
    box.checked = true;
    img.src = '/assets/img/checked-box.png';
    img.style = 'width: 18px; height: 18px;transform:translate(6px,0px);margin-right:12px;right:.8rem';
    assignees.push(contacts[i].id)
  }
}


function addSubtaskListener() {
  let input = document.getElementById('subtask-input')
  input.addEventListener('keyup', function (event) {
    if (event.key === 'Enter' && input.value.length > 0) {
      pushSubTasks();
    } else if (event.key === 'Enter' && input.value.length == 0) {
      event.preventDefault();}
  });
}


function pushEditAssignees(task) {
  assignees = [];
  let index = task.assignees
  index.forEach((element) => {addboxClick(element)})
}


function editPrio(newPrio) {editArr = [newPrio]}


function checkAllInputs(){
  let btn = document.getElementById('createTaskButton')||document.getElementById('edit-ok-btn');
  if(validateTitleInput() && validateDescriptionInput() && validateDateInput()&& categoryResponse()){
    btn.disabled = false;}
}

