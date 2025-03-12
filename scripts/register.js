//constructor
function Ticket(nombre, tipo, nivel, descripcion, archivo){
    this.nombre = nombre;
    this.tipo = tipo;
    this.nivel = nivel;
    this.descripcion = descripcion;
    this.archivo = archivo; // archivo ahora contendrá la URL temporal de la imagen
}

// Consigue los inputs del html
const inputName = document.getElementById("txtNombre");
const inputType = document.getElementById("txtTipo");
const inputLevel = document.getElementById("txtImportancia");
const inputDescription= document.getElementById("txtDescripcion");

// Nuevo elemento para imagen pegada
const imagePasteArea = document.getElementById('imagePasteArea');
let pastedImageURL = ''; // Almacena la URL temporal de la imagen

// Evento para pegar imagen desde el portapapeles
imagePasteArea.addEventListener('paste', function(event){
    const items = event.clipboardData.items;
    for (let i = 0; i < items.length; i++){
        if (items[i].type.indexOf('image') !== -1){
            const blob = items[i].getAsFile();
            const reader = new FileReader();
            reader.onload = function(evt){
                pastedImageURL = evt.target.result;
                imagePasteArea.innerHTML = `<img src="${pastedImageURL}" style="max-width:100%; max-height:100%;"/>`;
            };
            reader.readAsDataURL(blob);
            event.preventDefault();
            break;
        }
    }
});

function register(){
    if(inputName.value.trim() === ""){
        alert("Ingresa el nombre");
        return;
    }

    // Crear objeto Ticket, pasando la imagen pegada como URL base64
    let newTicket = new Ticket(
        inputName.value,
        inputType.value,
        inputLevel.value,
        inputDescription.value,
        pastedImageURL // Aquí va la imagen pegada
    );

    display(newTicket);

    // Limpia formulario después de registrar (opcional pero recomendado)
    clearForm();
}

function display(ticket){
    const list = document.getElementById("list");
    const p = `
        <div class="card mt-3 p-3">
            <p><strong>Empleado:</strong> ${ticket.nombre}</p>
            <p><strong>Tipo:</strong> ${ticket.tipo}</p>
            <p><strong>Nivel:</strong> ${ticket.nivel}</p>
            <p><strong>Descripción:</strong> ${ticket.descripcion}</p>
            ${ticket.archivo ? `<img src="${ticket.archivo}" style="max-width:300px; margin-top:10px;">` : ''}
        </div>
    `;
    list.innerHTML += p; // inserta en HTML
}

function clearForm(){
    inputName.value = "";
    inputType.value = "Soporte";
    inputLevel.value = "Baja";
    inputDescription.value = "";
    pastedImageURL = "";
    imagePasteArea.innerHTML = `<span style="color:#999;">Haz clic aquí y presiona Ctrl+V para pegar la imagen</span>`;
}
