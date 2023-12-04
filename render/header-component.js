function renderHeader(user) {
    return/*html*/`
    <header>
        <p class="pHeader">Kanban Project Management Tool</p>
        <div class="imgsHeader">
            <a href="/assets/templates/help.html">
                <img class="helpIcon" src="/assets/img/help.png" alt=""></a>
            <div id="profile-icon">${user[0].initials}</div>
        </div>
    </header> 
    <main>
    </main>
    `
}

function renderDefaultHeader(){
    return/*html*/`
    <header>
        <p class="pHeader">Kanban Project Management Tool</p>
        <div class="imgsHeader">
            <a href="/assets/templates/help_signUp.html">
                <img class="helpIcon" src="/assets/img/help.png" alt=""></a>
        </div>
    </header> 
    <main>
    </main>
    ` 
}

