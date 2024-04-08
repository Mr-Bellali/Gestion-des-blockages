// Check if the users array exists in localStorage
var users = JSON.parse(localStorage.getItem("users"));

// If the users array doesn't exist, initialize it with sample user data
if (!users) {
    users = [
        { name: "abdelaziz", email: "abdelaziz@gmail.com", password: "admin", type: "admin" },
        { name: "ilyas", email: "ilyas@gmail.com", password: "admin", type: "admin" },
        { name: "yassine", email: "yassine@gmail.com", password: "admin", type: "admin" },
        { name: "yassine", email: "yassine1@gmail.com", password: "123456", type: "student" }
    ];

    // Store users array in localStorage
    localStorage.setItem("users", JSON.stringify(users));
}

// Function to handle the login process
function handleLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Retrieve users array from localStorage
    var users = JSON.parse(localStorage.getItem("users"));

    // Find the user with the provided email and password
    var user = users.find(function(user) {
        return user.email === email && user.password === password;
    });

    // If user is found, set session storage items and redirect to dashboard
    if (user) {
        sessionStorage.setItem("loggedIn", true);
        sessionStorage.setItem("userType", user.type);
        sessionStorage.setItem("userName", user.name); // Set the user's name

        // Add console.log statements to verify data
        console.log("User logged in:", user);
        console.log("User type:", user.type);
        console.log("User name:", user.name);

        if (user.type === "admin") {
            window.location.href = "../admin-dashboard/dashboard.html";
        } else if (user.type === "student") {
            window.location.href = "../student-dashboard/dashboard.html";
        }
    } else {
        // If user is not found, show an alert indicating login failure
        alert("Login failed. Please check your email or password.");
    }
}

// Add event listener to the login form for handling login submission
document.getElementById("login").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission
    handleLogin(); // Call the handleLogin function to process login
});
