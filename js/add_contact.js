let contacts = [
  {
    name: "Golenia",
    firstName:"Simon",
    email: "test@123.de",
    profileImg: "SG",
  },
  {
    name: "Heller",
    firstName:"René",
    email: "test@123.de",
    profileImg: "RH",
  },
  {
    name: "Rohrschneider",
    firstName:"Dustin",
    email: "test@123.de",
    profileImg: "DR",
  },
];

let letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

function init() {
    renderRegister();
}

function renderRegister() {
    let register = document.getElementById('register');
    register.innerHTML = '';

    for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        register.innerHTML += `<div class="register">
        <span>${letter}</span>
        
    </div>
    <div class="registerLineDiv">
    
    <div class="registerLine">
    </div>
    </div>
    <div id="${letter}">

    </div>`;
    
    renderContacts(`${letter}`);
    
    }
    
}

function renderContacts(letter) {
  let container = document.getElementById(`${letter}`);
  container.innerHTML = "";

  for (let i = 0; i < contacts.length; i++) {
    const contact = contacts[i];
    let name = contacts[i].firstName +" "+contacts[i].name
    let text = contacts[i].firstName.slice(0,1)+contacts[i].name.slice(0,1);//schneidet den ersten Buchstaben des jeweiligen Namen aus und fügt ihn zusammen
    container.innerHTML += `
        <div id="${name}" onclick="openProfile(${contact["name"]})" class="contact">
        
        <div>
            <span class="userProfileImg">${text}</span>
        </div>
        <div class="nameLinkDiv">
            <span>${name}</span>
            <a class="emailLinks" href="#">${contact["email"]}</a>
        </div>
    </div>`;
  }
}

function openProfile(name){
    
}
