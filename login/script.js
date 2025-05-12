import {getUrl, fetchWithToken} from "../global.js";

export default run;

function run() {
    document.querySelector("form").addEventListener("submit", login);
}

async function login(event) { // The async keyword in JavaScript is used to declare a function as asynchronous, meaning that the function will perform operations that can be executed in parallel without blocking the rest of the code from running.
    event.preventDefault(); // Prevent page reload

    // Get the latest values from input fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const url = getUrl("login");

    const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username: username, password: password})
    });

    // If the login is successful (HTTP status 2xx)
    if (response.ok) {
        const token = await response.text();
        sessionStorage.setItem("token", token);
        fetchWithToken("who").then(response => response.json()).then(user => {
            sessionStorage.setItem("role", user.role);
            if (user.role === "ADMIN") {
                window.location.assign("/admin/home");
            } else if (user.role === "CLUB") {
                window.location.assign("/club/home");
            } else {
                showErrorMessage("Login successful with unknown type.");
            }
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