var employees = [
  {
    "name": "John Doe",
    "picture": "images/john.jpg",
    "workstream": ["IB evaluation", "Product clinics"],
    "team": "SR",
    "position": "Assistant Manager"
  },
  {
    "name": "Jane Smith",
    "picture": "images/jane.jpg",
    "workstream": ["GT MMF Framework", "GT Funding Framework"],
    "team": "SR",
    "position": "Senior Manager"
  }
  // Add more employees as needed
];

var suggestedKeywords = ["IB", "Product clinics", "GT MMF Framework", "GT Funding Framework", "Product Management", "Customer Service", "Finance"];

document.addEventListener('DOMContentLoaded', function() {
  var searchForm = document.getElementById('searchForm');
  var workstreamInput = document.getElementById('workstreamInput');
  var teamInput = document.getElementById('teamInput');
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
    var results = filterEmployees(workstreamInputValue, teamInputValue);
    displayResults(results);
  });

  // Function to filter employees
  function filterEmployees(workstream, team) {
    return employees.filter(function(employee) {
      return employee.workstream.some(function(ws) {
        return ws.toLowerCase().includes(workstream);
      }) && employee.team.toLowerCase().includes(team);
    });
  }

  // Function to generate cards for each employee
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

    cardBody.appendChild(title);
    cardBody.appendChild(workstream);
    cardBody.appendChild(team);

    card.appendChild(img);
    card.appendChild(cardBody);

    return card;
  }

  // Function to display search results
  function displayResults(results) {
    // Clear previous results
    resultsDiv.innerHTML = '';
    
    // Check if input is empty
    if (workstreamInput.value.trim() === '') {
      resultsDiv.style.display = 'none'; // Hide the results container
    } else {
      resultsDiv.style.display = 'flex'; // Show the results container
      results.forEach(function(employee) {
        var card = generateCard(employee);
        resultsDiv.appendChild(card);
      });
    }
  }

  // Add event listener to the results container
  resultsDiv.addEventListener('click', function(event) {
    var card = event.target.closest('.card'); // Find the closest parent with the class 'card'
    if (card) {
      card.classList.toggle('active'); // Toggle the 'active' class
    }
  });

  // Add event listener to the search input to hide results when cleared
  workstreamInput.addEventListener('input', function() {
    if (workstreamInput.value.trim() === '') {
      resultsDiv.innerHTML = '';
      resultsDiv.style.display = 'none';
    }
  });

  // Example usage: Display all employees initially
  displayResults(employees);
});
