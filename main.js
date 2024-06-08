
document.addEventListener('DOMContentLoaded', function() {
    var loginForm = document.getElementById('loginForm');
    var signUpForm = document.getElementById('signUpForm');
    var homePageContent = document.getElementById('homePageContent');
    var loginPage = document.getElementById('loginPage');
    var SignUpPage = document.getElementById('SignUpPage');
    var loginError = document.getElementById('loginError');
    var signUpError = document.getElementById('signUpError');
    var userNameSpan = document.getElementById('userName');
    var logoutButton = document.getElementById('logoutButton');

    document.getElementById('showSignUp').addEventListener('click', function(e) {
        e.preventDefault();
        loginPage.classList.remove('active');
        SignUpPage.classList.add('active');
    });

    document.getElementById('showLogin').addEventListener('click', function(e) {
        e.preventDefault();
        SignUpPage.classList.remove('active');
        loginPage.classList.add('active');
    });

    SignUpPage.addEventListener('submit', function(e) {
        e.preventDefault();
        var email = document.getElementById('signUpEmail').value;
        var password = document.getElementById('signUpPassword').value;
        var confirmPassword = document.getElementById('signUpConfirmPassword').value;

        if (password !== confirmPassword) {
            signUpError.textContent = "Mismatched passwords";
            return;
        }

        if (localStorage.getItem(email)) {
            signUpError.textContent = "Email is already registered.";
            return;
        }

        localStorage.setItem(email, password);
        signUpError.textContent = "";
        SignUpPage.reset(); 
        SignUpPage.classList.remove('active');
        loginPage.classList.add('active');
    });

    loginPage.addEventListener('submit', function(event) {
        event.preventDefault();
        var email = document.getElementById('loginEmail').value;
        var password = document.getElementById('loginPassword').value;
        var storedPassword = localStorage.getItem(email);

        if (!storedPassword) {
            loginError.textContent = "Email not registered.";
            return;
        }

        if (storedPassword !== password) {
            loginError.textContent = "The password is incorrect";
            return;
        }

        localStorage.setItem('loggedInUser', email);
        loginError.textContent = "";
        loginPage.reset(); 
        loginPage.classList.remove('active');
        homePageContent.classList.add('active');
        userNameSpan.textContent = email;
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser');
        homePageContent.classList.remove('active');
        loginPage.classList.add('active');
    });

    var loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
        loginPage.classList.remove('active');
        homePageContent.classList.add('active');
        userNameSpan.textContent = loggedInUser;
    }
});


