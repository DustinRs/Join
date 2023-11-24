function renderSignup(){
let header = document.getElementById('sign-up');
header.classList.add('d-none')
let main = document.getElementById('login-main');
main.innerHTML='';
main.innerHTML+=/*html*/`
<div id="signup-container">
    <div id="login-title-container">
        <div id="login-title">Sign up</div>
        <div id="login-underline"></div>
    </div>
    <form onsubmit="return false">
        <div id="login-input-container">
            <div class="login-input-fields">
                <input class="login-input" id="username" name="username" type="text" required placeholder="Name">
                <img class="input-img" src="assets/img/person.png" alt="person">
            </div>
            <div class="login-input-fields">
                <input class="login-input" id="sign-up_mail" type="email" required placeholder="Email">
                <img class="input-img" src="assets/img/mail.png" alt="mail">
            </div>
            <div class="login-input-fields">
                <input class="login-input" id="create_password" type="text" min="8" required placeholder="Password"
                    pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"
                    title="Bitte verwende Groß- und Kleinbuchstaben, sowie ein Sonderzeichen und eine Nummern">
                <img class="input-img" src="assets/img/lock.png" alt="lock">
            </div>
            <div class="login-input-fields">
                <input class="login-input" id="confirm_password" type="password" placeholder="Password Conformation">
                <img class="input-img" src="assets/img/lock.png" alt="lock">
            </div>
        </div>
        <div>
            <div id="policy-check" class="d-flex">
                <input type="checkbox">
                <div>I accept the <span><a href="#">Privacy Policy</a></span></div>
            </div>
            <div id="signup-btn-container">
                <button id="signup-btn" class="btn" type="submit">
                    Sign up
                </button>
            </div>
        </div>
    </form>
</div>`}