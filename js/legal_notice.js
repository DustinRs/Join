/**
 * Initializes the application.
 *
 */
function init() {
    getUser(sessionKey);
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');
    nav.innerHTML += renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML += renderLegalNotice();
}


/**
 * Initializes the sign-up process by rendering the legal navigation bar,
 * the default header, and the legal notice on the page.
 *
 */
function initSignUp(){
    let body = document.querySelector('body');
    body.innerHTML = renderLegalNavBar();
    body.innerHTML += renderDefaultHeader();
    let main = document.querySelector('main');
    main.innerHTML += renderLegalNotice();
}