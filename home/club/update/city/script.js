import {
    getEndpoint,
    fetchWithToken,
    redirectIfNotLoggedInAs,
    finishLogoutButton,
    fillCountriesAndCities,
    countryOptions
} from "../../../../global.js";

export default run;

function run() {
    redirectIfNotLoggedInAs("CLUB");
    finishLogoutButton();
    fillCountriesAndCities();
    document.querySelector("label.hideSelectCity").style.display = "block";
    document.querySelector("#changeCountry").innerHTML = countryOptions;
    preselectInfo();
    document.querySelector("form#changeInfo").addEventListener("submit", changeInfo);
    document.querySelector("form#changeCity").addEventListener("submit", changeCity);
}

let cityId;

function preselectInfo() {
    fetchWithToken(getEndpoint("getOwnCity")).then(response => response.json()).then(city => {
        cityId = city.id;
        document.querySelector("#changeCountry").value = city.country;
        document.querySelector("#changeName").value = city.name;
        const selectCountry = document.querySelector("select.country");
        selectCountry.remove(0);
        selectCountry.value = city.country;
        selectCountry.dispatchEvent(new Event("change"));
        document.addEventListener("citiesLoaded", event => {
            document.querySelector("select.city").value = cityId;
        });
    });
}

function changeInfo(event) {
    event.preventDefault();
    const city = {
        id: cityId,
        country: document.querySelector("#changeCountry").value,
        name: document.querySelector("#changeName").value,
    }
    fetchWithToken(getEndpoint("changeAttributesOfCity"), city).then(response => {
        if (response.ok) {
            document.querySelector("form#changeInfo").innerHTML = "<p class='confirm-message'>City's new information is saved!</p>";
            document.querySelector("form#changeCity").innerHTML = "";
        } else {
            document.querySelector("#errorChangeInfo").innerText = "Unknown error. Go back to home page.";
        }
    });
}

function changeCity(event) {
    event.preventDefault();
    const errorMessage = document.querySelector("#errorChangeCity");
    const selectedCity = document.querySelector("select.city").value;
    if (selectedCity === "createNewCity") {
        const cityName = document.querySelector("#cityName").value;
        if (cityName.length < 1) {
            errorMessage.innerText = "City name is required for creating a new city.";
            return;
        }
        const city = {
            country: document.querySelector("select.country").value,
            name: cityName
        }
        console.log(city)
        fetchWithToken(getEndpoint("clubCreateNewCity"), city).then(response => {
            if (response.ok) {
                document.querySelector("form#changeInfo").innerHTML = "";
                document.querySelector("form#changeCity").innerHTML = "<p class='confirm-message'>New city is saved!</p>";
            } else {
                errorMessage.innerText = "Unknown error. Go back to home page.";
            }
        });
    } else {
        console.log(selectedCity)
        fetchWithToken(getEndpoint("clubReplaceCityWithAnotherExistingCity", selectedCity)).then(response => {
            if (response.ok) {
                document.querySelector("form#changeInfo").innerHTML = "";
                document.querySelector("form#changeCity").innerHTML = "<p class='confirm-message'>Change of city saved!</p>";
            } else {
                errorMessage.innerText = "Unknown error. Go back to home page.";
            }
        });
    }
}