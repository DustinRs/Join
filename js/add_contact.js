let contacts = [
  {
    name: "Simon Golenia",
    email: "test@123.de",
    profileImg: "SG",
  },
  {
    name: "René Heller",
    email: "test@123.de",
    profileImg: "RH",
  },
  {
    name: "Dustin Rohrschneider",
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
    container.innerHTML += `
        <div id="${contact["name"]}" onclick="openProfile(${contact["name"]})" class="contact">
        
        <div>
            <span class="userProfileImg">${contact["profileImg"]}</span>
        </div>
        <div class="nameLinkDiv">
            <span>${contact["name"]}</span>
            <a class="emailLinks" href="#">${contact["email"]}</a>
        </div>
    </div>`;
  }
}

function openProfile(name){
    
}
