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
  let input = document.getElementById('login-password');
  let eye = document.getElementById('lock');

  body.addEventListener('click', restoreLock)
  eye.addEventListener('click',changeEye)
  input.addEventListener('click', changeLock);
}

setEventListener();

function changeLock() {
  let eye = document.getElementById('lock');
  let input = document.getElementById('login-password');

  input.addEventListener('click', e => {
    if (e.target == input && e.target != eye && !eye.src.includes('visibility.png')) {
      eye.src = 'assets/img/visibility_off.png';
    }
  });
}

function restoreLock() {
  let body = document.querySelector('body')
  let input = document.getElementById('login-password');
  let eye = document.getElementById('lock');

  body.addEventListener('click', event => {
    if (event.target != input && event.target != eye && input.value == "") {
      eye.src = 'assets/img/lock.png'
    }
  })
}


// function checkVisibility() {
//   let eye = document.getElementById('lock');
//   if (eye.src == 'assets/img/visibility_off.png') {
//     return showPassword()
//   }else{
//    return hidePassword()
//   }
// }

// function changeEye() {
//   let eye = document.getElementById('lock');
//   let input = document.getElementById('login-password');

//   eye.addEventListener('click', e => {
//     if (e.target == eye && eye.src == 'assets/img/visibility_off.png') {
//       input.setAttribute('type', 'text');
//       eye.src = 'assets/img/visibility.png';
//       e.stopPropagation()
//     } else if (e.target == eye && eye.src == 'assets/img/visibility.png') {
//       input.setAttribute('type', 'password');
//       eye.src == 'assets/img/visibility_off.png';
//       e.stopPropagation()
//     }
//   })
// }

// function showPassword() {
//   let eye = document.getElementById('lock');
//   eye.addEventListener('click', e => {
//     input.setAttribute('type', 'text');
//     eye.src = 'assets/img/visibility.png';
//     e.stopPropagation()
//   })
// }

// function hidePassword(){
//   let eye = document.getElementById('lock');
//   eye.addEventListener('click', e => {
//     input.setAttribute('type', 'password');
//       eye.src == 'assets/img/visibility_off.png';
//       e.stopPropagation()
//   })
// }

function changeEye(event) {
  let eye = document.getElementById('lock');
  let input = document.getElementById('login-password');

  if (eye.src.includes('visibility_off.png')) {
    input.setAttribute('type', 'text');
    eye.src = 'assets/img/visibility.png';
  } else {
    input.setAttribute('type', 'password');
    eye.src = 'assets/img/visibility_off.png';
  }

  event.stopPropagation();
}