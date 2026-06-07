import { API_URL, showMessage } from "./api.js";
import { getISOWeek, getISOWeekYear } from "date-fns";

// Hämtar JWT token från session storage
const token = sessionStorage.getItem("token");

// Om inget token finns, skicka tillbaka till login sidan
if(!token) {
    window.location.href = "/login";
}

let currentMenuId = null;
let currentItems = []; // Sparar rätter för den valda veckan

// Laddar DOM 
document.addEventListener("DOMContentLoaded", ()=>{
    const today = new Date();
    document.querySelector('input[name="week_number"]').value = getISOWeek(today);
    document.querySelector('input[name="year"]').value = getISOWeekYear(today);    
})

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
            currentItems = menu.items || [];

            showMessage("weekStatus", `Veckomenyn för vecka ${week}, ${year} laddad`);
            showEditSection();
            fillFormsWithCurrentMenu();
        } else if (response.status === 404) {
            // Om veckan inte finns, så ska den skapas
            await createWeek(year, week);
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
            currentItems = []; 
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

// Spara en ny rätt för veckan.
const dayForm = document.querySelectorAll(".menu-day");

dayForm.forEach(form => {
    form.addEventListener("submit", async (e) =>{
        e.preventDefault();

        // måste ladda en vecka
        if(!currentMenuId) {
            alert("Ladda en vecka först");
            return;
        }

        const dish = form.dish.value.trim();
        const dayOfWeek = form.day_of_week.value;
        const button = form.querySelector("button");

        // Validerar om man skrivit en rätt
        if (!dish) {
            alert("Skriv in en rätt");
            return;
        }

        // Kontrollera om dagen redan finns.
        const existing = currentItems.find(item => item.day_of_week === dayOfWeek);

        try {

            let response;
            if (existing){
                // PUT för att uppdatera en rätt som redan finns.
                response = await fetch(`${API_URL}/menu/item/${existing.id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({ dish })
                });               
            } else {
                // POST - skapar ny rätt för dagen (om ringen rätt finns)
                response = await fetch(`${API_URL}/menu/item`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        weekly_menu_id: currentMenuId,
                        day_of_week: dayOfWeek,
                        dish: dish
                    })
                });
            }

            if(response.ok) {
                const data = await response.json();

                if(!existing) {
                    currentItems.push(data.item)
                } else {
                    existing.dish = dish
                }

                button.textContent = "Sparad!";
                setTimeout(() => {button.textContent = existing ? "Uppdatera" : "Uppdatera"; }, 2000);
            } else {
                const data = await response.json();
                alert(data.error || "Kunde inte spara");
            }

        } catch (error) {
            console.error(error);
            alert("Kunde inte ansluta till servern.");
        }
    });
})

// Funktion för att fylla formuläret med veckans meny
function fillFormsWithCurrentMenu() {
    dayForm.forEach(form => {
        const dayOfWeek = form.day_of_week.value;
        const textarea = form.dish;

        // Hittar motsvarande item om det finns
        const existing = currentItems.find(item => item.day_of_week === dayOfWeek);

        // Validering om det fins
        if (existing) {
            textarea.value = existing.dish;
            form.querySelector("button").textContent = "Uppdatera";
        } else {
            textarea.value = "";
            form.querySelector("button").textContent = "Spara";
        }
    })
}