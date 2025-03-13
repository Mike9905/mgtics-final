// Constructor
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
let pastedImageURL = ""; // Almacena la URL temporal de la imagen

// Cargar tickets desde localStorage
let tickets = JSON.parse(localStorage.getItem("tickets")) || [];

// Funcion para pegar la imagen
imagePasteArea.addEventListener("paste", function(event) {
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
            const blob = items[i].getAsFile();
            const reader = new FileReader();
            reader.onload = function(evt) {
                pastedImageURL = evt.target.result;
                imagePasteArea.innerHTML = `<img src="${pastedImageURL}" style="max-width:100%; max-height:100%;"/>`;
            };
            reader.readAsDataURL(blob);
            event.preventDefault();
            break;
        }
    }
});

function register() {
    // Valida que si exista el nombre en su campo
    if (inputName.value.trim() === "" || inputDescription.value.trim() === "") {
        alert("Ingrese su nombre de empleado.");
        return;
    }
    
    let fileName = inputFile.files.length > 0 ? inputFile.files[0].name : "No adjunto";
    let newTicket = new Ticket(inputName.value, inputType.value, inputImportance.value, inputDescription.value, fileName, pastedImageURL);
    
    tickets.push(newTicket);
    saveTickets(); // Funcion que guarda en local storage
    display();
}

function display() {
    const list = document.getElementById("list");
    list.innerHTML = ""; 
    
    tickets.forEach(ticket => {
        list.innerHTML += `
        <div class='card p-3 mb-2 text-dark' id='ticket-${ticket.id}'> <!-- Aquí se agrega text-dark -->
            <p><strong>Nombre:</strong> ${ticket.name}</p>
            <p><strong>Tipo:</strong> ${ticket.type}</p>
            <p><strong>Importancia:</strong> ${ticket.importance}</p>
            <p><strong>Descripción:</strong> ${ticket.description}</p>
            <p><strong>Archivo adjunto:</strong> ${ticket.fileName}</p>
            ${ticket.image ? `<img src="${ticket.image}" style="max-width:300px; margin-top:10px;">` : ''}
            <button class='btn btn-danger btn-sm' onclick='deleteTicket(${ticket.id})'>Eliminar</button>
        </div>
    `;
    
    });

    if (tickets.length > 0) {
        list.innerHTML += `<button class='btn btn-warning w-50 mt-3' onclick='deleteAllTickets()'>Eliminar todas las solicitudes</button>`;
    }
}

function deleteTicket(id) {
    tickets = tickets.filter(ticket => ticket.id !== id);
    saveTickets(); 
    display();
}

function deleteAllTickets() {
    tickets = [];
    saveTickets(); 
    display();
}

function saveTickets() {
    localStorage.setItem("tickets", JSON.stringify(tickets));
}


document.addEventListener("DOMContentLoaded", display);
