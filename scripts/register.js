//constructor
function Ticket(nombre,tipo,nivel,descripcion,archivo){
    this.nombre=nombre;
    this.tipo=tipo;
    this.nivel=nivel;
    this.descripcion=descripcion;
    this.archivo=archivo;
}
//Consigue los inputs del html
const inputName = document.getElementById("txtNombre");
const inputType = document.getElementById("txtTipo");
const inputLevel = document.getElementById("txtImportancia");
const inputDescription= document.getElementById("txtDescripcion");
const inputfile = document.getElementById("archivoAdjunto");
let p;

function register(){
    // crear objeto
    let newTicket = new Ticket(inputName.value,inputType.value,inputLevel.value,inputDescription.value,inputfile.value);
    //desplegar el obj
    if( inputName.value == ""){
        alert("Ingresa el nombre");
    }else{
        display(newTicket);
    }
}

function display(ticket){
    const list = document.getElementById("list");
    p=`
    <div> 
        <p>${ticket.nombre} </p>
        <p>${ticket.tipo} </p>
        <p>${ticket.nivel} </p>
        <p>${ticket.descripcion} </p>
        <p>${ticket.archivo} </p>
    </div>
    `;
    list.innerHTML+=p;// inserta en HTML
}


