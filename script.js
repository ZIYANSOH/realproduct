const employees = [
    { name: "John Doe", workstreams: ["#Marketing", "#Sales"] },
    { name: "Jane Smith", workstreams: ["#Development", "#Marketing"] },
    { name: "Michael Johnson", workstreams: ["#Sales"] },
    { name: "Emily Brown", workstreams: ["#Marketing", "#Development"] },
    { name: "David Wilson", workstreams: ["#Development"] }
  ];
  
  const searchInput = document.getElementById('searchInput');
  const employeeList = document.getElementById('employeeList');
  
  function displayEmployees(searchTerm) {
    employeeList.innerHTML = '';
    employees.forEach(employee => {
      if (employee.workstreams.some(stream => stream.toLowerCase().includes(searchTerm.toLowerCase()))) {
        const li = document.createElement('li');
        li.className = 'employee';
        li.textContent = employee.name;
        employeeList.appendChild(li);
      }
    });
  }
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim();
    displayEmployees(searchTerm);
  });
  
  // Initial display
  displayEmployees('');