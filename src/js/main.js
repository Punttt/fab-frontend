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

        // Om inte veckan är publicerad i db
        if(!response.ok) {
            container.innerHTML = "<p>Veckans menu är ännu inte publicerad</p>";
            return;
        }

        const menu = await response.json();

        // Om meny finns i db men inga rätter är publcierad
        if(!menu.items || menu.items.length === 0) {
            container.innerHTML = "<p>Inga rätter är inlagd för denna vecka ännu.</p>";
            return;
        }

        
    } catch (error) {
        console.error("Kunde inte hämta menyn:", error);
        container.innerHTML = "<p>Kunde inte ladda menyn just nu.</p>";
    }
}