function init() {
    let body = document.querySelector('body');
    body.innerHTML = renderNavBar();
    let section = document.querySelector('section');
    section.innerHTML = renderHeader();
    section.innerHTML += renderLegalNotice();
}