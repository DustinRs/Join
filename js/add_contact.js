const doubleName="Contact already exists";
const doubleMail="Email already exists";


/**
 * Provides letters for comparison by rendering the
 * contacts
 * 
 * @type {Array<string>}
 */
let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]


/**
 * Initializes the application by performing the necessary setup tasks.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function init() {
  await getContacts(contactKey);
  getUser(sessionKey);
  renderContactPage(activeUser);
  renderRegister();
  navActive(3);
  hideUnusedLetters();
  calcBarHeight();
  addContactFormListener()
}


/**
 * Renders the contacts for the active user.
 * 
 * @param {any} activeUser - The active user object.
 */
function renderContactPage(activeUser) {
  let body = document.querySelector("body");
  let section = document.querySelector("section");
  let header = document.querySelector("header");
  let nav = document.querySelector("nav");
  let main = document.querySelector("main");
  nav.innerHTML = renderNavBar();
  header.innerHTML = renderHeader(activeUser);
  section.innerHTML = renderContactSection();
  main.innerHTML += renderAddContactButtonMobile();
  clearHTML();
  body.innerHTML += renderContactPopUp();
  body.innerHTML += renderEditPopUp();

}


/**
 * Hides the unused letters in the register where there are no contacts.
 * 
 */
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


/**
 * Opens the edit popup for the contact you clicked on from the register.
 * 
 * @param {string} id - This is the id of the contact you click on. 
 */
function editProfile(id) {
  let object = contacts.filter((contact) => contact.id === id)[0];
  openPopUpEditContact(object);
  document.getElementById("editName").value = object.fullName;
  document.getElementById("editEmail").value = object.email;
  document.getElementById("editNumber").value = object.phoneNumber;
  let img = document.getElementById("profile-img-div");
  img.innerText = object.initials;
  img.style.backgroundColor = object.color;
  let button = document.getElementById("saveButtonEdit");
  button.setAttribute("onclick", `saveContact(${id})`);
}


/**
 * Opens the edit popup for a contact. 
 */
function openPopUpEditContact() {
  document.getElementById("editContactPopUp").classList.remove("d-none");
}


/**
 * Closes the edit popup for a contact. 
 */
function closePopUpEditContact() {
  document.getElementById("editContactPopUp").classList.add("d-none");
}


/**
 * Safes the eddited contact.
 * 
 * @param {string} id - This is the id of the contact you're edditing.
 * @returns 
 */
async function saveContact(id) {
  if (id == undefined) {
    return;}
  let getObject = contacts.filter((e) => e.id == id)[0];
  let index = contacts.findIndex((e) => e.id == id);
  let editedObject = editObject(getObject);
  contacts[index] = editedObject;
  await setContacts(contactKey, contacts);
  closePopUpEditContact();
  init();
  openProfile(id);
}


/**
 * Deletes the current contact.
 * 
 * @param {string} id - This is the id of the contact you're edditing.
 */
async function deleteContact(id) {
  let object = contacts.find((contact) => contact.id === id);
  if (object) {
    let index = contacts.indexOf(object);
    contacts.splice(index, 1);}
  await setContacts(contactKey, contacts);
  init();
}


/**
 * Opens the popup where you can add a contact.
 */
function openPopUpAddContact() {
  document.getElementById("addContactPopUp").classList.remove("d-none");
}


/**
 * closes the popup where you can add a contact.
 */
function closePopUpAddContact() {
  let popUpContainer = document.getElementById("addContactPopUp");
  let popUp = document.getElementById("addContact");
  popUp.style = "animation:slide-contact-out 0.15s linear forwards";
  setTimeout(() => {
    popUpContainer.classList.add("d-none");
    popUp.style.animation = "";
  }, 30);
}


/**
 * Creates a contact based on the values entered in the profile form.
 *
 * @return {object} This function returns a new contact if the requirements are met.
 */
function createContact() {
  let fullName = document.getElementById("profileName");
  let initials = createInitials(fullName.value);
  let email = document.getElementById("profileEmail");
  let nameArr = differMultipleNames(fullName.value);
  let contact= newContactObject(nameArr,initials);
  if(checkForDuplicateMail(email.value)){return}
  else if(checkForDuplicateName(fullName.value)){return}
  if (checkForDuplicateName(fullName.value)) {return}
  else{contactCreation(contact)}
}


/**
 * Creates a new contact and adds it to the list of contacts.
 *
 * @param {Object} contact - The contact object to be added.
 * @return {Promise} A promise that resolves when the contact is successfully added.
 */
async function contactCreation(contact){
  contacts.push(contact);
    await setContacts(contactKey, contacts);
    closePopUpAddContact();init();
}


/**
 * Generates a new contact object based on the given name array and initials.
 *
 * @param {Array} nameArr - An array containing the first name and last name of the contact.
 * @param {string} initials - The initials of the contact.
 * @return {Object} The newly generated contact object.
 */
