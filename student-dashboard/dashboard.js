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
var difPopup = document.getElementById("dif-popup");


// Get the button that opens the popup
var addButton = document.getElementById("add-button");

// Get the <span> element that closes the popup
var closeBtn = document.getElementsByClassName("close")[0];


// When the user clicks the button, open the popup 
addButton.onclick = function() {
    document.getElementById("popup-title").innerHTML = 'Ajout'
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
            difficulty: details,
            creationDate: creationDate,
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
        window.location.href = "./dashboard.html"
        
    });
    
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
                //${entry.difficulty}
                // Add content to the new div element
                newDataDiv.innerHTML = `
                    <div><p>${entry.user}</p></div>
                    <div><p>${entry.creationDate}</p></div>
                    <div><div><button onclick="showDifuculte('${entry.difficulty}')"><i class="fas fa-eye"></i></button></div>               </div>
                    <div>
                        <img src="../assets/${entry.valid ? 'check' : 'cross'}.png" alt="" />
                        <div>
                            <button onclick="modifyEntry(${entry.id})">
                                <i class="fas fa-pen" style="color: ${!entry.valid ? 'green' : 'grey'}; font-size: 16px"></i>
                            </button>
                            <button onclick="deleteEntry(${entry.id})">
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
// Function to handle deletion with confirmation
function deleteEntry(id) {
    // Get the confirmation popup element
    var confirmationPopup = document.querySelector('.show-confirmation');
    
    // Show the confirmation popup
    confirmationPopup.style.display = "block";
    
    // Add event listener to the "Confirm" button
    document.getElementById("yes-delete").addEventListener("click", function() {
        // Get the blockages array from local storage
        let blockages = JSON.parse(localStorage.getItem("blockages")) || [];
        
        // Filter out the entry with the specified ID
        blockages = blockages.filter(entry => entry.id !== id);
        
        // Save the updated blockages array back to local storage
        localStorage.setItem("blockages", JSON.stringify(blockages));
        
        // Re-render the data
        window.location.href = "./dashboard.html";
        
        // Close the confirmation popup
        confirmationPopup.style.display = "none";
    });

    // Add event listener to the "Cancel" button
    document.getElementById("no-delete").addEventListener("click", function() {
        // Close the confirmation popup without performing any action
        confirmationPopup.style.display = "none";
    });
}



// Function to handle modification
function modifyEntry(id) {
    console.log("Modify button clicked for entry with ID:", id);

    // Get the blockages array from local storage
    let blockages = JSON.parse(localStorage.getItem("blockages")) || [];
    
    // Find the entry with the specified ID
    const entryToModify = blockages.find(entry => entry.id === id);
    
    // If entry found, populate the popup with its data
    if (entryToModify) {
        // Set the values in the form fields
        document.getElementById("formateur").value = entryToModify.formateur;
        document.getElementById("bootcamp").value = entryToModify.bootcamp;
        document.getElementById("titre").value = entryToModify.titre;
        document.getElementById("brief").value = entryToModify.brief;
        document.getElementById("details").value = entryToModify.difficulty;
        
        // Display the popup
        document.getElementById("popup-title").innerHTML = 'Modifier';
        popup.style.display = "block";
        
        // Add event listener to the submit button with modified functionality
        document.getElementById("submit").addEventListener("click", function () {
            // Update the values of the entry with the modified values
            entryToModify.formateur = document.getElementById("formateur").value;
            entryToModify.bootcamp = document.getElementById("bootcamp").value;
            entryToModify.titre = document.getElementById("titre").value;
            entryToModify.brief = document.getElementById("brief").value;
            entryToModify.details = document.getElementById("details").value;
            
            // Save the updated blockages array to local storage
            localStorage.setItem("blockages", JSON.stringify(blockages));
            
            // Optionally, display a confirmation message or perform any other actions
            alert("Entry modified successfully!");
            
            // Close the popup
            popup.style.display = "none";
            
            // Re-render the data
            renderData();
        });

        // Add event listener to the close button to clear input fields
        closeBtn.addEventListener("click", function () {
            // Clear the input fields
            document.getElementById("formateur").value = "";
            document.getElementById("bootcamp").value = "";
            document.getElementById("titre").value = "";
            document.getElementById("brief").value = "";
            document.getElementById("details").value = "";
            
            // Close the popup
            popup.style.display = "none";
        });
    } else {
        // If entry not found, display an error message or handle it accordingly
        console.log("Entry not found for ID:", id);
    }
}


function showDifuculte(difficulty) {
    console.log("Eye icon clicked!!");
    
    // Create a div element for the popup window
    var popupWindow = document.createElement("div");
    popupWindow.className = "difficulty-popup";
    
    // Apply styles to the popup window
    popupWindow.style.backgroundColor = "white";
    popupWindow.style.borderRadius = "15px";
    popupWindow.style.borderColor = "#ce0033";
    popupWindow.style.borderWidth = "1px";
    popupWindow.style.borderStyle = "solid";
    popupWindow.style.padding = "10px";
    
    // Set the content of the popup window
    popupWindow.innerHTML = `
        <p>Difficulty: ${difficulty}</p>
    `;
    
    // Position the popup window below the eye icon
    var eyeIcon = event.target;
    var eyeIconRect = eyeIcon.getBoundingClientRect();
    popupWindow.style.position = "absolute";
    popupWindow.style.left = eyeIconRect.left + "px";
    popupWindow.style.top = (eyeIconRect.bottom + window.scrollY) + "px";
    
    // Append the popup window to the document body
    document.body.appendChild(popupWindow);
    
    // Close the popup window when clicked outside
    window.addEventListener("click", function(event) {
        if (!popupWindow.contains(event.target) && event.target !== eyeIcon) {
            popupWindow.remove();
        }
    });
}


//show delete confiramation 

