import { showMessage } from "./api.js";

document.addEventListener("DOMContentLoaded", ()=> {

    // HÄmtar formulär
    const form = document.getElementById("form-lunch");

    if(form) {
        form.addEventListener("submit", (e)=>{
            e.preventDefault();

            showMessage(
                "message",
                "Tack! Din bokning har tagits emot, du kommer att få en bekräftelse via SMS",
                "success"
            );

            form.reset();
        })
    }
});