import {getEndpoint, fetchWithToken} from "../global.js";

export default run;

function run() {
    document.querySelector("form").addEventListener("submit", login);
}

async function login(event) { // The async keyword in JavaScript is used to declare a function as asynchronous, meaning that the function will perform operations that can be executed in parallel without blocking the rest of the code from running.
    event.preventDefault(); // Prevent page reload

    // Get the latest values from input fields
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const endpoint = getEndpoint("login");

    const response = await fetch(endpoint.url, {
        method: endpoint.method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email: email, password: password})
    });

    // If the login is successful (HTTP status 2xx)
    if (response.ok) {
        const token = await response.text();
        sessionStorage.setItem("token", token);
        fetchWithToken(getEndpoint("who")).then(response => response.json()).then(user => {
            sessionStorage.setItem("role", user.role);
            if (user.role === "CLUB") {
                sessionStorage.setItem("clubId", user.clubId);
            }
            window.location.assign("/home");
        });
    } else {
        // If the login fails, show an error message
        showErrorMessage("Invalid username or password");
    }
}

function showErrorMessage(message) {
    const errorMessageElement = document.getElementById("error-message");
    errorMessageElement.textContent = message;
}