document.addEventListener('DOMContentLoaded', function() {
  // Your existing JavaScript code goes here
});
var employees = [
  {
    "name": "John Doe",
    "picture": "images/john.jpg",
    "workstream": ["IB evaluation", "Product clinics"],
    "team": "SR",
    "position": "Assistant Manager",
    "email": "john@gmail.com",
    "preferredCommunication": "Teams",
    "reportingOfficer": "Alex Tan"
  },
  {
    "name": "Jane Smith",
    "picture": "images/jane.jpg",
    "workstream": ["GT MMF Framework", "GT Funding Framework"],
    "team": "PD",
    "position": "Senior Manager",
    "email": "jane@gmail.com",
    "preferredCommunication": "Email",
    "reportingOfficer": "Benjamin Ong"
  },
  {
    "name": "Oliver Lee",
    "picture": "images/oliver.jpg",
    "workstream": ["Data Security", "Digital Economy"],
    "team": "CED",
    "position": "Manager",
    "email": "oliver@gmail.com",
    "preferredCommunication": "Email",
    "reportingOfficer": "Dennis Phua"
  },
  {
    "name": "Alex Tan",
    "picture": "images/alex.jpg",
    "workstream": ["IB evaluation", "Product clinics"],
    "team": "SR",
    "position": "Director",
    "email": "alex@gmail.com",
    "preferredCommunication": "Teams"
  },
  {
    "name": "Benjamin Ong",
    "picture": "images/benjamin.jpg",
    "workstream": ["GT MMF Framework", "GT Funding Framework"],
    "team": "PD",
    "position": "Director",
    "email": "benjamin@gmail.com",
    "preferredCommunication": "Email"
  },
  {
  "name": "Dennis Phua",
  "picture": "images/dennis.jpg",
  "workstream": ["Data Security", "Digital Economy"],
  "team": "CED",
  "position": "Director",
  "email": "dennis@gmail.com",
  "preferredCommunication": "Teams"
}

];

var suggestedKeywords = ["IB", "Product clinics", "GT MMF Framework", "GT Funding Framework", "Data Security", "Digital Economy", "Cybersecurity"];

document.addEventListener('DOMContentLoaded', function() {
  var searchForm = document.getElementById('searchForm');
  var workstreamInput = document.getElementById('workstreamInput');
  var teamInput = document.getElementById('teamInput');
  var positionFilter = document.getElementById('positionFilter'); // Add position filter
  var resultsDiv = document.getElementById('results');
  var keywordsList = document.getElementById('keywordsList');

  suggestedKeywords.forEach(function(keyword) {
    var listItem = document.createElement('li');
    listItem.textContent = keyword;
    listItem.addEventListener('click', function() {
        workstreamInput.value = keyword;
        searchForm.dispatchEvent(new Event('submit'));
    });
    keywordsList.appendChild(listItem);
  });

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var workstreamInputValue = workstreamInput.value.trim().toLowerCase();
    var teamInputValue = teamInput.value.trim().toLowerCase();
    var positionFilterValue = positionFilter.value.trim().toLowerCase(); // Get position filter value
    console.log(positionFilterValue);
    var results = filterEmployees(workstreamInputValue, teamInputValue, positionFilterValue); // Pass position filter value
    displayResults(results);
  });

  function filterEmployees(workstream, team, position) {
    return employees.filter(function(employee) {
      var matchesWorkstream = employee.workstream.some(function(ws) {
        return ws.toLowerCase().includes(workstream);
      });

      var matchesTeam = team === '' || employee.team.toLowerCase().includes(team);

      var matchesPosition = position === '' || employee.position.toLowerCase() === position; // Check position filter

      return matchesWorkstream && matchesTeam && matchesPosition; // Add position filter condition
    });
  }

  function generateCard(employee) {
    var card = document.createElement('div');
    card.classList.add('card');

    var img = document.createElement('img');
    img.classList.add('card-img-top');
    img.alt = employee.name;
    img.src = employee.picture ? employee.picture : 'images/blank-profile-picture.jpg';

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = employee.name;

    var workstream = document.createElement('p');
    workstream.classList.add('card-text');
    workstream.textContent = "Workstream: " + employee.workstream.join(', ');

    var team = document.createElement('p');
    team.classList.add('card-text');
    team.textContent = "Team: " + employee.team;

    var email = document.createElement('p');
    email.classList.add('card-text');
    email.innerHTML = "Email: " + employee.email;

    var communication = document.createElement('p');
    communication.classList.add('card-text');
    communication.innerHTML = "Preferred Communication: " + employee.preferredCommunication;

    var position = document.createElement('p'); // Add position element
    position.classList.add('card-text');
    position.innerHTML = "Position: " + employee.position;

    cardBody.appendChild(title);
    cardBody.appendChild(workstream);
    cardBody.appendChild(team);
    cardBody.appendChild(email);
    cardBody.appendChild(communication);
    cardBody.appendChild(position); // Append position element

    if (employee.position.toLowerCase() !== "director") {
      var reportingOfficer = document.createElement('p');
      reportingOfficer.classList.add('card-text');
      reportingOfficer.innerHTML = "Reporting Officer: " + employee.reportingOfficer;
      cardBody.appendChild(reportingOfficer);
    }

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
  }

  function displayResults(results) {
    resultsDiv.innerHTML = '';
    var workstreamValue = workstreamInput.value.trim().toLowerCase();
    var teamValue = teamInput.value.trim().toLowerCase(); // Get position filter value
  
    if (workstreamValue === '' && teamValue === '') {
      resultsDiv.style.display = 'none';
    } else {
      resultsDiv.style.display = 'flex';
      results.forEach(function(employee) {
        // Check if workstream or position matches
        if (workstreamValue === '' || employee.workstream.some(function(ws) { 
            return ws.toLowerCase().includes(workstreamValue);
          }) || employee.team.toLowerCase().includes(teamValue)) {
          var card = generateCard(employee);
          resultsDiv.appendChild(card);
        }
      });
    }
  }
  

  resultsDiv.addEventListener('click', function(event) {
    var card = event.target.closest('.card');
    if (card) {
      card.classList.toggle('active');
    }
  });

  workstreamInput.addEventListener('input', function() {
    if (workstreamInput.value.trim() === '') {
      resultsDiv.innerHTML = '';
      resultsDiv.style.display = 'none';
    }
  });

teamInput.addEventListener('input', function() {
    displayResults(results);
});

});
