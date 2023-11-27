let contacts = [
  {
    name: "Simon Golenia",
    email: "test@1.de",
    profileImg: "SG",
    phoneNumber: '012345',
  },
  {
    name: "René Heller",
    email: "test@12.de",
    profileImg: "RH",
    phoneNumber: '0123456',
  },
  {
    name: "Dustin Rohrschneider",
    email: "test@123.de",
    profileImg: "DR",
    phoneNumber: '01234567',
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
        <div id="${contact["name"]}" onclick="openProfile('${contact["name"]}', '${contact["email"]}', '${contact["phoneNumber"]}')" class="contact">
        
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

function openProfile(name, mail, number){
    let userProfile = document.getElementById('userProfile');
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

    
}
