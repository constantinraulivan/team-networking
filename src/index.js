import "./style.css";

function $(selector) {
  return document.querySelector(selector);
}

function createTeamRequest(team) {
  // POST teams-json/create
  return fetch("http://localhost:3000/teams-json/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(team)
  }).then(r => r.json());
}

function deleteTeamRequest(id) {
  // DELETE teams-json/delete
  return fetch("http://localhost:3000/teams-json/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id })
  }).then(r => r.json());
}

function getTeamAsHTML(team) {
  return `<tr>
  <td>${team.promotion}</td>
  <td>${team.members}</td>
  <td>${team.name}</td>
  <td>${team.url}</td>
  <td>
    <button type="button" data-id="${team.id}" class="action-btn edit-btn" >&#9998</button>
    <button type="button" data-id="${team.id}" class="action-btn delete-btn" >♻</button>
  </td>
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

  createTeamRequest(team).then(status => {
    if (status.success) {
      window.location.reload();
    }
  });
}

function initEvents() {
  $("#teamsForm").addEventListener("submit", onSubmit);

  $("#teamsTable tbody").addEventListener("click", e => {
    if (e.target.matches("button.delete-btn")) {
      const id = e.target.dataset.id;
      deleteTeamRequest(id).then(status => {
        if (status.success) {
          window.location.reload();
        }
      });
    }
  });
}

initEvents();
loadTeams();
