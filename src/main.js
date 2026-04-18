`use strict`

// läs in och lägg api i en variabel
const cvApi = "http://localhost:3500/api/workexperience";

// fixa datumformat 
function convertDate(date) {
    return new Date(date).toLocaleDateString("sv-SE");
}

// Hämta data
async function getCv() {
    try {
        const response = await fetch(cvApi);
        const data = await response.json();

        data.sort((a, b) => new Date(b.start_date) - new Date(a.start_date)); //sortera fallande

        renderCv(data); // skicka data till funktion

        // skriv ut ev fel i konsoll
    } catch (error) {
        console.error("Error:", error);
    }
}

// skriv ut till html
function renderCv(list) {
    const container = document.getElementById("cv");

    container.innerHTML = ""; // rensa ev gammalt innehåll

    // loopa igenom och skriv ut
    list.forEach(item => {
        // fixa datumformat
        const startDate = convertDate(item.start_date);
        const endDate = item.end_date ? convertDate(item.end_date) : "Pågående";

        // skapa ny div
        const div = document.createElement("div");

        //  med innehåll
        div.innerHTML = `
            <h3>${item.company_name}</h3>
            <p><strong>${item.job_title}</strong></p>
            <p>${startDate} - ${endDate}</p>
            <p>${item.description}</p>

            <button class="delete-btn" data-id="${item.id}">
                Ta bort
            </button>
    
            <hr>
        `;

        // hitta delete-knappen i DOM
        const btn = div.querySelector(".delete-btn");
        // radera vid klick
        btn.addEventListener("click", async () => {
            await fetch(`${cvApi}/${item.id}`, {
                method: "DELETE"
            });
            // uppdatera lista
            getCv();
        });

        // lägg till i DOM
        container.appendChild(div);
    });
}
// kör när sidan laddas
getCv();