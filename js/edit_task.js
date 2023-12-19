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
  let taskArr;
  let description = document.getElementById("description").value;
  let date = document.getElementById("date").value;
  let category = document.getElementById("category").value;
  let task = createEditTaskObject(
    status,
    title,
    taskArr,
    description,
    date,
    category,
    prio
  );
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
function createEditTaskObject(
  status,
  title,
  taskArr,
  description,
  date,
  category,
  prio
) {
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
 * Adds event listeners to input elements in the document.
 *
 * @param {None} None
 * @return {None} None
 */
function addInputHandler() {
  let title = document.getElementById("title");
  let description = document.getElementById("description");
  let date = document.getElementById("date");
  let assignSelect = document.getElementById("assign-select");
  let categorySelect = document.getElementById("category-select");
  title.addEventListener("click", addTitleListener);
  description.addEventListener("click", addDescriptionListener);
  date.addEventListener("focusout", validateDateInput);
  assignSelect.addEventListener("click", setClosingAssign);
  categorySelect.addEventListener("click", setClosingCategory);
}

/**
 * Adds a title listener to the 'title' input element.
 *
 * @param {HTMLElement} input - The input element to attach the listener to.
 * @return {void} This function does not return a value.
 */
function addTitleListener() {
  let input = document.getElementById("title");
  input.addEventListener("input", validateTitleInput);
}

/**
 * Adds a description listener to the input element with the id 'description'.
 *
 * @param {Element} input - The input element to add the listener to.
 * @return {void} No return value.
 */
function addDescriptionListener() {
  let input = document.getElementById("description");
  input.addEventListener("input", validateDescriptionInput);
}

/**
 * Validates the title input field.
 *
 * @return {boolean} Returns true if the title input field is valid, false otherwise.
 */
function validateTitleInput() {
  let title = document.getElementById("title");
  let container = document.getElementById("add-task-titlte-container");
  let message =
    document.getElementById("title-requirement") ||
    document.getElementById("title-requirement-edit");
  let btn =
    document.getElementById("createTaskButton") ||
    document.getElementById("edit-ok-btn");
  if (title.value.length === 0) {
    container.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
    message.classList.remove("d-none");
    btn.disabled = true;
  } else {
    message.classList.add("d-none");
    container.style = "";
    return true;
  }
}

/**
 * Validates the input of the description field.
 *
 * @return {boolean} Returns true if the description field is not empty, false otherwise.
 */
function validateDescriptionInput() {
  let description = document.getElementById("description");
  let container = document.getElementById("area-container");
  let message =
    document.getElementById("description-requirement") ||
    document.getElementById("description-requirement-edit");
  let btn =
    document.getElementById("createTaskButton") ||
    document.getElementById("edit-ok-btn");
  if (description.value.length === 0) {
    container.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
    message.classList.remove("d-none");
    btn.disabled = true;
  } else {
    container.style = "";
    message.classList.add("d-none");
    return true;
  }
}

/**
 * Validates the date input provided by the user.
 *
 * @return {boolean} Returns true if the date input is valid, false otherwise.
 */
function validateDateInput() {
  let input = document.getElementById("date");
  let div = document.getElementById("add-task-date-input");
  let selectedDate = new Date(input.value);
  let currentDate = new Date();
  let message =
    document.getElementById("date-requirement") ||
    document.getElementById("date-requirement-edit");
  let btn =
    document.getElementById("createTaskButton") ||
    document.getElementById("edit-ok-btn");
  if (selectedDate == "Invalid Date") {
    div.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
    message.classList.remove("d-none");
    btn.disabled = true;
  } else if (selectedDate < currentDate) {
    div.style = "box-shadow: inset 0 0 1px 1px #FF4646!important;";
    message.classList.remove("d-none");
    btn.disabled = true;
  } else {
    message.classList.add("d-none");
    div.style = "";
    return true;
  }
}

/**
 * Checks the selected category and enables or disables the create task button
 * based on the category value.
 *
 * @return {boolean} Returns true if the category is "Technical Task" or "User Story",
 *                   otherwise returns false.
 */
function categoryResponse() {
  let category = document.getElementById("category");
  let btn =
    document.getElementById("createTaskButton") ||
    document.getElementById("edit-ok-btn");
  if (category.value == "Technical Task" || category.value == "User Story") {
    return true;
  } else {
    btn.disabled = true;
    return false;
  }
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
 * Sets the closing category functionality.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function setClosingCategory() {
  let categoryContainer = document.getElementById("category-select");
  let categoryInput = document.getElementById("category");
  let btn = document.getElementById("category-icon");
  let body = document.querySelector("body");
  let list = document.getElementById("category-ul");
  body.addEventListener("click", function (event) {
    if (
      event.target != categoryContainer &&
      event.target != categoryInput &&
      event.target != btn &&
      event.target != list
    ) {
      closeList("category-select", "category", "category-ul", "category-icon");
    }
  });
  categoryContainer.removeEventListener("click", setClosingCategory);
}

/**
 * Sets the closing assign behavior.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function setClosingAssign() {
  let assignContainer = document.getElementById("assign-select");
  let assignInput = document.getElementById("assign");
  let btn = document.getElementById("assign-icon");
  let body = document.querySelector("body");
  let list = document.getElementById("assign-ul");
  body.addEventListener("click", function (event) {
    if (
      event.target != assignContainer &&
      event.target != assignInput &&
      event.target != btn &&
      event.target != list
    ) {
      closeList("assign-select", "assign", "assign-ul", "assign-icon");
    }
  });
  assignContainer.removeEventListener("click", setClosingAssign);
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
    subLiArr.push(`<div class="subTaskListFlex"><li class="single-subtask" onclick="editListItem(${i})" id="${i}">${sub}</li><img class="deleteSubtaskImg" onclick="deleteSubtask(${i})" src="/assets/img/delete.png" alt=""></div>`);
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
 * Sets the subtasks to be editable.
 *
 * @param {Array} subTasks - The array of subtasks.
 * @return {void} This function does not return anything.
 */
function setEditableSubtask() {
  if (subTasks.length > 0) {
    let subtaskListItems = document.getElementsByClassName("single-subtask");
    for (let i = 0; i < subtaskListItems.length; i++) {
      let sub = subtaskListItems[i];
      console.log(sub);
      sub.addEventListener("dblclick", (event) => {
        console.log(sub.id);
        editListItem(sub.id);
      });
    }
  }
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

function editListItem(id) {
  // Erstelle ein textInput-Element
  let item = document.getElementById(`${id}`);
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.value = item.textContent;
  textInput.classList.add("subtask-input");
  textInput.classList.add("edit-input");

  // Ersetze das li-Element durch das textInput-Element
  item.parentNode.replaceChild(textInput, item);

  // Füge ein Eventlistener für die "Enter"-Taste hinzu, um die Bearbeitung zu beenden
  textInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      // Beende die Bearbeitung und setze den neuen Text im li-Element
      item.textContent = textInput.value;
      // Ersetze das textInput-Element durch das ursprüngliche li-Element
      textInput.parentNode.replaceChild(item, textInput);
    }
  });

  // Setze den Fokus auf das Texteingabefeld
  textInput.focus();
}

