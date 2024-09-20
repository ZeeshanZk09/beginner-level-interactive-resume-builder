// Selecting elements
const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
const outputName = document.getElementById('outputName') as HTMLSpanElement;
const outputContacts = document.getElementById('outputContacts') as HTMLUListElement;
const outputEducation = document.getElementById('outputEducation') as HTMLSpanElement;
const outputSkills = document.getElementById('outputSkills') as HTMLSpanElement;
const outputExperience = document.getElementById('outputExperience') as HTMLSpanElement;
const toggleSkillsBtn = document.getElementById('toggleSkills') as HTMLButtonElement;
const printResumeBtn = document.getElementById('printResume') as HTMLButtonElement;
const profilePicInput = document.getElementById('profilePic') as HTMLInputElement;
const imagePreview = document.getElementById('imagePreview') as HTMLDivElement;
const addContactBtn = document.getElementById('addContactBtn') as HTMLButtonElement;
const contactsContainer = document.getElementById('contactsContainer') as HTMLDivElement;

// Event listener for form submission
resumeForm.addEventListener('submit', (event: Event) => {
  event.preventDefault();

  // Capture user inputs
  const fullName = (document.getElementById('fullName') as HTMLInputElement).value;
  const education = (document.getElementById('education') as HTMLTextAreaElement).value;
  const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
  const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;

  // Fetch all contacts
  const contactInputs = document.querySelectorAll('.contact-input') as NodeListOf<HTMLInputElement>;
  const contacts = Array.from(contactInputs).map(input => input.value);

  // Update the preview section
  outputName.textContent = fullName;

  // Clear existing contacts before updating
  outputContacts.innerHTML = '';
  contacts.forEach(contact => {
    const li = document.createElement('li');
    li.textContent = contact;
    outputContacts.appendChild(li);
  });

  outputEducation.textContent = education;
  outputSkills.textContent = skills;
  outputExperience.textContent = experience;

  // Generate resume PDF
  generatePDF(fullName, contacts, education, skills, experience);
});

// Functionality to add more contacts dynamically
addContactBtn.addEventListener('click', () => {
  const newContactDiv = document.createElement('div');
  newContactDiv.classList.add('form-contact');
  newContactDiv.innerHTML = `
    <h4>Additional Contact:</h4>
    <input type="text" name="contact[]" placeholder="Enter more contact info" class="contact-input" required />
  `;
  contactsContainer.appendChild(newContactDiv);
});

// Function to toggle skills visibility
toggleSkillsBtn.addEventListener('click', () => {
  if (outputSkills.style.display === 'none') {
    outputSkills.style.display = 'block';
    toggleSkillsBtn.textContent = 'Hide Skills';
  } else {
    outputSkills.style.display = 'none';
    toggleSkillsBtn.textContent = 'Show Skills';
  }
});

// Print resume functionality
printResumeBtn.addEventListener('click', () => {
  window.print();
});

// Profile picture preview
profilePicInput.addEventListener('change', (event: Event) => {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.innerHTML = `<img src="${e.target?.result}" alt="Profile Picture" />`;
    };
    reader.readAsDataURL(file);
  }
});

// Function to generate a PDF using jsPDF
function generatePDF(fullName: string, contacts: string[], education: string, skills: string, experience: string) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add content to the PDF
  doc.setFont('Poppins', 'normal');
  doc.text('Resume', 10, 10);
  doc.text(`Name: ${fullName}`, 10, 20);
  doc.text('Contacts:', 10, 30);
  contacts.forEach((contact, index) => {
    doc.text(`- ${contact}`, 10, 40 + index * 10);
  });
  doc.text(`Education: ${education}`, 10, 90);
  doc.text(`Skills: ${skills}`, 10, 110);
  doc.text(`Experience: ${experience}`, 10, 130);

  // Save the PDF
  doc.save(`${fullName}_resume.pdf`);
}
