function generateRandomToken() {
    return Math.floor(Math.random() * 900000 + 100000);
}

// local storAge

// saving DaTa
function saveToLocalStorage(fullName, email, password, token) {
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    localStorage.setItem('token', token);
}
// Getting Data fROm local storAge
function getFromLocalStorage() {
    const fullName = localStorage.getItem('fullName');
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const token = localStorage.getItem('token');
    return { fullName, email, password, token };
}


// filling details 
function showProfile() {
    const fullName = document.getElementById("fullName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!fullName || !email || !password || !confirmPassword) {
        document.getElementById("error-message").textContent = "Oops! All fields are mandatory.";
        return;
    }

    if (password !== confirmPassword) {
        document.getElementById("error-message").textContent = "Oops! Passwords do not match.";
        return;
    } else {
        document.getElementById("error-message").textContent = "";
    }

     // Checking if user is already logged in
     const storedData = getFromLocalStorage();
     let token;
     if (storedData.email) {
         //if already logged in, reuse the existing token
         token = storedData.token;
     } else {
         // ifnot logged in, generate a new token
         token = generateRandomToken();
     }
    saveToLocalStorage(fullName, email, password, token);

    document.getElementById("profileFullName").textContent = " " + fullName;
    document.getElementById("profileEmail").textContent = " " + email;
    document.getElementById("profileToken").textContent = " " + token;
    document.getElementById("profilePassword").textContent = " " + password;

    document.getElementById("signup-form").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("profile").style.display = "flex";
}

function showSignupForm() {
    localStorage.clear();
    document.getElementById("signup-form").style.display = "block";
    document.getElementById("profile").style.display = "none";
    document.getElementById("dashboard").style.display = "none";

    document.getElementById("signup").reset();
    document.getElementById("error-message").textContent = "";
}

//data not lost even after reloading the pAge
window.onload = function() {
    const storedData = getFromLocalStorage();
    if (storedData.email) {
        document.getElementById("fullName").value = storedData.fullName;
        document.getElementById("email").value = storedData.email;
        document.getElementById("password").value = storedData.password;
        document.getElementById("confirmPassword").value = storedData.password;
        showProfile();
    }
}