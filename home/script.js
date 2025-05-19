import {redirectIfNotLoggedInAs, finishLogoutButton} from "../global.js";

export default run;

function run() {
    redirectIfNotLoggedInAs("ADMIN", "CLUB");
    finishLogoutButton();
    const listOfOptions = document.querySelector("#listOfOptions");
    const role = sessionStorage.getItem("role");
    if (role === "ADMIN") {
        listOfOptions.innerHTML = "<ul><li><a href='/home/club/create'>Create new club account</a></li><li><a href='/home/tournament/create'>Create new tournament</a></li></ul>";
    } else if (role === "CLUB") {
        listOfOptions.innerHTML = "<ul><li><a href='/home/club/update'>Update club information</a></li><li><a href='/home/club/update/city'>Update city</a></li></ul>";
    }

}