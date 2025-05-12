import {fetchWithToken, redirectIfNotLoggedInAs, finishLogoutButton} from "../../global.js";

export default run;

function run() {
    redirectIfNotLoggedInAs("ADMIN");
    finishLogoutButton();
    document.querySelector("form#createClub").addEventListener("submit", event => {
        event.preventDefault();
        const username = document.querySelector("#username").value;
        const password1 = document.querySelector("#password1").value;
        const password2 = document.querySelector("#password2").value;
        const p = document.querySelector("p#error-message");
        if (password1 !== password2) {
            p.innerText = "Passwords don't match.";
            return;
        }
        const body = {
            username: username,
            password: password1
        }
        fetchWithToken("createClub", body).then(response => {
            if (response.status === 201) {
                document.querySelector("p#message").innerText = "Club created!";
            } else if (response.status === 409) {
                p.innerText = "Username already exists.";
            } else {
                p.innerText = "Unknown error.";
            }
        });
    });
}