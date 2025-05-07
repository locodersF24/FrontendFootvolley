 // fetch-kald
    function renderMatches(matches) {
    const container = document.getElementById("matches");
    container.innerHTML = "";
    matches.forEach(match => {
    const div = document.createElement("div");
    div.className = "match-card";
    div.innerHTML = `
          <div>
            <div><strong>${match.teamA}</strong> vs <strong>${match.teamB}</strong></div>
            <div class="time">${match.time}</div>
          </div>
          <div class="status ${match.status}">${match.status}</div>
        `;
    container.appendChild(div);
});
}