let userList;
let data;
const key = "userList";
const STORAGE_TOKEN = 'QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
  // Create a payload object with the key, value, and STORAGE_TOKEN
  const payload = { key, value, token: STORAGE_TOKEN };

  // Make a POST request to STORAGE_URL with the payload as the request body
  const response = await fetch(STORAGE_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  // Parse the response as JSON and return the result
  return await response.json();
}


async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fehler beim Laden der Kontakte");
    }
    const data = await response.json();
    userList = JSON.parse(data.data.value);
    console.log(userList);
  } catch (error) {
    console.error(error);
  }
}


/**
 * Initializes the application.
 *
 * @return {Promise<void>} A promise that resolves when initialization is complete.
 */
async function init() {
  setEventListener();
  addLogInHandler();
  await getItem(key)
}


/**
 * Sets event listeners for password input fields and lock icons.
 *
 * @param {type} None - No parameters required.
 * @return {type} None - No return value.
 */
function setEventListener() {
  let body = document.querySelector('body')
  let input = document.getElementsByClassName('password');
  let eye = document.getElementsByClassName('lock');
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('click', changeLock())
    eye[i].addEventListener('click', changeEye)
  }
  body.addEventListener('click', restoreLock)
}



/**
 * A function that changes the lock visibility based on user interaction.
 *
 * @param {type} None
 * @return {type} None
 */
function changeLock() {
  let eye = document.getElementsByClassName('lock');
  let input = document.getElementsByClassName('password');
  let container = document.getElementById('lock-container');
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('click', e => {
      if (e.target == input[i] && e.target != eye[i] && !eye[i].src.includes('visibility.png')) {
        eye[i].src = 'assets/img/visibility_off.png';
        container.classList.add('lock-container')
      };
    });
  }
}



/**
 * Restores the lock functionality when the body is clicked.
 *
 * @param {type} event - the click event object
 * @return {undefined} This function does not return a value
 */
function restoreLock() {
  let body = document.querySelector('body');
  let input = document.getElementsByClassName('password');
  let eye = document.getElementsByClassName('lock');
  let container = document.getElementById('lock-container');
  body.addEventListener('click', function (event) {
    for (let i = 0; i < input.length; i++) {
      if (event.target == body && event.target != input[i] && event.target != eye[i] && input[i].value == "") {
        eye[i].src = 'assets/img/lock.png';
        container.classList.remove('lock-container');
      }
    }
  });
}



/**
 * Toggles the visibility of password fields based on the state of the eye icon clicked.
 *
 * @param {Event} event - The event object that triggered the function.
 * @return {void} This function does not return a value.
 */
function changeEye(event) {
  let eye = document.getElementsByClassName('lock');
  let input = document.getElementsByClassName('password');
  for (let i = 0; i < input.length; i++) {
    if (event.target == eye[i] && eye[i].src.includes('visibility_off.png')) {
      input[i].setAttribute('type', 'text');
      eye[i].src = 'assets/img/visibility.png';
    } else if (event.target == eye[i] && eye[i].src.includes('visibility.png')) {
      input[i].setAttribute('type', 'password');
      eye[i].src = 'assets/img/visibility_off.png';
    }
  }
  event.stopPropagation();
}



/**
 * Adds a sign-up handler to the page.
 *
 * @param {void} None - No parameters are needed.
 * @return {void} No return value.
 */
function addSignUpHandler() {
  let password = document.getElementById("create_password");
  let confirm_password = document.getElementById("confirm_password");
  function validatePassword() {
    let div = document.getElementsByClassName("login-input-fields");
    for (let i = 2; i < div.length; i++) {
      if (password.value != confirm_password.value) {
        confirm_password.setCustomValidity("Passwords Don't Match"),
          div[i].style.border = "3px solid red";
          disableSignUp();
          return false
      } else if (confirm_password.value.length > 0) {
        div[i].style.border = "3px solid green"
        confirm_password.setCustomValidity('');
        enableSignUp();
        return true
      }
    }
  }
  password.oninput = validatePassword;
  confirm_password.oninput = validatePassword;
}

function formValidation(){
  if(addSignUpHandler){
     enableSignUp()
  }else{
    disableSignUp()
  }
}


/**
 * Enables the sign-up button if both the username and email input fields have a value.
 *
 * @param {string} username - The ID of the username input field.
 * @param {string} email - The ID of the email input field.
 * @param {string} button - The ID of the sign-up button.
 */
function enableSignUp() {
  let name = document.getElementById('username');
  let mail = document.getElementById('sign-up_mail');
  let button = document.getElementById('signup-btn');
  let checkbox = document.getElementById('check')
  if (name.value !== 0 && mail.value !== 0 && checkbox.checked) {
    button.disabled = false
  }
}

function disableSignUp(){
  let button = document.getElementById('signup-btn');
  button.disabled = true
}


/**
 * Adds a log in handler to the login form.
 *
 * @param {type} paramName - description of parameter
 * @return {type} description of return value
 */
function addLogInHandler() {
  let name = document.getElementById('login-mail');
  let password = document.getElementById('login-password');
  /**
   * Validates the log in by checking if the name and password meet the required criteria.
   *
   * @param {string} name - The name input value.
   * @param {string} password - The password input value.
   */
  function validateLogIn() {
    if (name.value.length > 0 && password.value.length > 7) {
      enableLogIn()
    }
  }
  name.oninput = validateLogIn;
  password.oninput = validateLogIn;
}


