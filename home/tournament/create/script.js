import {
    getEndpoint,
    fetchWithToken,
    redirectIfNotLoggedInAs,
    finishLogoutButton,
    fillCountriesAndCities
} from "../../../global.js";

export default run;

function run() {
    redirectIfNotLoggedInAs("ADMIN");
    finishLogoutButton();
    fillCountriesAndCities();
    document.querySelector("select.country").remove(0);
    fillCategoriesAndClubs();
    document.querySelector("#host").addEventListener("change", preselectCountryAndCity);
    document.querySelector("form").addEventListener("submit", sendNewTournament);
}

const clubMap = new Map();

function fillCategoriesAndClubs() {
    fetch(getEndpoint("getAllCategories").url).then(response => response.json()).then(categories => {
        const selectCategory = document.querySelector("#category");
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.innerText = category;
            selectCategory.append(option);
        });
    });
    fetch(getEndpoint("getAllClubs").url).then(response => response.json()).then(clubs => {
        const selectHost = document.querySelector("#host");
        clubs.forEach(club => {
            clubMap.set("clubId" + club.id, club);
            const option = document.createElement("option");
            option.value = club.id;
            option.innerText = club.name;
            selectHost.append(option);
        });
    });
}

function preselectCountryAndCity(event) {
    const clubId = event.target.value;
    const club = clubMap.get("clubId" + clubId);
    console.log(club)
    document.querySelector("#hideSelectCountry").style.display = "block";
    const selectCountry = document.querySelector(".country");
    selectCountry.value = club.city.country;
    selectCountry.dispatchEvent(new Event("change"));
    document.querySelector(".city").value = club.city.id;
}

function sendNewTournament(event) {
    event.preventDefault();
    const errorMessage = document.querySelector("p.error-message");
    const hostId = document.querySelector("#host").value;
    const host = clubMap.get("clubId" + hostId);
    const cityName = document.querySelector("#cityName").value;
    const tournament = {
        league: {
            seasonYear: document.querySelector("#year").value.toString(),
            category: document.querySelector("#category").value
        },
        city: {
            name: cityName,
            country: document.querySelector("select.country").value,
        },
        host: host,
        pointsAtStake: document.querySelector("#pointsAtStake").value,
        finalsStartDate: document.querySelector("#finalsStartDate").value,
        finalsEndDate: document.querySelector("#finalsEndDate").value
    }
    const city = document.querySelector("select.city").value;
    if (city.value === "createNewCity") {
        if (cityName.length < 1) {
            errorMessage.innerText = "City name is required for creating a new city.";
            return;
        }
    } else {
        tournament.city.id = city;
    }
    const location = document.querySelector("#location").value;
    if (location.length > 0) {
        tournament.location = location;
    }
    const qualificationStartDate = document.querySelector("#qualificationStartDate").value;
    if (qualificationStartDate.length > 0) {
        tournament.qualificationStartDate = qualificationStartDate;
    }
    const qualificationEndDate = document.querySelector("#qualificationEndDate").value;
    if (qualificationEndDate.length > 0) {
        tournament.qualificationEndDate = qualificationEndDate;
    }
    fetchWithToken(getEndpoint("createTournament"), tournament).then(async response => {
        if (response.status === 201) {
            document.querySelector("form").innerHTML = "<p class='confirm-message'>Tournament created!</p>";
        } else {
            errorMessage.innerText = await response.text();
        }
    });
}