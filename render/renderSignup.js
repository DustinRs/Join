function renderSignup() {
    let header = document.getElementById('sign-up');
    header.classList.add('d-none')
    let main = document.getElementById('login-main');
    main.innerHTML = '';
    main.innerHTML +=/*html*/`
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
                <input class="login-input password" id="create_password" type="password" min="8" required placeholder="Password"
                    pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\\-]).{8,}$"
                    title="Bitte verwende Groß- und Kleinbuchstaben, sowie ein Sonderzeichen und eine Nummern">
                    <div id="lock-container"><img class="input-img lock" src="assets/img/lock.png" alt="lock"></div>
            </div>
            <div class="login-input-fields">
                <input class="login-input password" id="confirm_password" type="password" placeholder="Password Conformation">
                <div id="lock-container"><img class="input-img lock" src="assets/img/lock.png" alt="lock"></div>
            </div>
        </div>
        <div>
            <div id="policy-check" class="d-flex">
                <input type="checkbox">
                <div>I accept the <span><a href="#">Privacy Policy</a></span></div>
            </div>
            <div id="signup-btn-container">
                <button id="signup-btn" class="btn" type="submit" disabled=true onclick="signUp()">
                    Sign up
                </button>
            </div>
        </div>
    </form>
</div>`;

addEventHandler()
    
};
