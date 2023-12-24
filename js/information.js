/**
 * Initializes the privacy policy content for the sign-up page.
 * Populates the main content with rendered privacy policy HTML and sets the "help-arrow" link to "/index.html".
 *
 * @returns {void}
 */
function initSignUpPrivacy(){
    let main = document.querySelector('main');
    main.innerHTML = renderPrivacyPolicy();
    document.getElementById("help-arrow").href="/index.html";
}

/**
 * Initializes the legal notice content for the sign-up page.
 * Populates the main content with rendered legal notice HTML and sets the "help-arrow" link to "/index.html".
 *
 * @returns {void}
 */
function initSignUpLegal(){
    let main = document.querySelector('main');
    main.innerHTML = renderLegalNotice();
    document.getElementById("help-arrow").href="/index.html";
}

/**
 * Initializes the help content for the sign-up page.
 * Populates the main content with rendered help HTML and sets the "help-arrow" link to "/index.html".
 *
 * @returns {void}
 */
function initSignUpHelp() {
    let main = document.querySelector('main');
    main.innerHTML= renderHelp();
    document.getElementById("help-arrow").href="/index.html";
}
/**
 * Initializes the help page by setting up the user, rendering the navigation bar, header, and help content.
 * Retrieves user information using the provided session key.
 * Populates the header, navigation bar, and main content with rendered HTML.
 *
 * @returns {void}
 */
function initHelp() {
    getUser(sessionKey);
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');
    nav.innerHTML += renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML += renderHelp();
}

/**
 * Initializes the privacy policy page by setting up the user, rendering the navigation bar, header, and privacy policy content.
 * Retrieves user information using the provided session key.
 * Populates the header, navigation bar, and main content with rendered HTML.
 *
 * @returns {void}
 */
function initPrivacy() {
    getUser(sessionKey);
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');
    nav.innerHTML = renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML += renderPrivacyPolicy();
}

/**
 * Initializes the legal page by setting up the user, rendering the navigation bar, header, and legal notice.
 * Retrieves user information using the provided session key.
 * Populates the header, navigation bar, and main content with rendered HTML.
 *
 * @returns {void}
 */
function initLegal() {
    getUser(sessionKey);
    let header = document.querySelector('header');
    let nav = document.querySelector('nav');
    let main = document.querySelector('main');
    nav.innerHTML += renderNavBar();
    header.innerHTML += renderHeader(activeUser);
    main.innerHTML += renderLegalNotice();
}

