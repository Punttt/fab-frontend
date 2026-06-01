// API - url
export const API_URL = "https://fab-backend-l9o4.onrender.com/api";

// Funktion för felmeddelande i UI:T
// anropar id på elementet i UI:t, text = felmeddelande, type: class för error eller succes css.
export function showMessage (elementId, text, type) {
    const el = document.getElementById(elementId);
    if(!el) return;
    el.textContent = text;
    el.className = type;
}