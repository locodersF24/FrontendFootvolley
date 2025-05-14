const backendBaseUrl = "http://localhost:8080";

/**
 * @typedef {Object} Endpoint
 * @property {string} method
 * @property {string} path
 */

/**
 * @type {Map<string, Endpoint>}
 */
const endpoints = new Map()
    .set("login", {method: "POST", path: "/auth/token"})
    .set("who", {method: "GET", path: "/auth/me"})
    .set("createClub", {method: "POST", path: "/api/club"})
    .set("getOwnClub", {method: "GET", path: "/api/club"})
    .set("getClubById", {method: "GET", path: "/api/club/{id}"})
    ;

/**
 * Get backend url from description.
 * @param {string} description - Frontend description of backend endpoint.
 * @param {string|Number} id - Optional. Set if path has id.
 * @return {string}
 */
export function getUrl(description, id = undefined) {
    const url = backendBaseUrl + endpoints.get(description).path;
    return id === undefined ? url : url.replace("{id}", id); // Does this work? (regex problems)
}

/**
 * Fetch a response from backend using the JWT token.
 * @param {string} description - Frontend description of backend endpoint.
 * @param {Object} body - Optional
 * @return {Promise<Response>}
 */
export function fetchWithToken(description, body = undefined) {
    const url = getUrl(description);
    const method = endpoints.get(description).method;
    const auth = "Bearer " + sessionStorage.getItem("token");
    if (body === undefined) {
        return fetch(url, {
            method: method,
            headers: {
                "Authorization": auth
            }
        })
    }
    return fetch(url, {
        method: method,
        body: JSON.stringify(body),
        headers: {
            "Authorization": auth,
            "Content-Type": "application/json"
        },
    });
}

/**
 * Redirects a user if not logged in as the given role.
 * @param {string} role - Role like "ADMIN" or "CLUB".
 * @return {void}
 */
export function redirectIfNotLoggedInAs(role) {
    if (sessionStorage.getItem("role") !== role.toUpperCase()) {
        window.location.replace("/login"); // Redirects to login page without user being able to go back.
    }
}

/**
 * Assigns properties to a button with id=logout.
 * Example: <button id="logout"></button>
 * @return {void}
 */
export function finishLogoutButton() {
    const button = document.querySelector("button#logout");
    button.innerText = "Log out"; // Text displayed on the button.
    button.addEventListener("click", event => {
        event.preventDefault();
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        window.location.assign("/login"); // Redirects the user to the login page.
    });
}