function goHome() {
    window.location.href = "index.html";
}

function viewGrades() {
    if (!localStorage.getItem("username")) {
        alert("Please enter your name before accessing the Grades page.");
        return;
    }
    window.location.href = "grades.html";
}

function contactUs() {
    if (!localStorage.getItem("username")) {
        alert("Please enter your name before accessing the Contact Us page.");
        return;
    }
    window.location.href = "contactpage.html";
}

function greetUser() {
    let name = document.getElementById("username").value.trim();
    if (name === "") {
        alert("Please enter your name.");
        return;
    }

    localStorage.setItem("username", name);

    document.getElementById("greeting-message").innerText = `Hello, ${name}! 
    Welcome to the Student Grading System.`;
}

window.onload = function () {
    let savedName = localStorage.getItem("username");
    if (savedName) {
        document.getElementById("username").value = savedName;
        document.getElementById("greeting-message").innerText = `Hello, ${savedName}! Welcome to the Student Grading System.`;
    }
};
