"use strict";
// Selecting elements
const resumeForm = document.getElementById('resumeForm');
const outputName = document.getElementById('outputName');
const outputContacts = document.getElementById('outputContacts');
const outputEducation = document.getElementById('outputEducation');
const outputSkills = document.getElementById('outputSkills');
const outputExperience = document.getElementById('outputExperience');
const toggleSkillsBtn = document.getElementById('toggleSkills');
const printResumeBtn = document.getElementById('printResume');
const profilePicInput = document.getElementById('profilePic');
const imagePreview = document.getElementById('imagePreview');
const addContactBtn = document.getElementById('addContactBtn');
const contactsContainer = document.getElementById('contactsContainer');
// Event listener for form submission
resumeForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Capture user inputs
    const fullName = document.getElementById('fullName').value;
    const education = document.getElementById('education').value;
    const skills = document.getElementById('skills').value;
    const experience = document.getElementById('experience').value;
    // Fetch all contacts
    const contactInputs = document.querySelectorAll('.contact-input');
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
    }
    else {
        outputSkills.style.display = 'none';
        toggleSkillsBtn.textContent = 'Show Skills';
    }
});
// Print resume functionality
printResumeBtn.addEventListener('click', () => {
    window.print();
});
// Profile picture preview
profilePicInput.addEventListener('change', (event) => {
    var _a;
    const file = (_a = event.target.files) === null || _a === void 0 ? void 0 : _a[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            imagePreview.innerHTML = `<img src="${(_a = e.target) === null || _a === void 0 ? void 0 : _a.result}" alt="Profile Picture" />`;
        };
        reader.readAsDataURL(file);
    }
});
// Function to generate a PDF using jsPDF
function generatePDF(fullName, contacts, education, skills, experience) {
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
