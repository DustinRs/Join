
function renderSignup() {
    let main = document.getElementById('login-main');
    let header = document.getElementById('sign-up');
    header.classList.add('d-none')
    main.innerHTML = '';
    main.innerHTML +=/*html*/`
<div id="signup-container">
    <div id="login-title-container">
        <div id="login-title">
            <img id=back_arrow src="/assets/img/arrow-left.png" alt="arrow-left" onclick="renderLogin()">
            Sign up
        </div>
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
    setEventListener();
    addSignUpHandler()
};


function renderLogin() {
    
    let main = document.getElementById('login-main');
    let header = document.getElementById('sign-up');
    header.classList.remove('d-none')

    // removeListener();
    main.innerHTML = '';
    main.innerHTML +=/*html*/`
        <div id="login-container">
            <div id="login-title-container">
                <div id="login-title">Log in</div>
                <div id="login-underline"></div>
            </div>
            <form onsubmit="return false">
                <div id="login-input-container">
                    <div class="login-input-fields">
                        <input class="login-input" id="login-mail" type="email" required placeholder="Email">
                        <img class="input-img" src="assets/img/mail.png" alt="mail">
                    </div>
                    <div id="password-container" class="login-input-fields">
                        <input class="login-input password" id="login-password" type="password" min="8" required
                            placeholder="Password"
                            pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\\-]).{8,}$"
                            title="Bitter verwende mindestens eine Zahl und ein Sonderzeichen.">
                        <div id="lock-container"><img  class="lock input-img" src="assets/img/lock.png" alt="lock"></div>
                    </div>
                    <div id="log-in-check" class="d-flex">
                        <input type="checkbox">
                        <div>Remember me</div>
                    </div>
                </div>
                <div id="login-btn-container">
                    <button id="login-btn" class="btn" disabled="true">
                        Log in
                    </button>
                    <button id="guest-login-btn" class="btn">
                        Guest Log in
                    </button>
                </div>
            </form>
        </div>`;
       setEventListener();
       addLogInHandler()
}
