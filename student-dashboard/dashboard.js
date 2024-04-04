// Function to check if user is logged in
function checkLoggedIn() {
    if (!sessionStorage.getItem("loggedIn")) {
        // If user is not logged in, redirect to login page
        window.location.href = "../auth/login.html";
    }
}

// Function to logout
function logout() {
    // Clear specific items from session storage
    sessionStorage.removeItem("loggedIn");
    sessionStorage.removeItem("userType");
    sessionStorage.removeItem("userName");

    // Redirect to the login page
    window.location.href = "../auth/login.html";
}

// Function to populate dashboard data
function populateDashboard() {
    // Get user data from session storage
    var userType = sessionStorage.getItem("userType");
    var userName = sessionStorage.getItem("userName");

    // Set dashboard title
    document.getElementById("dashboardTitle").textContent = userType + " Dashboard";

    // Set user type and name
    document.getElementById("userType").textContent = userType + ": ";
    document.getElementById("userName").textContent = userName;

    // Sample data for demonstration (replace with real data)
    var data = [
        { name: "Karim", date: "12/03/2024", difficulty: "medium", valid: true },
        { name: "Imane", date: "25/03/2024", difficulty: "hard", valid: true }
    ];

    // Get the data table element
    var dataTable = document.querySelector(".data-table");

    // Clear existing data
    dataTable.innerHTML = "";

    // Populate data table
    data.forEach(function(item) {
        // Create a new data row
        var row = document.createElement("div");
        row.classList.add("data");

        // Add data to the row
        row.innerHTML = `
            <div><p>${item.name}</p></div>
            <div><p>${item.date}</p></div>
            <div><p>${item.difficulty}</p></div>
            <div><img src="${item.valid ? '../assets/check.png' : '../assets/cross.png'}" alt=""></div>
        `;

        // Append the row to the data table
        dataTable.appendChild(row);
    });
}

// Call the functions when the page loads
window.onload = function() {
    checkLoggedIn();
    populateDashboard();
};
