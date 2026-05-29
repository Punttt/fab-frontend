import { API_URL, showMessage } from "./api.js";

// Hämtar JWT token från session storage
const token = sessionStorage.getItem("token");

// Om inget token finns, skicka tillbaka till login sidan
if(!token) {
    window.location.href = "/login";
}

let currentMenuId = null;

// När token raderat redirect till login-sidan
document.getElementById("logoutBtn").addEventListener("click", () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login";
});

// Ladda veckoformuläret
const weekForm = document.getElementById("weekForm");

// Eventlyssnare för veckoformuläret
weekForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const week = weekForm.week_number.value;
    const year = weekForm.year.value;

    try {

    } catch (error) {
        console.error(error);
        showMessage("weekStatus", "Kunde inte ansluta till servern", "error");
    }
}); 