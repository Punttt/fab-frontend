// Importerar API:et
import { API_URL, showMessage } from "./api.js";

// Hämtar form från loginsidan
const form = document.querySelector("form");

// Eventlyssnare för form.
form.addEventListener("submit", async (e) => {
    // Förhindrar sidomladdning
    e.preventDefault();

    // Hämtar värdena 
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Klientvalidering
    if (!username || !password) {
        showMessage("message", "Alla fält måste fyllas i", "error");
        return;
    }

    try {
        // Skickar POST anrop till backend.
        const response = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        }); 

        const data = await response.json();
        
        // Hanterar response från servern
        if(response.ok) {
            // Sparar token i local storage
            sessionStorage.setItem("token", data.token); 
            window.location.href = "/admin";
            showMessage("message", "Du är inloggad", "success");
        } else {
            showMessage("message", "Det är fel användarnamn eller lösenord, försök igen senare", "error");
        }
    } catch (error) {
        console.error(error);
        showMessage("message", "Kunde inte ansluta till servern", "error")
    }
})