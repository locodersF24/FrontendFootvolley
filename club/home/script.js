import {fetchWithToken, redirectIfNotLoggedInAs, finishLogoutButton} from "../../global.js";

export default run;

function run() {
    redirectIfNotLoggedInAs("CLUB");
    finishLogoutButton();
    fetchWithToken("clubDummy").then(response => response.text()).then(text => {
        document.querySelector("p").innerHTML = text;
    });
}