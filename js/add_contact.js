const STORAGE_TOKEN = "QFOSCYPA967P352YSSOENCUXGKA464XWSUTNI5NT";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
let key = "Contacts";

let contacts = [
  {
    firstName: "Simon",
    name: "Golenia",
    email: "test@123.de",
    phoneNumber: "012345",
  },
  {
    firstName: "René",
    name: "Heller",
    email: "test@123.de",
    phoneNumber: "0123456",
  },
  {
    firstName: "Dustin",
    name: "Rohrschneider",
    email: "test@123.de",
    phoneNumber: "01234567",
  },
  {
    firstName: "Albert",
    name: " Müller",
    email: "test@123.de",
    phoneNumber: "01234567",
  },
  {
    firstName: "Gerd",
    name: " Müller",
    email: "test@123.de",
    phoneNumber: "01234567",
  },
  {
    firstName: "Thomas",
    name: " Müller",
    email: "test@123.de",
    phoneNumber: "01234567",
  },
  {
    firstName: "Herbert",
    name: " Müller",
    email: "test@123.de",
    phoneNumber: "01234567",
  },
];

let letters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

async function init() {
  getItem(key);
  renderRegister();
  hideUnusedLetters();
}

function renderRegister() {
  let register = document.getElementById("register");
  register.innerHTML = "";

  for (let i = 0; i < letters.length; i++) {
    const letter = letters[i];
    register.innerHTML += `<div class="register">
        <span>${letter}</span>
        
    </div>
    <div class="registerLineDiv">
    
    <div class="registerLine">
    </div>
    </div>
    <div id="${letter}" class="test">

    </div>`;

    renderContacts(`${letter}`);
  }
}

function renderContacts(letter) {
  let container = document.getElementById(`${letter}`);
  container.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    let text = contacts[i].firstName.slice(0,1)+contacts[i].name.slice(0,1);
    container.innerHTML += `
        <div id="${contact["name"]}" onclick="openProfile(${contact["name"]})" class="contact">
        
        <div>
            <span id="${initials}" class="initials">${initials}</span>
        </div>
        <div class="nameLinkDiv">
            <span class="fullName">${fullName}</span>
            <a class="emailLinks" href="#">${contact["email"]}</a>
        </div>
    </div>`;
      getRandomColor(`${initials}`);
    }
  }
}

function hideUnusedLetters() {
  let divElements = document.querySelectorAll(".test");
  let divRegister = document.querySelectorAll(".register");
  let divLine = document.querySelectorAll(".registerLineDiv");

  divElements.forEach((element, index) => {
    if (element.innerHTML.trim() === "") {
      divRegister[index].classList.add("d-none");
      divLine[index].classList.add("d-none");
    } else {
      divRegister[index].classList.remove("d-none");
      divLine[index].classList.remove("d-none");
    }
  });
}

function openProfile(name, mail, number) {
  let userProfile = document.getElementById("userProfile");

  if (!userProfile.innerHTML.trim()) {
    userProfile.innerHTML = `<div>
    <div class="topProfile">
    <img src="/assets/img/UserProfileHuge.png" alt="">
    <div class="nameProfile"><h2>${name}</h2><Button>Edit</Button><Button>Delete</Button></div>
    </div>
    <p>Contact Information</p>
    <p><b>Email</b></p>
    <a class="profileLink" href="">${mail}</a>
    <p><b>Phone</b></p>
    <p>${number}</p>
  </div>`;
    setContactBackgroundColor(name);
  } else {
    userProfile.innerHTML = "";
    setContactBackgroundColor(name);
  }
}

let previousContactName = null;

function setContactBackgroundColor(name) {
  let contactName = document.getElementById(name);

  if (previousContactName && previousContactName !== contactName) {
    previousContactName.classList.remove("backgroundColor");
  }

  if (!contactName.classList.contains("backgroundColor")) {
    contactName.classList.add("backgroundColor");
    previousContactName = contactName;
  } else {
    contactName.classList.remove("backgroundColor");
    previousContactName = null;
  }
}

function openPopUpAddContact() {
  document.getElementById("addContactPopUp").classList.remove("d-none");
}

function closePopUpAddContact() {
  document.getElementById("addContactPopUp").classList.add("d-none");
}

async function createContact() {
  let fullName = document.getElementById("profileName").value;
  let email = document.getElementById("profileEmail").value;
  let number = document.getElementById("profileNumber").value;

  let firstName = fullName.split(" ").slice(0, -1).join(" ");
  let name = fullName.split(" ").slice(-1).join(" ");

  let contact = {
    firstName: firstName,
    name: name,
    email: email,
    phoneNumber: number,
  };

  contacts.push(contact);
  setItem(key, contacts);
  init();
}

async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url).then((res) => res.json());
}

function randomColor() {
  let colors = [
    "#FF7A00",
    "#9327FF",
    "#6E52FF",
    "#FC71FF",
    "#FFBB2B",
    "#1FD7C1",
    "#462F8A",
    "#FF4646",
    "#00BEE8",
  ];
  let randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function getRandomColor(id) {
  let divName = document.getElementById(`${id}`);
  let Color = randomColor();
  divName.style.backgroundColor = Color;
}
