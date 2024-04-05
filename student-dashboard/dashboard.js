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
    var userName = sessionStorage.getItem("userName");
    var userType = sessionStorage.getItem("userType");

    // Set user name
    document.getElementById("userName").textContent = userName;
    document.getElementById("userType").textContent = userType;


}


// Call the functions when the page loads
window.onload = function() {
    checkLoggedIn();
    populateDashboard();
};


// Get the popup
var popup = document.getElementById("popup");

// Get the button that opens the popup
var addButton = document.getElementById("add-button");

// Get the <span> element that closes the popup
var closeBtn = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the popup 
addButton.onclick = function() {
    popup.style.display = "block";
}

// When the user clicks on <span> (x), close the popup
closeBtn.onclick = function() {
    popup.style.display = "none";
}

// When the user clicks anywhere outside of the popup, close it
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = "none";
    }
}


//add data to the local storage 
document.addEventListener("DOMContentLoaded", function () {
    // Get user from session storage
    const user = sessionStorage.getItem("userName");

    // Get references to form elements
    const formateurSelect = document.getElementById("formateur");
    const bootcampSelect = document.getElementById("bootcamp");
    const titreInput = document.getElementById("titre");
    const briefInput = document.getElementById("brief");
    const detailsTextarea = document.getElementById("details");
    const submitButton = document.getElementById("submit");

    // Add event listener to the submit button
    submitButton.addEventListener("click", function () {
        // Get the values from the form elements
        const formateur = formateurSelect.value;
        const bootcamp = bootcampSelect.value;
        const titre = titreInput.value;
        const brief = briefInput.value;
        const details = detailsTextarea.value;
        const creationDate = new Date().toLocaleDateString(); // Get today's date
        const difficulty = ""; // Initialize difficulty with empty value
        const valid = false; // Set validity to false by default
    
        // Get the existing data from local storage or initialize it if it doesn't exist
        let blockages = JSON.parse(localStorage.getItem("blockages")) || [];
        
        // Get the last used ID from local storage or initialize it to 0 if it doesn't exist
        let lastId = parseInt(localStorage.getItem("lastId")) || 0;
    
        // Increment the last used ID
        lastId++;
    
        // Add the new entry to the blockages array with the incremented ID
        blockages.push({
            id: lastId,
            user: user, // Add user from session storage
            formateur: formateur,
            bootcamp: bootcamp,
            titre: titre,
            brief: brief,
            details: details,
            creationDate: creationDate,
            difficulty: difficulty,
            valid: valid,
            solution: "", // Initialize solution with empty value
            type_solution: "" // Initialize type_solution with empty value
        });
    
        // Save the updated blockages array to local storage
        localStorage.setItem("blockages", JSON.stringify(blockages));
    
        // Update the last used ID in local storage
        localStorage.setItem("lastId", lastId);
    
        // Clear the form fields
        formateurSelect.value = "";
        bootcampSelect.value = "";
        titreInput.value = "";
        briefInput.value = "";
        detailsTextarea.value = "";
    
        // Optionally, display a confirmation message or perform any other actions
        alert("Entry added successfully!");
    });
    
});

// get data dynamically from local storage

document.addEventListener("DOMContentLoaded", function () {
    // Get user from session storage
    const user = sessionStorage.getItem("userName");

    // Function to render data from local storage
    function renderData() {
        const blockages = JSON.parse(localStorage.getItem("blockages")) || [];

        // Select the data-table element
        const dataTable = document.querySelector('.data-table');

        // Clear existing entries
        dataTable.innerHTML = "";

        // Add the title row
        const titleRow = document.createElement("div");
        titleRow.id = "title";
        titleRow.innerHTML = `
            <div><p>Nom</p></div>
            <div><p>Date de creation</p></div>
            <div><p>Difficulte</p></div>
            <div><p>Valide</p></div>
        `;
        dataTable.appendChild(titleRow);

        // Loop through each entry in blockages
        blockages.forEach(function (entry) {
            // Check if the entry matches the current user
            if (entry.user === user) {
                // Create a new div element for each entry
                const newDataDiv = document.createElement("div");
                newDataDiv.classList.add("data");

                // Add content to the new div element
                newDataDiv.innerHTML = `
                    <div><p>${entry.user}</p></div>
                    <div><p>${entry.creationDate}</p></div>
                    <div><p>${entry.difficulty}</p></div>
                    <div>
                        <img src="../assets/${entry.valid ? 'check' : 'cross'}.png" alt="" />
                        <div>
                            <button ${entry.valid ? '' : 'disabled'}>
                                <i class="fas fa-pen" style="color: ${!entry.valid ? 'green' : 'grey'}; font-size: 16px"></i>
                            </button>
                            <button ${entry.valid ? '' : 'disabled'}>
                                <i class="fas fa-trash" style="color: ${!entry.valid ? 'red' : 'grey'}; font-size: 16px"></i>
                            </button>
                        </div>
                    </div>
                `;

                // Append the new div element to the data-table
                dataTable.appendChild(newDataDiv);
            }
        });
    }

    // Call the renderData function to initially render the data
    renderData();
});


// Function to handle deletion
function deleteEntry(id) {
    // Get the blockages array from local storage
    let blockages = JSON.parse(localStorage.getItem("blockages")) || [];
    
    // Filter out the entry with the specified ID
    blockages = blockages.filter(entry => entry.id !== id);
    
    // Save the updated blockages array back to local storage
    localStorage.setItem("blockages", JSON.stringify(blockages));
    
    // Re-render the data
    renderData();
}

// Function to handle modification
function modifyEntry(id) {
    // You can reuse the existing popup for modification
    // Populate the fields in the popup with the existing data of the entry with the specified ID
    // Show the popup for modification
}

// Update the renderData function to include delete and modify buttons with click handlers
function renderData() {
    const blockages = JSON.parse(localStorage.getItem("blockages")) || [];
    const dataTable = document.querySelector('.data-table');
    dataTable.innerHTML = "";

    // Title row
    const titleRow = document.createElement("div");
    titleRow.id = "title";
    titleRow.innerHTML = `
        <div><p>Nom</p></div>
        <div><p>Date de creation</p></div>
        <div><p>Difficulte</p></div>
        <div><p>Valide</p></div>
        <div><p>Action</p></div>
    `;
    dataTable.appendChild(titleRow);

    blockages.forEach(function (entry) {
        if (entry.user === user) {
            const newDataDiv = document.createElement("div");
            newDataDiv.classList.add("data");
            newDataDiv.innerHTML = `
                <div><p>${entry.user}</p></div>
                <div><p>${entry.creationDate}</p></div>
                <div><p>${entry.difficulty}</p></div>
                <div>
                    <img src="../assets/${entry.valid ? 'check' : 'cross'}.png" alt="" />
                </div>
                <div>
                    <button onclick="modifyEntry(${entry.id})">
                        <i class="fas fa-pen" style="color: ${!entry.valid ? 'green' : 'grey'}; font-size: 16px"></i>
                    </button>
                    <button onclick="deleteEntry(${entry.id})">
                        <i class="fas fa-trash" style="color: ${!entry.valid ? 'red' : 'grey'}; font-size: 16px"></i>
                    </button>
                </div>
            `;
            dataTable.appendChild(newDataDiv);
        }
    });
}
