
function initSignUpPrivacy(){
    let main = document.querySelector('main');
    main.innerHTML = renderPrivacyPolicy();
    document.getElementById("help-arrow").href="/Index.html";
}

function initSignUpLegal(){
    let main = document.querySelector('main');
    main.innerHTML = renderLegalNotice();
    document.getElementById("help-arrow").href="/Index.html";
}

function initSignUpHelp() {
    let main = document.querySelector('main');
    main.innerHTML= renderHelp();
    document.getElementById("help-arrow").href="/Index.html";
}