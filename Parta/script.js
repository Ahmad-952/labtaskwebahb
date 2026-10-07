
const form = document.getElementById("studentForm");

const fullName = document.querySelector("#fullName");
const email = document.querySelector("#email");
const program = document.querySelector("#program");
const semester = document.querySelector("#semester");

const previewName = document.querySelector("#previewName");
const previewEmail = document.querySelector("#previewEmail");
const previewProgram = document.querySelector("#previewProgram");
const previewSemester = document.querySelector("#previewSemester");

const studentList = document.querySelector("#studentList");
const darkButton = document.querySelector("#darkButton");


fullName.addEventListener("input", function() {
    previewName.textContent = fullName.value;
});

email.addEventListener("input", function() {
    previewEmail.textContent = email.value;
});

program.addEventListener("change", function() {
    previewProgram.textContent = program.value;
});

semester.addEventListener("input", function() {
    previewSemester.textContent = semester.value;
});


form.addEventListener("submit", function(event) {

    event.preventDefault();

    document.querySelector("#nameError").textContent = "";
    document.querySelector("#emailError").textContent = "";
    document.querySelector("#programError").textContent = "";
    document.querySelector("#semesterError").textContent = "";

    const nameValue = fullName.value.trim();
    const emailValue = email.value.trim();
    const programValue = program.value;
    const semesterValue = semester.value;

    if (nameValue === "") {
        document.querySelector("#nameError").textContent =
            "Full Name is required";
        return;
    }

    if (emailValue === "" || !emailValue.includes("@")) {
        document.querySelector("#emailError").textContent =
            "Enter a valid email";
        return;
    }

    if (programValue === "") {
        document.querySelector("#programError").textContent =
            "Please select a program";
        return;
    }

    if (semesterValue === "" || semesterValue < 1 || semesterValue > 8) {
        document.querySelector("#semesterError").textContent =
            "Semester must be between 1 and 8";
        return;
    }

    const li = document.createElement("li");

    li.textContent =
        nameValue + " - " +
        emailValue + " - " +
        programValue + " - Semester " +
        semesterValue;

    studentList.appendChild(li);

    form.reset();

    previewName.textContent = "Your Name";
    previewEmail.textContent = "Your Email";
    previewProgram.textContent = "Your Program";
    previewSemester.textContent = "Your Semester";
});


darkButton.addEventListener("click", function() {
    document.body.classList.toggle("dark");
});
