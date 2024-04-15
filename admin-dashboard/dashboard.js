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




function populateDashboard() {
    // Get user data from session storage
    var userName = sessionStorage.getItem("userName");
    var userType = sessionStorage.getItem("userType");

    // Set user name
    document.getElementById("userName").textContent = userName;


}

// Call the functions when the page loads
window.onload = function() {
    checkLoggedIn();
    populateDashboard();
};


//populate the data from the local storage 





//add data to the local storage 
document.addEventListener("DOMContentLoaded", function () {

    
    // Function to render data from local storage
    function renderData() {
        
        try {
            
            const blockages = JSON.parse(localStorage.getItem("blockages")) || [];
            
            console.log("Blockages from local storage:", blockages); // Log blockages to console
            const user = sessionStorage.getItem("userName"); // Get user from session storage

            // Check if blockages exist in local storage
            if (!blockages || blockages.length === 0) {
                
                console.log("No blockages found in local storage.");
                return;
            }

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

            // Loop through each blockage in blockages
            var blockageIndex = -1;
            blockages.forEach(function (blockage, index) {
                // Check if the blockage matches the current user
                if (user != blockage.formateur) {
                    
                    blockageIndex++;

                    console.log("Index:", index); // Log the loop index
                    console.log("Blockage Index:", blockageIndex);

                    // Create a new div element for each blockage
                    const newDataDiv = document.createElement("div");
                    newDataDiv.classList.add("data");
                    // Add content to the new div element
                    newDataDiv.innerHTML = `
                        <div><p>${blockage.user}</p></div>
                        <div><p>${blockage.creationDate}</p></div>
                        <div><div><button onclick="showDifuculte('${blockage.difficulty}')"><i class="fas fa-eye"></i></button></div>
                        </div>
                        <div>
                            <img src="../assets/${blockage.valid ? 'check' : 'cross'}.png" alt="" />
                            <div>
                            <!-- Inside your renderData function where you generate the comment icon button -->
                            <button onclick="showSolution('${blockage.valid}', '${blockage.type_solution}', '${blockage.solution.replace(/[\n\r]+/g, '\\n')}', '${blockageIndex}')">
                                <i class="fas fa-comments" style="font-size: 25px"></i>
                            </button>
                            </div>
                        </div>
                    `;

                    // Append the new div element to the data-table
                    dataTable.appendChild(newDataDiv);
                }
            });
        } catch (error) {
            console.error("Error rendering data:", error);
        }
    }

    // Call the renderData function to initially render the data
    renderData();
});




//function to show difficulty 
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

// show solution and validate it 

function showSolution(valid, type_solution, solution, blockageIndex) {
    console.log("comment icon clicked");

    // Create a div element for the popup window
    var solutionPopup = document.createElement("div");
    solutionPopup.className = "solution-popup";

    // Set the content of the popup window
    solutionPopup.innerHTML = `
        <form id="solutionForm">
            <input type="radio" name="option" value="Encadré dans leurs recherches de solutions"> Encadré dans leurs recherches de solutions<br>
            <input type="radio" name="option" value="Aidé par leurs pairs">Aidé par leurs pairs<br>
            <input type="radio" name="option" value="Intervention directe de formateur"> Intervention directe de formateur<br>
            <textarea id="solution-field" placeholder="Enter la solution" rows="4"></textarea><br>
            <button type="submit">Submit</button>
        </form>
    `;

    // Append the popup window to the document body
    document.body.appendChild(solutionPopup);

    // Position the popup window
    var commentIcon = event.target;
    var commentIconRect = commentIcon.getBoundingClientRect();
    var topPosition = commentIconRect.top + window.scrollY + 40; // Adjusted top position
    var leftPosition = commentIconRect.left - 200; // Adjusted left position
    solutionPopup.style.position = "absolute";
    solutionPopup.style.top = topPosition + "px";
    solutionPopup.style.left = leftPosition + "px";

    // Handle form submission
    var form = document.getElementById("solutionForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        var formData = new FormData(form);
        var selectedOption = formData.get("option");
        var textareaValue = document.getElementById("solution-field").value;

        // Update the blockages object in localStorage
        var blockages = JSON.parse(localStorage.getItem("blockages")) || [];
        // Update the specific blockage's properties
        blockages[blockageIndex].valid = true;
        blockages[blockageIndex].type_solution = selectedOption;
        blockages[blockageIndex].solution = textareaValue;
        // Store the updated blockages object back to localStorage
        localStorage.setItem("blockages", JSON.stringify(blockages));

        // Close the popup window
        alert("valide..");
        solutionPopup.remove();
        href("./dashboard.html")
    });

    // Close the popup window when clicked outside
    document.body.addEventListener("mousedown", function (event) {
        // Check if the clicked element is the solution popup or its child elements
        if (!solutionPopup.contains(event.target)) {
            // If not, remove the solution popup
            solutionPopup.remove();
        }
    });
}
