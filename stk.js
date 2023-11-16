// Retrieve programs from web storage or create an empty array
let programs = JSON.parse(localStorage.getItem('programs')) || [];

// Function to save programs to web storage
function savePrograms() {
  localStorage.setItem('programs', JSON.stringify(programs));
}

// Function to add a new program
function addProgram(event) {
  event.preventDefault();

  // Retrieve values from form fields
  const titleInput = document.getElementById('title');
  const descriptionInput = document.getElementById('description');
  const ageLimitInput = document.getElementById('age-limit');
  const title = titleInput.value;
  const description = descriptionInput.value;
  const ageLimit = parseInt(ageLimitInput.value);

  // Create program object
  const program = {
    title: title,
    description: description,
    ageLimit: ageLimit
  };

  // Add program to array
  programs.push(program);

  // Save programs to web storage
  savePrograms();

  // Clear form fields
  titleInput.value = '';
  descriptionInput.value = '';
  ageLimitInput.value = '';

  // Update program list on the webpage
  displayPrograms();
}

// Function to delete a program
function deleteProgram(index) {
  // Remove program from array
  programs.splice(index, 1);

  // Save programs to web storage
  savePrograms();

  // Update program list on the webpage
  displayPrograms();
}

// Function to delete all programs
function deleteAllPrograms() {
  // Clear programs array
  programs = [];

  // Save programs to web storage
  savePrograms();

  // Update program list on the webpage
  displayPrograms();
}

// Function to display programs on the webpage
function displayPrograms(filteredPrograms = programs) {
  const programList = document.getElementById('program-list');
  programList.innerHTML = '';

  filteredPrograms.forEach((program, index) => {
    const programCard = document.createElement('div');
    programCard.classList.add('program-card');
    programCard.setAttribute('role', 'listitem');

    const titleElement = document.createElement('h2');
    titleElement.textContent = program.title;
    programCard.appendChild(titleElement);

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = program.description;
    programCard.appendChild(descriptionElement);

    const ageLimitElement = document.createElement('p');
    ageLimitElement.textContent = `Age Limit: ${program.ageLimit}`;
    programCard.appendChild(ageLimitElement);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteProgram(index));
    programCard.appendChild(deleteButton);

    programList.appendChild(programCard);
  });
}

// Function to handle program search
function searchPrograms() {
  const searchInput = document.getElementById('search');
  const query = searchInput.value.toLowerCase();

  const filteredPrograms = programs.filter(program => {
    const title = program.title.toLowerCase();
    const description = program.description.toLowerCase();
    return title.includes(query) || description.includes(query);
  });

  displayPrograms(filteredPrograms);
}

// Event listener for form submission
const programForm = document.getElementById('program-form');
programForm.addEventListener('submit', addProgram);

// Event listener for program search
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', searchPrograms);

// Event listener for delete all programs button
const deleteAllButton = document.getElementById('delete-all');
deleteAllButton.addEventListener('click', deleteAllPrograms);

// Display existing programs when the page loads
displayPrograms();