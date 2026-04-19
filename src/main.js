`use strict`

// läs in och lägg api i en variabel
const cvApi = "http://localhost:3500/api/workexperience";

// fixa datumformat 
function convertDate(date) {
    return new Date(date).toLocaleDateString("sv-SE");
}

// Visa meddelanden på sidan 
function showMessage(text, type = "success") {
    const msg = document.getElementById("message");
    if (!msg) return;

    msg.textContent = text;
    msg.className = type;

    setTimeout(() => {
        msg.textContent = "";
        msg.className = "";
    }, 3000);
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

    if (!container) return; // hoppa ur funktionen om container saknas

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
            <p class="date">${startDate} - ${endDate}</p>
            <p>${item.description}</p>

            <button class="delete-btn" data-id="${item.id}">
                Ta bort
            </button>
            `;

        // hitta delete-knappen i DOM
        const btn = div.querySelector(".delete-btn");
        // radera vid klick
        btn.addEventListener("click", async () => {
            const res = await fetch(`${cvApi}/${item.id}`, {
                method: "DELETE"
            });

            if (res.ok) {
                showMessage("Erfarenhet borttagen");
                // uppdatera lista
                getCv();
            } else {
                showMessage("Kunde inte ta bort", "error");
            }
        });

        // lägg till i DOM
        container.appendChild(div);
    });
}

// lägg till nytt jobb
async function addWorkExperience(newWork) {
    try {
        // POST-anrop till API
        const res = await fetch(cvApi, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newWork)
        });

        if (res.ok) {
            document.getElementById("cvForm")?.reset(); // töm formuläret
            showMessage("Erfarenhet sparad!")
        } else {
            showMessage("Något gick fel vid sparning", "error");
        }

    } catch (error) {
        // skriv ut fel i konsollen om misslyckas
        console.error("POST error:", error);
    }
}

// leta upp formulär i DOM
const form = document.getElementById("cvForm");

// Kolla att det finns på aktuell sida
if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // skapa objekt av formulärdata
        const newWork = {
            company_name: document.getElementById("company_name").value.trim(),
            job_title: document.getElementById("job_title").value.trim(),
            start_date: document.getElementById("start_date").value,
            end_date: document.getElementById("end_date").value || null,
            description: document.getElementById("description").value.trim()
        };

        // kolla att att fält är ifyllda
        if (!newWork.company_name || !newWork.job_title || !newWork.start_date || !newWork.description) {
            showMessage("Fyll i alla obligatoriska fält", "error");
            return;
        }

        // kolla att slutdatum inte är före starttadum
        if (newWork.end_date && newWork.end_date < newWork.start_date) {
            showMessage("Slutdatum kan inte vara före startdatum", "error");
            return;
        }

        // skicka in till API:et
        addWorkExperience(newWork);
    });
}

// kör när sidan laddas
if (document.getElementById("cv")) {
    getCv();
}