// signup.js

var users = JSON.parse(localStorage.getItem("users")) || []; // Retrieve users from localStorage or initialize an empty array
function handleSignup() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Retrieve the latest version of the users array from localStorage
    var users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if the email already exists
    var existingUser = users.find(function(user) {
        return user.email === email;
    });

    // If email already exists, show an alert
    if (existingUser) {
        alert("This email is already registered. Please use a different email address.");
        return; // Exit the function
    }

    // Create a new user object
    var newUser = { name: name, email: email, password: password, type: "student" };

    // Add the new user to the users array
    users.push(newUser);

    // Update localStorage with the updated users array
    localStorage.setItem("users", JSON.stringify(users));

    // Show a message
    alert("Signup successful! You can now login with your credentials.");

    // Redirect to login page after signup
    window.location.href = "login.html";
}


document.getElementById("signup").addEventListener("submit", function(event) {
    event.preventDefault(); 
    handleSignup(); 
});
