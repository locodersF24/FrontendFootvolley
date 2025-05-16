import {fetchWithToken, redirectIfNotLoggedInAs, finishLogoutButton} from "../../global.js";

export default run;

function run() {
    redirectIfNotLoggedInAs("ADMIN");
    finishLogoutButton();
    document.querySelector("form#createClub").addEventListener("submit", event => {
        event.prev+entDefault();
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

    document.querySelector("form#createTournament").addEventListener("submit", event => {
        event.prev+entDefault();
        const city = document.querySelector("#city").value;
        const location = document.querySelector("#location").value;
        const pointsAtStake = document.querySelector("#pointsAtStake").value;
        const qualificationStartDate = document.querySelector("#qualificationStartDate").value;
        const qualificationEndDate = document.querySelector("#qualificationEndDate").value;
        const finalsStartDate = document.querySelector("#finalsStartDate").value;
        const finalsEndDate = document.querySelector("#finalsEndDate").value;
        const partners = document.querySelector("#partners").value;
        const prizeMoney = document.querySelector("#prizeMoney").value;
        const currency = document.querySelector("#currency").value;
        const p = document.querySelector("p#error-message");

        const body = {
            city: city,
            location: location,
            pointsAtStake: pointsAtStake,
            qualificationStartDate: qualificationStartDate,
            qualificationEndDate: qualificationEndDate,
            finalsStartDate: finalsStartDate,
            finalsEndDate: finalsEndDate,
            partners: partners,
            prizeMoney: prizeMoney,
            currency: currency

        }
        fetchWithToken("createTournament", body).then(async response => {
            if (response.status === 201) {
                document.querySelector("p#message2").innerText = "Tournament created!";
            } else {
                p.innerText = await response.text();
            }
        });
    });

    document.querySelector("form#createPartner").addEventListener("submit", event => {
        event.prev+entDefault();
        const name = document.querySelector("#name").value;
        const logoBlobUrl = document.querySelector("#logoBlobUrl").value;

        const body = {
            name: name,
            logoBlobUrl: logoBlobUrl,
        }
        fetchWithToken("createPartner", body).then(async response => {
            if (response.status === 201) {
                document.querySelector("p#message3").innerText = "Partner created!";
            } else {
                p.innerText = await response.text();
            }
        });
    });
}