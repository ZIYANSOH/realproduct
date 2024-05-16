var employees = [
  {"name": "John Doe", "picture": "images/john.jpg", "workstream": ["IB evaluation", "Product clinics"]},
  {"name": "Jane Smith", "picture": "images/jane.jpg", "workstream": ["GT MMF Framework", "GT Funding Framework"]}
  // Add more employees as needed
];

var suggestedKeywords = ["IB", "Product clinics", "GT MMF Framework", "GT Funding Framework", "Product Management", "Customer Service", "Finance"];

document.addEventListener('DOMContentLoaded', function() {
  var searchForm = document.getElementById('searchForm');
  var workstreamInput = document.getElementById('workstreamInput');
  var resultsDiv = document.getElementById('results');
  var keywordsList = document.getElementById('keywordsList');

  suggestedKeywords.forEach(function(keyword) {
    var listItem = document.createElement('li');
    listItem.textContent = keyword;
    listItem.addEventListener('click', function() {
        workstreamInput.value = keyword;
        searchForm.dispatchEvent(new Event('submit'));
    });
    keywordsList.appendChild(listItem); // Changed from 'hashtagsList' to 'keywordsList'
  });

  searchForm.addEventListener('submit', function(event) {
    event.preventDefault();
    var workstreamInputValue = workstreamInput.value.trim().toLowerCase();
    var results = workstreamInputValue !== '' ? filterEmployeesByWorkstream(workstreamInputValue) : [];
    displayResults(results);
  });

  // Function to filter employees by workstream
  function filterEmployeesByWorkstream(workstream) {
    return employees.filter(function(employee) {
      return employee.workstream.some(function(ws) {
        return ws.toLowerCase().includes(workstream);
      });
    });
  }

  // Function to generate cards for each employee
  function generateCard(employee) {
    var card = document.createElement('div');
    card.classList.add('card');

    var img = document.createElement('img');
    img.classList.add('card-img-top');
    img.alt = employee.name;
    
    // Check if the picture property exists in the employee object
    if (employee.picture) {
      img.src = employee.picture;
    } else {
      // If picture property is missing or empty, do not set the src attribute
      img.src = 'placeholder.jpg'; // Use a placeholder image if picture is missing
    }

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = employee.name;

    var workstream = document.createElement('p');
    workstream.classList.add('card-text');
    workstream.textContent = "Workstream: " + employee.workstream.join(', ');

    cardBody.appendChild(title);
    cardBody.appendChild(workstream);

    var cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer');

    var lastUpdated = document.createElement('small');
    lastUpdated.classList.add('text-body-secondary');
    lastUpdated.textContent = "";

    cardFooter.appendChild(lastUpdated);

    card.appendChild(img);
    card.appendChild(cardBody);
    card.appendChild(cardFooter);

    return card;
  }

  // Function to display search results
  function displayResults(results) {
    resultsDiv.innerHTML = ''; // Clear previous results
    results.forEach(function(employee) {
      var card = generateCard(employee);
      resultsDiv.appendChild(card);
    });
  }

  // Add event listener to the results container
  resultsDiv.addEventListener('click', function(event) {
    var card = event.target.closest('.card'); // Find the closest parent with the class 'card'
    if (card) {
      card.classList.toggle('active'); // Toggle the 'active' class
    }
  });

  // Example usage: Display all employees initially
  displayResults(employees);
});
