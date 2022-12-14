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


// MODALS

const overlay = document.querySelector('.overlay');

const formatDOB = (dobString) => {
  const day = dobString.substr(8, 2);
  const month = dobString.substr(5, 2);
  const year = dobString.substr(0, 4);
  return `${month}/${day}/${year}`;
};

const displayModal = (index) => {
  const employee = employees[index];
  const dob = formatDOB(employee.dob.date);
  let modalHTML = `
    <div class="modal">
      <button class="modal-close">X</button>
      <div class="modal-content">
        <img src="${employee.picture.large}" alt="Photo of ${employee.name.first} ${employee.name.last}" class="modal-avatar">
        <div class="text-container">
          <h2 class="name">${employee.name.first} ${employee.name.last}</h2>
          <p class="email">${employee.email}</p>
          <p class="address">${employee.location.city}</p>
          <hr>
          <p class="cell">${employee.cell}</p>
          <p class="address">${employee.location.street.number} ${employee.location.street.name}, 
                             ${employee.location.state} ${employee.location.postcode}</p>
          <p>Birthday: ${dob}</p>
        </div>
      </div>
    </div>
  `;

  overlay.innerHTML = modalHTML;
  overlay.classList.remove('hidden');
};

main.addEventListener('click', (e) => {
  if (e.target.closest('.card')) {
    const cardIndex = e.target.closest('.card').getAttribute('data-index');
    displayModal(cardIndex);
  }
});

overlay.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-close')) {
    overlay.classList.add('hidden');
  }
});