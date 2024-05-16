var employees = [
  {"name": "John Doe", "picture": "images/john.jpg", "workstream": ["IB evaluation", "Product clinics"]},
  {"name": "Jane Smith", "picture": "images/jane.jpg", "workstream": ["GT MMF Framework", "GT Funding Framework"]}
  // Add more employees as needed
];
var suggestedHashtags = ["IB", "Product Clinics", "GT MMF Framework", "Product Management", "Customer Service", "Finance"];

document.addEventListener('DOMContentLoaded', function() {
  var searchForm = document.getElementById('searchForm');
  var workstreamInput = document.getElementById('workstreamInput');
  var resultsDiv = document.getElementById('results');
  var hashtagsList = document.getElementById('hashtagsList'); // Add this line

  suggestedHashtags.forEach(function(hashtag) {
    var listItem = document.createElement('li');
    listItem.textContent = hashtag;
    listItem.addEventListener('click', function() {
        expertiseInput.value = hashtag;
        searchForm.dispatchEvent(new Event('submit'));
    });
    hashtagsList.appendChild(listItem);
  }); // Add this line

  searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      var workstreamInputValue = workstreamInput.value.toLowerCase();
      var results = filterEmployeesByworkstream(workstreamInputValue);
      displayResults(results);
  });

  function filterEmployeesByworkstream(workstream) {
      return employees.filter(function(employee) {
          return employee.workstream.some(function(exp) {
              return exp.toLowerCase().includes(workstream);
          });
      });
  }

  function displayResults(results) {
      resultsDiv.innerHTML = '';
      results.forEach(function(employee) {
          var employeeDiv = document.createElement('div');
          employeeDiv.innerHTML = `
              <img src="${employee.picture}" alt="${employee.name}">
              <p>${employee.name}</p>
              <p>${employee.workstream.join(', ')}</p>
          `;
          resultsDiv.appendChild(employeeDiv);
      });
  }
});
