function init() {
    getUser(sessionKey);
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');
    nav.innerHTML = renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML += renderPrivacyPolicy();
}


function initSignUpPrivacy(){
    let main = document.querySelector('main');
    main.innerHTML = renderPrivacyPolicy();
}

function initSignUpLegal(){
    let main = document.querySelector('main');
    main.innerHTML = renderLegalNotice();
}