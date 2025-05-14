import {fetchWithToken, redirectIfNotLoggedInAs, finishLogoutButton} from "../../global.js";

export default run;

function run() {
    redirectIfNotLoggedInAs("ADMIN");
    finishLogoutButton();
    document.querySelector("form#createClub").addEventListener("submit", event => {
        event.preventDefault();
        const email = document.querySelector("#email").value;
        const firstName = document.querySelector("#firstName").value;
        const lastName = document.querySelector("#lastName").value;
        const clubName = document.querySelector("#clubName").value;
        const city = document.querySelector("#city").value;
        const password1 = document.querySelector("#password1").value;
        const password2 = document.querySelector("#password2").value;
        const p = document.querySelector("p#error-message");
        if (password1 !== password2) {
            p.innerText = "Passwords don't match.";
            return;
        }
        const body = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            clubName: clubName,
            established: "2025",
            country: "DK",
            city: city,
            password: password1
        }
        fetchWithToken("createClub", body).then(async response => {
            if (response.status === 201) {
                document.querySelector("p#message").innerText = "Club created!";
            } else {
                p.innerText = await response.text();
            }
        });
    });
}