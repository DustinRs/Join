/**
 * Initializes the application by fetching user data, rendering the navigation bar,
 * header, and help content.
 *
 * @param {string} sessionKey - The session key used to authenticate the user.
 */
function init() {
    getUser(sessionKey);
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');
    nav.innerHTML += renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML += renderHelp();
}

/**
 * Initializes the sign-up process by rendering the default navigation bar,
 * default header, and help content.
 *
 */
function initSignUp() {
    let body = document.querySelector('body');
    body.innerHTML = renderDefaultNavBar();
    body.innerHTML += renderDefaultHeader();
    let main = document.querySelector('main');
    main.innerHTML= renderHelp();
}