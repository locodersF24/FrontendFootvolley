document.querySelector("form").addEventListener("submit", login);

async function login(event) { // The async keyword in JavaScript is used to declare a function as asynchronous, meaning that the function will perform operations that can be executed in parallel without blocking the rest of the code from running.
    event.preventDefault(); // Prevent page reload

    // Get the latest values from input fields
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    var url = "/login"; //TODO skal ligge i global og ændres til rigtig url

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ username, password })
        });

        // If the login is successful (HTTP status 200)
        if (response.ok) {
            // If you need to redirect to a page, for example, 'dashboard.html':
            window.location.href = 'dashboard.html'; // Change this URL to where you want to redirect
        } else {
            // If the login fails, show an error message
            showErrorMessage("Invalid username or password");
        }
    } catch (error) {
        // In case of network or server error
        console.error('Error during login:', error);
        errorMessageElement.textContent = "An error occurred. Please try again later.";
    }

    function showErrorMessage(message) {
        const errorMessageElement = document.getElementById("error-message");
        errorMessageElement.textContent = message;
    }



}