import "./style.css";

function $(selector) {
  return document.querySelector(selector);
}

function createTeamRequest(team) {
  // POST teams-json/create
  fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  });
}

function getTeamAsHTML(team) {
  return `<tr>
  <td>${team.promotion}</td>
  <td>${team.members}</td>
  <td>${team.name}</td>
  <td>${team.url}</td>
  <td>X</td>
</tr>`;
}

function renderTeams(teams) {
  const teamsHTML = teams.map(getTeamAsHTML);

  $("#teamsTable tbody").innerHTML = teamsHTML.join("");
}

function loadTeams() {
  fetch("http://localhost:3000/teams-json", {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(teams => {
      renderTeams(teams);
    });
}

function onSubmit(e) {
  e.preventDefault();

  const members = $("input[name=members]").value;
  const promotion = $("input[name=promotion]").value;
  const projectname = $("input[name=projectname]").value;
  const url = $("input[name=url]").value;

  const team = {
    promotion,
    members,
    name: projectname,
    url: url
  };

  createTeamRequest(team);
  window.location.reload();
}

function initEvents() {
  $("#teamsForm").addEventListener("submit", onSubmit);
}

initEvents();
loadTeams();
