import {fetchWithToken, redirectIfNotLoggedInAs, finishLogoutButton} from "../../global.js";

export default run;

function run() {
    redirectIfNotLoggedInAs("CLUB");
    finishLogoutButton();
    fetchWithToken("getOwnClub").then(response => response.json()).then(club => {
        console.log(club);
        document.querySelector("p").innerText = "Hello " + club.name;
    });
}