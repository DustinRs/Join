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