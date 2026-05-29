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
        // Hämtar veckomenyn
        const response = await fetch(`${API_URL}/menu/${year}/${week}`);

        if(response.ok) {
            const menu = await response.json();
            currentMenuId = menu.id;
            showMessage("weekStatus", `Veckomenyn för vecka ${week}, ${year} laddad`);
            showEditSection();
        } else if (response.status === 404) {
            // Om veckan inte finns, så ska den skapas
            await createWeek(week, year);
        } else {
            showMessage("weekStatus", "Kunde inte ladda veckan", "error");
        }

    } catch (error) {
        console.error(error);
        showMessage("weekStatus", "Kunde inte ansluta till servern", "error");
    }
}); 


// VISA / REDIGERA SECTIONEN
function showEditSection(){
    const editSection = document.getElementById("edit-menu");
    editSection.classList.remove("hidden");
}

// Funktioner
async function createWeek(year, week) {
    try {
        const response = await fetch(`${API_URL}/menu`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ week_number: Number(week), year: Number(year) })
        });

        const data = await response.json();

        if(response.ok) {
            currentMenuId = data.menu.id;
            showMessage("weekStatus", `Ny veckomeny skapad för vecka ${week}, ${year}.`, "success" );
            showEditSection();
        } else {
            showMessage("weekStatus", data.error || "Kunde inte skapa en vecka just nu", "error");
        }

    } catch (error) {
        console.error(error);
        showMessage("weekStatus", "Kunde inte ansluta till servern", "error");
    }
}