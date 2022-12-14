const main = document.querySelector('main');
const apiUrl = 'https://randomuser.me/api/?results=12&nat=us&exc=gender,login,registered,phone,nat';
let employees = [];

// CREATE CARDS FOR HOME PAGE
const displayEmployees = (data) => {
  console.log(data)

  employees = data;
  let employeeHTML = '';

  employees.forEach((employee, index) => {
    const firstName = employee.name.first;
    const lastName = employee.name.last;
    const email = employee.email;
    const city = employee.location.city;
    const picture = employee.picture.medium;

    employeeHTML += `
      <div class="card" data-index="${index}">
        <img class="avatar" src="${picture}" alt="Photo of ${firstName} ${lastName}">
        <div class="text-container">
          <h2 class="name">${firstName} ${lastName}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `;
  });

  main.innerHTML = employeeHTML;
};

// FETCH EMPLOYEE DATA
fetch(apiUrl)
  .then(res => res.json())
  .then(res => res.results)
  .then(displayEmployees)
  .catch(err => console.log(err));

