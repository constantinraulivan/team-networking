import "./style.css";

function loadTeams() {
  fetch("teams.json")
    .then(response => response.json())
    .then(teams => {
      console.warn("teams?", teams);
    });
}

loadTeams();
