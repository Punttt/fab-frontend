// Importerar API:et
import { API_URL } from "./api.js";

// Mappning för dagarna till sv

const dayNames =  {
    monday: "MÅNDAG",
    tuesday: "TISDAG",
    wednesday: "ONSDAG",
    thursday: "TORSDAG",
    friday: "FREDAG"
};

const dayOrder = ["monday","tuesday","wednesday","thursday","friday"];

// HHämtar veckans meny
async function loadWeeklyMenu() {
    const container = document.getElementById("menu-container");

    try {
        const response = await fetch(`${API_URL}/menu/current`);

        if(!response.ok) {
            container.innerHTML = "<p>Veckans menu är ännu inte publicerad</p>";
        }
    } catch (error) {
        console.error("Kunde inte hämta menyn:", error);
        container.innerHTML = "<p>Kunde inte ladda menyn just nu.</p>";
    }
}