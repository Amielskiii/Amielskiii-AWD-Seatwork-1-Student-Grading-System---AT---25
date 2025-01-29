function sendEmail() {
    let message = document.getElementById("message").value.trim();

    if (message === "") {
        alert("Please enter a message before sending.");
        return;
    }

    let recipient = "Inputhere@.com";
    let subject = "Inquiry from Student GWA System";
    let mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    window.location.href = mailtoLink;
}

function goHome() {
    window.location.href = "index.html";
}

function viewGrades() {
    window.location.href = "grades.html";
}
