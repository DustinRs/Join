let activeUser;

function logUser(name) {
    if (name.firstName) {
        activeUser = name.firstName + " " + name.lastName;
        return sessionStorage.setItem("activeUser", activeUser)
    } else {
        activeUser = name;
        return sessionStorage.setItem("activeUser", activeUser)
    }
}