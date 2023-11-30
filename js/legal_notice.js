function init() {
    let body = document.querySelector('body');
    body.innerHTML = renderNavBar();
    body.innerHTML += renderHeader();
    let main = document.querySelector('main');
    main.innerHTML = renderLegalNotice();
}