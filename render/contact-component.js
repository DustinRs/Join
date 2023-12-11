function renderContactPopUp(){
    return/*html*/`
<div id="addContactPopUp" class="addContactPopUp d-none">
    <div id="addContact" class="addContact">
        <div class="logoContact">
            <div class="textContact">
                <img class="imgContact" src="/assets/img/logoSmall.png" alt="">
                <h2 class="h2Contact"><b>Add contact</b></h2>
                <span>Tasks are better with a team!</span>
                <div class="lineContact"></div>
            </div>
        </div>
        <button class="closePopUp" onclick="closePopUpAddContact()"><img src="/assets/img/btn-x.png"
                alt=""></button>
        <form onsubmit="createContact();return false" class="contactFormular">
            <div>
                <img class="imgUserContact" src="/assets/img/create-contact.png" alt="">
            </div>
            <div id="input-container">
                <div class="inputsContact">
                    <div class="input-group sub-container row">
                        <input id="profileName" class=" contact-creation-inputs form-control subtask-input" type="text"
                            placeholder="Name" required />
                        <img src="/assets/img/person.png" alt="">
                    </div>
                    <div class="input-group sub-container row">
                        <input id="profileEmail" class=" contact-creation-inputs form-control subtask-input" type="email"
                            placeholder="Email" required />
                        <img src="/assets/img/mail.png" alt="">
                    </div>
                    <div class="input-group sub-container row">
                        <input id="profileNumber" class=" contact-creation-inputs form-control subtask-input"
                            type="number" placeholder="Phone" required />
                        <img src="/assets/img/call.png" alt="">
                    </div>
                </div>
                <div class="divButtonsContact">
                    <button id="clearButton" class="clearButton" onclick="clearContactsForm()">Cancel <img
                            src="/assets/img/btn-x.png" alt=""></button>
                    <button class="createTaskButton" type="submit">Create Contact <img
                            src="/assets/img/checkbtn-checkmark.png" alt=""></button>
                </div>
            </div>
        </form>
    </div>
</div>
    `
}

function renderContactSection(){
    return/*html*/`
    <div class="contactSection">
    <div id="contacts-bar" class="contactsDiv">
        <div id="addNewContact" class="contactButtonDiv">
            <button onclick="openPopUpAddContact()" class="contactButton">
                <span>Add new contact</span><img src="/assets/img/person_add.png" alt="">
            </button>
        </div>
        <div class="scrollDiv" id="register">
            
        </div>

    </div>
    <div class="popUpUserProfile">
    <div class="headlineDiv">
        <div class="headLine">
        <h1 class="h1">Contacts</h1>
        <div class="blueLine"></div>
        <span class="spanContact">Better with a team</span>
        </div>
    </div>

    <div id="userProfile" class="userProfile">
        
    </div>
    </div>
    </div>
    `
}

function renderEditPopUp(){
    return/*html*/`
    <!-- <div id="editContactPopUp" class="addContactPopUp d-none">
        <div class="addContact">
            <div class="logoContact">
                <div class="textContact">
                <img class="imgContact" src="/assets/img/logoSmall.png" alt="">
                <h2 class="h2Contact"><b>Edit contact</b></h2>
                <div class="lineContact"></div>
                </div>
            </div>
            <div class="contactFormular">
                <div>
                    <img class="imgUserContact" src="/assets/img/UserProfileHuge.png" alt="">    
                </div>
                <div >
                    <button class="closePopUp" onclick="closePopUpEditContact()"><img src="/assets/img/btn-x.png" alt=""></button>
                    <div class="inputsContact">
                        <input id="editName" type="text" placeholder="Name">
                        <input id="editEmail" type="email" placeholder="Email">
                        <input id="editNumber" type="number" placeholder="Phone">
                    </div>
                    <div class="divButtonsContact">
                        <button class="clearButton">Delete</button>
                        <button class="createTaskButton" onclick="saveContact()">Save <img src="/assets/img/checkbtn-checkmark.png" alt=""></button>
                    </div>
                </div>
            </div>
            </div>
    </div> -->
    <div id="editContactPopUp" class="addContactPopUp d-none">
    <div id="addContact" class="addContact">
        <div class="logoContact">
            <div class="textContact">
                <img class="imgContact" src="/assets/img/logoSmall.png" alt="">
                <h2 class="h2Contact"><b>Edit contact</b></h2>
                <div class="lineContact"></div>
            </div>
        </div>
        <button class="closePopUp" onclick="closePopUpEditContact()"><img src="/assets/img/btn-x.png"
                alt=""></button>
        <form onsubmit="saveContact();return false" class="contactFormular">
            <div>
                <div class="profile-initials-pseudo-img" id="profile-img-div"></div>
            </div>
            <div id="input-container">
                <div class="inputsContact">
                    <div class="input-group sub-container row">
                        <input id="editName" class=" contact-creation-inputs form-control subtask-input" type="text"
                            placeholder="Name" required />
                        <img src="/assets/img/person.png" alt="">
                    </div>
                    <div class="input-group sub-container row">
                        <input id="editEmail" class=" contact-creation-inputs form-control subtask-input" type="email"
                            placeholder="Email" required />
                        <img src="/assets/img/mail.png" alt="">
                    </div>
                    <div class="input-group sub-container row">
                        <input id="editNumber" class=" contact-creation-inputs form-control subtask-input"
                            type="number" placeholder="Phone" required />
                        <img src="/assets/img/call.png" alt="">
                    </div>
                </div>
                <div class="divButtonsContact">
                    <button id="clearButton" class="clearButton" onclick="clearContactsForm()">Delete <img
                            src="/assets/img/btn-x.png" alt=""></button>
                    <button id="saveButton" class="createTaskButton" type="submit">Save <img
                            src="/assets/img/checkbtn-checkmark.png" alt=""></button>
                </div>
            </div>
        </form>
    </div>
</div>
    `
}