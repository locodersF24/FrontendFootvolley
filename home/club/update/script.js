import {getEndpoint, fetchWithToken, redirectIfNotLoggedInAs, finishLogoutButton, fillCountriesAndCities} from "../../../global.js";

export default run;

function run() {
    redirectIfNotLoggedInAs("CLUB");
    finishLogoutButton();
    fillInfo();
    document.querySelector("form").addEventListener("submit", sendNewInfo);
}

function fillInfo() {
    fetch(getEndpoint("getClubById", sessionStorage.getItem("clubId")).url).then(response => response.json()).then(club => {
        document.querySelector("#clubName").value = club.name;
        document.querySelector("#established").value = Number(club.established);
    });
}

function sendNewInfo(event) {
    event.preventDefault();
    const clubName = document.querySelector("#clubName").value;
    const established = document.querySelector("#established").value.toString();
    const club = {
        name: clubName,
        established: established
    }
    fetchWithToken(getEndpoint("editClubInfo"), club).then(response => {
        if (response.ok) {
            document.querySelector("form").innerHTML = "<p class='confirm-message'>Club information is saved!</p>";
        } else {
            document.querySelector(".error-message").value = "Unknown error. Go back to home page.";
        }
    });
}