function newContactObject(nameArr,initials){
  let email = document.getElementById("profileEmail").value;
  let number = document.getElementById("profileNumber").value;
  let contact = {
    fullName: nameArr.firstName + " " + nameArr.lastName,
    firstName: nameArr.firstName,
    name: nameArr.lastName,
    id: Date.now(),
    email: email,
    color: randomColor(),
    phoneNumber: number,
    initials: initials.toUpperCase(),
  };return contact
}


/**
 * Gives a color to an created contact by his id.
 * 
 * @param {string} id - This is the id of the contact you're giving a color.
 * @param {string} color - This is the color you're giving to the contact.
 */
function getRandomColor(id, color) {
  let divName = document.getElementById(id);
  divName.style.backgroundColor = color;
}


/**
 * Calculates the barheight of the contact scroll div.
 */
function calcBarHeight() {
  let header = document.querySelector("header");
  let item = document.getElementById("contacts-bar");
  let height = window.innerHeight - header.offsetHeight;
  item.style.height = height + "px";
  calcHeight();
}


/**
 * Calculates the height of the add new contact popup.
 */
function calcHeight() {
  let header = document.querySelector("header");
  let btn = document.getElementById("addNewContact");
  let register = document.getElementById("register");
  let height = window.innerHeight - header.offsetHeight - btn.offsetHeight;
  register.style.height = height - 20 + "px";
}


/**
 * Clears all inputs of the add task page.
 */
function clearContactsForm() {
  let input = document.getElementsByClassName("contact-creation-inputs");
  for (let i = 0; i < input.length; i++) {
    input[i].value = "";
  }
}


/**
 * Takes the informations that got eddited and returns the eddited contact.
 * 
 * @param {string} person - This is the id of the contact you have clicked on in the contact list. 
 * @returns the eddited contact information.
 */
function editObject(person) {
  let object = {
    color: person.color,
    id: person.id,
    fullName: document.getElementById("editName").value,
    email: document.getElementById("editEmail").value,
    phoneNumber: document.getElementById("editNumber").value,
    initials: createInitials(document.getElementById("editName").value),
    firstName: differMultipleNames(document.getElementById("editName").value).firstName,
    name: differMultipleNames(document.getElementById("editName").value).lastName,
  };return object;
}


/**
 * Higlights the contact you have clicked on in the contact list.
 * 
 * @param {string} person - This is the id of the contact you have clicked on in the contact list.
 */
function contactActive(id) {
  let allElements = document.querySelectorAll(".contact");
  allElements.forEach((element) => {
    if (element.id !== id) {element.classList.remove("activeContact")}
  });
  let active = document.getElementById(id);
  active.classList.add("activeContact");
}


/**
 * Swappes the mobile Buttons of the mobile contact page.
 */
function setZindex() {
  let div = document.getElementById('zIndex');
  div.classList.add('zIndex');
  let arrow = document.getElementById('arrowContact');
  arrow.classList.remove('d-none');
  let button = document.getElementById('contactButtonMobile');
  button.classList.add('d-none');
  let menu = document.getElementById('menuContactButtonMobile');
  menu.classList.remove('d-none');
}


/**
 * Swappes the mobile Buttons of the mobile contact page the otherway around.
 */
function removeZindex() {
  let div = document.getElementById('zIndex');
  div.classList.remove('zIndex');
  let arrow = document.getElementById('arrowContact');
  arrow.classList.add('d-none');
  let menu = document.getElementById('menuContactButtonMobile');
  menu.classList.add('d-none');
  let button = document.getElementById('contactButtonMobile');
  button.classList.remove('d-none');
}


/**
 * Adds d-none to two buttons.
 */
function removeDNone() {
  let button = document.getElementById('buttonsPopUpMobile');
  button.classList.remove('d-none');
  let menu = document.getElementById('menuContactButtonMobile');
  menu.classList.add('d-none');
}


/**
 * Removes d-none of two buttons.
 */
function addDNone() {
  let button = document.getElementById('buttonsPopUpMobile');
  button.classList.add('d-none');
  let menu = document.getElementById('menuContactButtonMobile');
  menu.classList.remove('d-none');
}


/**
 * Clears the HTML of the inputfields in the edit contact popup.
 */
function clearHTML() {
  if (document.getElementById('editContactPopUp') !== null) {
    let mobileBtn = document.getElementById('mobile-add-btn');
    let popup = document.getElementById('editContactPopUp');
    let popUpTwo = document.getElementById('addContactPopUp');
    mobileBtn.parentNode.removeChild(mobileBtn);
    popup.parentNode.removeChild(popup);
    popUpTwo.parentNode.removeChild(popUpTwo);
  }
}