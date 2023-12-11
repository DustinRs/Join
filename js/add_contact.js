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
  await getContacts(contactKey);
  console.log(contacts)
  getUser(sessionKey);
  renderContactPage(activeUser);
  renderRegister();
  navActive(3);
  hideUnusedLetters();
  calcBarHeight()
}

function renderContactPage(activeUser) {
  let body = document.querySelector('body');
  let section = document.createElement('section');
  let header = document.querySelector('header');
  let nav = document.querySelector('nav');
  let main = document.querySelector('main');
  main.innerHTML += renderEditPopUp();
  nav.innerHTML = renderNavBar();
  header.innerHTML = renderHeader(activeUser);
  main.append(section);
  section.innerHTML += renderContactSection();
  body.innerHTML += renderContactPopUp();
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
    let contact = contacts[i];
    let initials=contact.initials.split("");
    let initial=initials[0];
      if(contacts[i].initials.length>1){
        initial = contact.initials.slice(0, 1)
      }else{initial = contact.initials }

    if (letter === `${initial}`) {
      container.innerHTML += `
        <div id="${contact.name}${i}" onclick="openProfile('${contact.id}')" class="contact">
        
        <div>
            <span id="${contact.id}" class="initials">${contact.initials}</span>
        </div>
        <div class="nameLinkDiv">
            <span class="fullName">${contact.fullName}</span>
            <a class="emailLinks" href="#">${contact.email}</a>
        </div>
    </div>`;
      getRandomColor(contact.id,contact.color);
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

function openProfile(id) {
  let userProfile = document.getElementById("userProfile");
  let user=[];
  contacts.map((e)=>{if(e.id==id){
    user.push(e)
  }})
  let e = user[0];
  userProfile.innerHTML='';

    userProfile.innerHTML = `<div>
    <div class="topProfile">
        <div class="profile-initials-pseudo-img" style="background-color:${e.color}">
           ${e.initials}
        </div>
    <div class="nameProfile"><h2>${e.fullName}</h2><div class="buttonsPopUp"><Button onclick="editProfile('${e}')" class="buttonPopUp"><img src="/assets/img/edit.png" alt=""> Edit</Button><Button class="buttonPopUp"><img src="/assets/img/delete.png" alt=""> Delete</Button></div></div>
    </div>
    <p>Contact Information</p>
    <p><b>Email</b></p>
    <a class="profileLink" href="">${e.email}</a>
    <p><b>Phone</b></p>
    <p>${e.phoneNumber}</p>
  </div>`;
    // setContactBackgroundColor(name);
  
}


function editProfile(object) {
  console.log(object)
  openPopUpEditContact(object);
  document.getElementById("editName").value = object.fullName;
  document.getElementById("editEmail").value = object.email;
  document.getElementById("editNumber").value = object.phoneNumber;
  contacts.splice(contacts.indexOf(object.id), 1,object);
  
}

function openPopUpEditContact() {
  document.getElementById("editContactPopUp").classList.remove("d-none");
}

function closePopUpEditContact() {
  document.getElementById("editContactPopUp").classList.add("d-none");
}

async function saveContact() {
  
  let fullName = document.getElementById("editName").value;
  let email = document.getElementById("editEmail").value;
  let number = document.getElementById("editNumber").value;

  let firstName = fullName.split(" ").slice(0, -1).join(" ");
  let name = fullName.split(" ").slice(-1).join(" ");
  
  let contact = {
    firstName: firstName,
    name: name,
    email: email,
    phoneNumber: number,
  };
  
  //deleteContact(firstName, name, email, number);
  contacts.push(contact);
  setContacts(contactKey, contacts);
  init();
}

function deleteContact(firstName, name, email, number) {
  let contactToDelete = {
    firstName: firstName,
    name: name,
    email: email,
    phoneNumber: number,
  };

  let indexToDelete = contacts.findIndex(contact =>
    contact.firstName === contactToDelete.firstName || contact.name === contactToDelete.name
  );

  if (indexToDelete !== -1) {
    contacts.splice(indexToDelete, 1);
  }
}


// let previousContactName = null;

// function setContactBackgroundColor(name) {
//   let contactName = document.getElementById(name);

//   if (previousContactName && previousContactName !== contactName) {
//     previousContactName.classList.remove("backgroundColor");
//   }

//   if (!contactName.classList.contains("backgroundColor")) {
//     contactName.classList.add("backgroundColor");
//     previousContactName = contactName;
//   } else {
//     contactName.classList.remove("backgroundColor");
//     previousContactName = null;
//   }
// }

function openPopUpAddContact() {
  document.getElementById("addContactPopUp").classList.remove("d-none");
}

function closePopUpAddContact() {
  let popUpContainer = document.getElementById("addContactPopUp")
  let popUp = document.getElementById('addContact');
  popUp.style = "animation:slide-contact-out 0.15s linear forwards";
  setTimeout(() => {
    popUpContainer.classList.add("d-none");
    popUp.style.animation = "";
  }, 300);
}

async function createContact() {
  let fullName = document.getElementById("profileName").value;
  let email = document.getElementById("profileEmail").value;
  let number = document.getElementById("profileNumber").value;
  let initials = createInitials(fullName);
  let nameArr=differMultipleNames(fullName)
  let firstName = nameArr.firstName
  let name = nameArr.lastName

  let contact = {
    fullName : fullName,
    firstName: firstName,
    name: name,
    id:Date.now(),
    email: email,
    color:randomColor(),
    phoneNumber: number,
    initials: initials.toUpperCase()
  };

  contacts.push(contact);
  await setContacts(contactKey, contacts);
  closePopUpAddContact();
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

function getRandomColor(id,color) {
  let divName = document.getElementById(id);
  console.log(divName)
  divName.style.backgroundColor = color;}


function calcBarHeight(){
  let header=document.querySelector('header');
  let item = document.getElementById('contacts-bar');
  let height = window.innerHeight - header.offsetHeight
  item.style.height = height  + 'px';
  calcHeight()
}

function calcHeight(){
  let header=document.querySelector('header');
  let btn = document.getElementById('addNewContact')
  let register = document.getElementById('register');
  let height = window.innerHeight - header.offsetHeight - btn.offsetHeight;
  register.style.height = height - 20 + 'px';
}

function clearContactsForm(){
  let input = document.getElementsByClassName('contact-creation-inputs')
    for (let i = 0; i < input.length; i++) {
      input[i].value = '';
    }
}