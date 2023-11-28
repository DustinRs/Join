let users = []

const STORAGE_TOKEN = 'QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
    .then(res => res.json());
}


async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then(res => res.json());
}


function init() {
  setEventListener()
}


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


function changeLock() {
  let eye = document.getElementsByClassName('lock');
  let input = document.getElementsByClassName('password');
  let container = document.getElementById('lock-container');
  for (let i = 0; i < input.length; i++) {
    input[i].addEventListener('click', e => {
      if (e.target == input[i] && e.target != eye[i] && !eye[i].src.includes('visibility.png')) {
        eye[i].src = 'assets/img/visibility_off.png';
        container.classList.add('lock-container')
      }
    });
  }
}


function restoreLock() {
  let body = document.querySelector('body')
  let input = document.getElementsByClassName('password');
  let eye = document.getElementsByClassName('lock');
  let container = document.getElementById('lock-container')
  for(let i = 0; i< input.length; i++){
  body.addEventListener('click', event => {
    if (event.target != input[i] && event.target != eye[i] && input[i].value == "") {
      eye[i].src = 'assets/img/lock.png';
      container.classList.remove('lock-container')
    }
  })}
}


function changeEye(event) {
  let eye = document.getElementsByClassName('lock');
  let input = document.getElementsByClassName('password');
  for(let i = 0; i<input.length; i++){
  if (event.target == eye[i] && eye[i].src.includes('visibility_off.png')) {
    input[i].setAttribute('type', 'text');
    eye[i].src = 'assets/img/visibility.png';
  } else if(event.target == eye[i] && eye[i].src.includes('visibility.png')){
    input[i].setAttribute('type', 'password');
    eye[i].src = 'assets/img/visibility_off.png';
  }}
  event.stopPropagation();
}


/**
 * validates matching passwords
 */
function addEventHandler(){
  let password = document.getElementById("create_password");
  let confirm_password = document.getElementById("confirm_password");
  function validatePassword() {
      let div = document.getElementsByClassName("login-input-fields");
      for(let i = 2; i< div.length; i++){
      if (password.value != confirm_password.value) {
          confirm_password.setCustomValidity("Passwords Don't Match"),
          div[i].style.border= "3px solid red"
      } else if(confirm_password.value.length>0){
          div[i].style.border= "3px solid green"
          confirm_password.setCustomValidity('');
          enableSignUp()
      }}
  }
  password.oninput = validatePassword;
  confirm_password.oninput = validatePassword;
  init()
}


function enableSignUp(){
  let name = document.getElementById('username');
  let mail = document.getElementById('sign-up_mail');
  let button = document.getElementById('signup-btn')
    if(name.value!== 0 && mail.value!==0){
      button.disabled=false
    }
}


/**
 * takes the value and proceed to account-construction
 */
function signUp(){
  let name = document.getElementById('username').value;
  let mail = document.getElementById('sign-up_mail').value;
  let password = document.getElementById('create_password').value;
  createAccount(name,mail,password)
}


/**
 * devides a eventually whole typed name into first- and last name
 * 
 * @param {String} name - as the input-value from username
 * @returns a seperated name if the last name as well as the first name was provided
 */
function differMultipleNames(name){
  let nameArr = name.split(' ');
  if(nameArr.length == 2){
    name = {
      firstName : nameArr[0],
      lastName : nameArr[1]
    }
  };
  return name
}



/**
 * passes the name to differMultipleNames() for proping and deviding;
 * finalle creates new object and pushes into the users-array
 * 
 * @param {String} name -input-value
 * @param {*String} mail -input-value--> plain input-value
 * @param {*String} password -input-value--> plain input-value
 */
function createAccount(name,mail,password){
  const user = {
    name: differMultipleNames(name),
    mail: mail,
    password: password
  }
  users.push(user)
}