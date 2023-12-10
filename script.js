let activeUser;
let currentDraggedElement;
let contacts = [];
let allTasks = [];
let subTasks=[];
let userList;
let userData;
let todoArr=[];
let awaitArr=[];
let doneArr=[];
let progressArr=[]
let guest = [{
  name: "Dear Guest",
  initials: "G"
}]
const userKey = "userList";
const contactKey = "Contacts";
const tasksKey = "allTasks";
const sessionKey = "activeUser"
const remoteKey = "allTasks";
const STORAGE_TOKEN = 'QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';



function logUser(name) {
  if (name.firstName) {
    activeUser = name.firstName + " " + name.lastName;
    return sessionStorage.setItem("activeUser", activeUser)
  } else {
    activeUser = name;
    return sessionStorage.setItem("activeUser", activeUser)
  }
}


function getUser(sessionKey) {
  userData = sessionStorage.getItem(sessionKey)
  activeUser = JSON.parse(userData)
  return activeUser
}



async function setUserList(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };

  const response = await fetch(STORAGE_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  });

  return await response.json();
}


async function getUserList(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Fehler beim Laden der Kontakte");
    }
    const data = await response.json();
    userList = JSON.parse(data.data.value) || [];
    console.log(userList);
  } catch (error) {
    console.error(error);
  }
}


async function getAllTasks(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  await fetch(url)
    .then((res) => res.json())
    .then(json => {
      let arr = json.data.value;
      let parsedArr = JSON.parse(arr);
      Array.isArray(parsedArr) ? allTasks= parsedArr : allTasks.push(parsedArr);
      return allTasks
    });

}


async function setAllTasks(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}


async function setContacts(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}


async function getContacts(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  await fetch(url)
    .then((res) => res.json())
    .then(json => {
      let arr = json.data.value;
      contacts = JSON.parse(arr)
      return contacts
    });
}

function openMenu() {
  let menu = document.getElementById('header-icon-menu');
  menu.classList.remove('d-none');
  addMenuEvent();
}


function addMenuEvent() {
  let body = document.querySelector('body');
  body.addEventListener('click', closeMenu)
};


function closeMenu(event) {
  let body = document.querySelector('body');
  let menu = document.getElementById('header-icon-menu');
  let icon = document.getElementById('profile-icon');
      if ( event.target !== icon && event.target !== menu) {
      menu.classList.add('d-none');
      body.removeEventListener('click', closeMenu)
    }
  
}


function getTime(){
  let s= new Date().toLocaleString();
  let hour = s.split(' ');
  let diggit=hour[1].slice(0,2);
  if(diggit<11){
    return "Good Morning"}else if(diggit>=11 && diggit<15)
    {return "Good Day"}else if(diggit>=15 && diggit<17)
    {return "Good Afternoon";}else
    {return "Good Evening"}
}


function checkboxClick(i) {
  let checkbox = document.getElementById(`check${i}`);
  let img = document.getElementById(`img-box${i}`);
  loginCheckBox(checkbox, img);
  }


function loginCheckBox(box, img){
  if (box.checked) {
    box.checked = false;
    img.src = '/assets/img/checkbox.png';
    img.style = "";
  } else if (!box.checked) {
    box.checked = true;
    img.src = '/assets/img/checked-box.png';
    img.style = 'width: 18px; height: 18px';
  }
}

