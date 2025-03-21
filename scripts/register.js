// Constructor del Ticket
function Ticket(name, type, importance, description, fileName, image) {
    this.name = name;
    this.type = type;
    this.importance = importance;
    this.description = description;
    this.fileName = fileName;
    this.image = image;
    this.id = Date.now();
}

// Obtener inputs del HTML
const inputName = document.getElementById("txtNombre");
const inputType = document.getElementById("txtTipo");
const inputImportance = document.getElementById("txtImportancia");
const inputDescription = document.getElementById("txtDescripcion");
const inputFile = document.getElementById("txtFile");
const imagePasteArea = document.getElementById("imagePasteArea");
const ticketList = document.getElementById("list");

let pastedImageURL = "";

// Cargar tickets desde localStorage
let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

// Función para pegar una imagen en el área de pegado
imagePasteArea.addEventListener("paste", function (event) {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            const reader = new FileReader();
            reader.onload = function (evt) {
                pastedImageURL = evt.target.result;
                imagePasteArea.innerHTML = `<img src="${pastedImageURL}" style="max-width:100%; max-height:100%;"/>`;
            };
            reader.readAsDataURL(blob);
            event.preventDefault();
            break;
        }
    }
});

// Guardar y mostrar tickets
function saveAndDisplayTickets() {
    localStorage.setItem("tickets", JSON.stringify(tickets));
    display();
}
function getImportanceColor(level) {
    switch (level) {
        case "Baja":
            return "secondary";
        case "Media":
            return "info";
        case "Alta":
            return "warning";
        case "Crítica":
            return "danger";
        default:
            return "light";
    }
}

function register() {
    if (inputName.value.trim() === "" || inputDescription.value.trim() === "") {
        alert("Ingrese su nombre y una descripción.");
        return;
    }

    let fileName = inputFile.files.length > 0 ? inputFile.files[0].name : "No adjunto";
    let newTicket = new Ticket(
        inputName.value,
        inputType.value,
        inputImportance.value,
        inputDescription.value,
        fileName,
        pastedImageURL
    );

    tickets.push(newTicket);
    saveAndDisplayTickets();

    // ✅ Limpiar el formulario
    document.getElementById("registrationForm").reset();

    // ✅ Limpiar imagen pegada
    imagePasteArea.innerHTML = `<span style="color:#999;">Haz clic aquí y presiona Ctrl+V para pegar la imagen</span>`;
    pastedImageURL = "";
}

// Función para mostrar los tickets almacenados en localStorage
function display() {
    ticketList.innerHTML = "";

    tickets.forEach(ticket => {
        const importanceColor = getImportanceColor(ticket.importance);

        ticketList.innerHTML += `
        <div class="ticket-card">
            <div class="ticket-body">
                <h5 class="ticket-title">${ticket.name}</h5>
                <div class="ticket-tags">
                    <span class="badge type-badge">${ticket.type}</span>
                    <span class="badge importance-badge ${importanceColor}">${ticket.importance}</span>
                </div>
                <p><strong>Descripción:</strong><br>${ticket.description}</p>
                <p><strong>Archivo adjunto:</strong> ${ticket.fileName}</p>
                ${ticket.image ? `<img src="${ticket.image}" class="ticket-image">` : ""}
                <button class="delete-btn" onclick="deleteTicket(${ticket.id})">Eliminar</button>
            </div>
        </div>
        `;
    });

    if (tickets.length > 0) {
        ticketList.innerHTML += `<button class="delete-all-btn" onclick="deleteAllTickets()">Eliminar todas las solicitudes</button>`;
    }
}


// Función para eliminar un ticket específico
function deleteTicket(id) {
    tickets = tickets.filter(ticket => ticket.id !== id);
    saveAndDisplayTickets();
}

// Función para eliminar todos los tickets de la página
function deleteAllTickets() {
    tickets = [];
    saveAndDisplayTickets();
}

// Cargar los tickets cuando la página se carga
document.addEventListener("DOMContentLoaded", display);

