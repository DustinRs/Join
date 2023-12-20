// date form-validation, title description, (addinputhandler)listener,

/**
 * Pushes the eddited task into the 'allTasks' array.
 *
 * @param {string} status - The status of the task.
 * @param {string} index - The index of the task.
 * @param {string} prio - The prio of the task.
 */
async function editTodoInAllTasks(status, index, prio) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  let task = createEditTaskObject(status,title,description,date,category,prio);
  allTasks.splice(index, 1, task);
  await setAllTasks(tasksKey, allTasks);
  assignees = [];
  subTasks = [];
  finishedSubTasks = [];
  pushInfo();
}


/**
 * Creates an eddited task by taking the value of the inputfields.
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
function createEditTaskObject(status,title,description,date,category,prio) {
  let taskArr;
  let task = {
    title: title,
    description: description,
    date: date,
    prio: editArr[0] || prio,
    category: category,
    status: status,
    counter: finishedSubTasks.length,
    subTask: (taskArr = [...subTasks]),
    finishedTaskList: (taskArr = [...finishedSubTasks]),
    totalSubTasks: subTasks.length + finishedSubTasks.length,
    id: Date.now(),
    assignees: assignees,
  };
  return task;
}


/**
 * Generates a string representing the current date in the format 'YYYY-MM-DD'.
 *
 * @return {string} - A string representing the current date.
 */
function getMinDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Monate sind nullbasiert
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}


/**
 * Generate the function comment for the given function body.
 *
 * @param {array} subtaskList - The list of subtasks.
 * @param {array} finishedTaskList - The list of finished tasks.
 * @returns {array} The merged sublist and finished list.
 */
function getSubList(subtaskList, finishedTaskList) {
  let subLiArr = [];
  let finListArr = getEditFinishedList(finishedTaskList);
  for (let i = 0; i < subtaskList.length; i++) {
    let sub = subtaskList[i];
    subTasks.push(sub);
    subLiArr.push(`<li class="single-subtask" onclick="editListItem(${i})" id="${i}">${sub}</li>`);
  }
  return mergeSublists(subLiArr, finListArr);
}


/**
 * Generates a list of finished tasks with HTML list items.
 *
 * @param {Array} finishedTaskList - the list of finished tasks.
 * @return {Array} - the list of HTML list items representing the finished tasks.
 */
function getEditFinishedList(finishedTaskList) {
  let finLiArr = [];
  if (finishedTaskList.length === 0) {
    return false;
  }
  for (let i = 0; i < finishedTaskList.length; i++) {
    let fin = finishedTaskList[i];
    finishedSubTasks.push(fin);
    finLiArr.push(`<li class="single-finished-task" id="f${i}">${fin}</li>`);
  }
  return finLiArr;
}


/**
 * Edits the subtask list with the specified ID.
 *
 * @param {string} id - The ID of the element containing the subtask list.
 * @return {undefined} This function does not return a value.
 */
function editSubaskList(id) {
  let subtaskList = document.getElementById(`${id}`).innerHTML;
  console.log(subtaskList);
  subtaskList.contentEditable = true;
  subtaskList.focus();
}

/**
 * Checks if a given name is a duplicate in the contacts list.
 *
 * @param {string} fullName - The name to check for duplicates.
 * @return {boolean} True if the name is a duplicate, false otherwise.
 */
function checkForDuplicateName(fullName) {
  for (let i = 0; i < contacts.length; i++) {
    if (fullName === contacts[i].fullName) {
      return true;
    }
  }
  return false;
}

/**
 * Checks if a given email is a duplicate in the contacts list.
 *
 * @param {string} mail - The email to check for duplicates.
 * @return {boolean} True if the email is a duplicate, false otherwise.
 */
function checkForDuplicateMail(mail) {
  for (let i = 0; i < contacts.length; i++) {
    if (mail === contacts[i].email) {
      return true;
    }
  }
  return false;
}