/**
 * Enables the login button if both the email and password fields are filled.
 *
 * @param {HTMLElement} name - The element representing the email field.
 * @param {HTMLElement} password - The element representing the password field.
 * @param {HTMLElement} button - The element representing the login button.
 */
function enableLogIn() {
  const name = document.getElementById('login-mail');
  const password = document.getElementById('login-password');
  const button = document.getElementById('login-btn')
  if (name.value !== 0 && password.value !== 0) {
    button.disabled = false
  }
}


function checkboxClick() {
  let checkbox = document.getElementById("check");
  let img = document.getElementById("checkbox");
  if(document.getElementById('signup-container')!=null){
    signUpCheckBox(checkbox, img)
  }else if(document.getElementById('login-container')!=null){
    loginCheckBox(checkbox, img)
  }
}

function loginCheckBox(box, img){
  if (box.checked) {
    box.checked = false;
    img.src = '/assets/img/checkbox.png';
    img.style = "";
  } else if (!box.checked) {
    box.checked = true;
    img.src = '/assets/img/checked-box.png';
    img.style = 'width: 20px; height: 20px;transform:translate(5px,5px);margin-right:12px';
  }
}


function signUpCheckBox(box, img){
  if (box.checked) {
    box.checked = false;
    img.src = '/assets/img/checkbox.png';
    img.style = "";
    disableSignUp()
  } else if (!box.checked) {
    box.checked = true;
    img.src = '/assets/img/checked-box.png';
    img.style = 'width: 20px; height: 20px;transform:translate(5px,5px);margin-right:12px';
  }
}


/**
 * Sign up a new user.
 *
 * @param {string} name - The name of the user.
 * @param {string} mail - The email address of the user.
 * @param {string} password - The password for the user account.
 * @return {void} This function does not return anything.
 */
function signUp() {
  let name = document.getElementById('username').value;
  let mail = document.getElementById('sign-up_mail').value;
  let password = document.getElementById('create_password').value;
  if (findExistingAccount(mail)) {
    return alert("Email-Adresse bereits registriert")
  } else { createAccount(name, mail, password) }
}


/**
 * Finds an existing account based on the given email.
 *
 * @param {string} mail - The email to search for.
 * @return {boolean} Returns true if an existing account is found, false otherwise.
 */
function findExistingAccount(mail) {
  console.log(mail)
  for (let i = 0; i < userList.length; i++) {
    if (userList[i].mail === mail) {
      return true
    }
  }
}




/**
 * Creates a new user account with the provided name, email, and password.
 *
 * @param {string} name - The name of the user.
 * @param {string} mail - The email of the user.
 * @param {string} password - The password of the user.
 */
function createAccount(name, mail, password) {
  let initials = createInitials(name)
  const user = {
    name: name,
    mail: mail,
    password: password,
    color: randomColor(),
    initials: initials.toUpperCase()
  }
  userList.push(user)
  setItem(key, userList)
  alert(`Email-Adresse :${user.mail} erfolgreich registriert`)
}


/**
 * Generates the initials from a given name.
 *
 * @param {string} name - The name to generate the initials from.
 * @return {string} The initials generated from the name.
 */
function createInitials(name) {
  let item = differMultipleNames(name)
  let initials
  if (item.firstName) {
    return initials = item.firstName.slice(0, 1) + item.lastName.slice(0, 1);
  } else {
    return initials = item.slice(0, 1)
  }
}

/**
 * Generates a random color from a predefined list of colors.
 *
 * @return {string} The randomly generated color.
 */

function randomColor() {
  let colors = ["#FF7A00", "#FF5EB3", "#6E52FF", "#9327FF", "#00BEE8", "#1FD7C1", "#FF745E",
    "#FFA35E", "#FC71FF", "#FFC701", "#0038FF", "#C3FF2B", "#FFE62B", "#FF4646", "#FFBB2B"];
  let randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}



/**
 * Splits a name string into first name and last name.
 *
 * @param {string} name - The name string to be split.
 * @return {object} - An object containing the first name and last name.
 */
function differMultipleNames(name) {
  let nameArr = name.split(' ');
  if (nameArr.length == 2) {
    name = {
      firstName: nameArr[0],
      lastName: nameArr[1]
    }
  };
  return name
}


/**
 * Logs in the user by validating the email and password entered.
 *
 * @return {undefined} Displays alert messages or redirects to another page.
 */
function logIn() {
  let match = matchingPassword();
  console.log(match[0].name)
  let mail = document.getElementById('login-mail');
  let password = document.getElementById('login-password');
  if (match == []) {
    return alert("Es ist kein Konto mit dieser Email-Adresse registriert.")
  } else if (mail.value === match[0].mail && password.value === match[0].password) {
    alert("Geiler Typ biste!");
    logUser(match[0].name)
    location.replace('./assets/templates/summary.html')
  } else {
    alert("Passwort und mail stimmen nicht überein")
  }
}


/**
 * This function filters the `userList` array to find objects with a `mail` property that matches the value of the `login-mail` element in the DOM.
 *
 * @return {Array} An array of objects that have a `mail` property matching the value of the `login-mail` element.
 */
function matchingPassword() {
  let mail = document.getElementById('login-mail');
  console.log(mail)
  return userList.filter((e) => e.mail === mail.value)
};

