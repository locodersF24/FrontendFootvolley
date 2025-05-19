import {getEndpoint, fetchWithToken, redirectIfNotLoggedInAs, finishLogoutButton, fillCountriesAndCities} from "../../../global.js";

export default run;

function run() {
    redirectIfNotLoggedInAs("ADMIN");
    finishLogoutButton();
    fillCountriesAndCities();
    document.querySelector("form").addEventListener("submit", sendNewClub);
}

function sendNewClub(event) {
    event.preventDefault();
    const errorMessage = document.querySelector(".error-message");
    const country = document.querySelector("select.country").value;
    if (country === "none") {
        errorMessage.innerText = "Please select a country to continue.";
        return;
    }
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;
    if (password !== confirmPassword) {
        errorMessage.innerText = "Passwords don't match.";
        return;
    }
    const clubName = document.querySelector("#clubName").value;
    const established = document.querySelector("#established").value.toString();
    const email = document.querySelector("#email").value;
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const body = {
        password: password,
        clubName: clubName,
        established: established,
        email: email,
        firstName: firstName,
        lastName: lastName
    }
    const selectedCity = document.querySelector("select.city").value;
    if (selectedCity === "createNewCity") {
        const cityName = document.querySelector("#cityName").value;
        if (cityName.length < 1) {
            errorMessage.innerText = "City name is required for creating a new city.";
            return;
        }
        body.cityName = cityName;
        body.country = country;
    } else {
        body.cityId = selectedCity
    }
    fetchWithToken(getEndpoint("createClub"), body).then(async response => {
        if (response.status === 201) {
            document.querySelector("form").innerHTML = "<p class='confirm-message'>Club created!</p>";
        } else {
            errorMessage.innerText = await response.text();
        }
    });
}