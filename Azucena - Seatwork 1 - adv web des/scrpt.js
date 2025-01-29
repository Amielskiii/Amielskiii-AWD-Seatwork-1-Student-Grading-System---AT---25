document.addEventListener("DOMContentLoaded", function () {
    loadStudents();
});

function searchStudent() {
    let searchQuery = document.getElementById("search").value.toLowerCase();
    let table = document.getElementById("studentTableBody");
    let rows = table.getElementsByTagName("tr");

    for (let row of rows) {
        let nameCell = row.cells[0].innerText.toLowerCase();
        row.style.display = nameCell.includes(searchQuery) ? "" : "none";
    }
}

function addStudent() {
    let name = document.getElementById("studentName").value.trim();
    if (name === "") {
        alert("Please enter a student name.");
        return;
    }

    let students = JSON.parse(localStorage.getItem("students")) || [];
    let studentExists = students.some(student => student.name.toLowerCase() === name.toLowerCase());

    if (studentExists) {
        alert("A student with this name already exists!");
        return;
    }

    let grades = [];
    for (let i = 1; i <= 6; i++) {
        let grade = parseFloat(document.getElementById(`sub${i}`).value);
        if (isNaN(grade) || grade < 0 || grade > 4.0) {
            alert("Please enter valid grades between 0.0 and 4.0.");
            return;
        }
        grades.push(grade);
    }

    let gwa = grades.reduce((a, b) => a + b, 0) / grades.length;

    let studentData = {
        name: name,
        grades: grades,
        gwa: gwa.toFixed(2)
    };

    students.push(studentData);
    students.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
    localStorage.setItem("students", JSON.stringify(students));

    appendStudentToTable(studentData);

    document.getElementById("studentName").value = "";
    for (let i = 1; i <= 6; i++) {
        document.getElementById(`sub${i}`).value = "";
    }
}

function appendStudentToTable(studentData) {
    let table = document.getElementById("studentTableBody");
    let row = table.insertRow();

    row.insertCell(0).innerHTML = studentData.name;

    for (let i = 0; i < studentData.grades.length; i++) {
        let gradeFixed = parseFloat(studentData.grades[i]).toFixed(2);
        let status = studentData.grades[i] >= 1.0 ? "Pass" : "Failed";

        let cell = row.insertCell(i + 1);
        cell.innerHTML = `<input type='number' value='${gradeFixed}' min='0' max='4.0' step='0.01' 
                          onchange='updateGWA(this)'> <br> <span>${status}</span>`;
    }

    row.insertCell(7).innerHTML = studentData.gwa;

    let removeCell = row.insertCell(8);
    removeCell.innerHTML = '<button onclick="removeStudent(this)">Remove</button>';
}

function loadStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];

    students.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    let table = document.getElementById("studentTableBody");
    table.innerHTML = ""; 

    students.forEach(student => appendStudentToTable(student));
}

function updateGWA(input) {
    let row = input.parentNode.parentNode;
    let newGrades = [];

    for (let i = 1; i <= 6; i++) {
        let newGrade = parseFloat(row.cells[i].children[0].value);
        if (isNaN(newGrade) || newGrade < 0 || newGrade > 4.0) {
            alert("Please enter valid grades between 0.0 and 4.0.");
            return;
        }
        newGrades.push(newGrade);
    }

    let newGWA = newGrades.reduce((a, b) => a + b, 0) / newGrades.length;
    row.cells[7].innerHTML = newGWA.toFixed(2);

    for (let i = 0; i < newGrades.length; i++) {
        let status = newGrades[i] >= 1.0 ? "Pass" : "Failed";
        row.cells[i + 1].children[1].innerText = status; 
    }

    saveUpdatedStudents();
}

function removeStudent(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);

    saveUpdatedStudents();
}

function saveUpdatedStudents() {
    let table = document.getElementById("studentTableBody");
    let students = [];

    for (let row of table.rows) {
        let name = row.cells[0].innerText;
        let grades = [];

        for (let i = 1; i <= 6; i++) {
            grades.push(parseFloat(row.cells[i].children[0].value));
        }

        let gwa = parseFloat(row.cells[7].innerText);

        students.push({ name, grades, gwa: gwa.toFixed(2) });
    }

    students.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    localStorage.setItem("students", JSON.stringify(students));
}

function goHome() {
    window.location.href = "home.html";
}

function viewGrades() {
    window.location.href = "index.html";
}