async function deleteSubtask(index) {
    // Check if the index is within the valid range
    if (index >= 0 && index < subTasks.length) {
        // Splice removes 1 element at the specified index
        subTasks.splice(index, 1);
        console.log("Subtask at index", index, "deleted.");
    } else {
        console.error("Invalid index:", index);
    }
}

/**
 * Adds event listeners to the full name and email input fields in the profile form.
 * When the full name input field is changed, it checks for duplicate names and displays an error message if found.
 * When the email input field is changed, it checks for duplicate emails and displays an error message if found.
 *
 * @param {HTMLElement} fullName - The input field for the full name.
 * @param {HTMLElement} email - The input field for the email.
 * @return {boolean} Returns true if a duplicate name or email is found, otherwise returns undefined.
 */
function addContactFormListener() {
  let fullName = document.getElementById("profileName");
  let email = document.getElementById("profileEmail");
  fullName.addEventListener("input", () => {
    if (checkForDuplicateName(fullName.value)) {
      fullName.setCustomValidity(doubleName);
      return true;
    } else {
      fullName.setCustomValidity("");
    }
  });
  email.addEventListener("input", () => {
    if (checkForDuplicateMail(email.value)) {
      email.setCustomValidity(doubleMail);
      return true;
    } else {
      email.setCustomValidity("");
    }
  });
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
