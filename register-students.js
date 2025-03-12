// Constructor de estudiante
function Student(name, age, g1, g2){
    this.name = name;
    this.age = age;
    this.g1 = g1;
    this.g2 = g2;
    }
    // Obtener inputs del HTML
    const inputName = document.getElementById("txtName");
    const inputAge = document.getElementById("txtAge");
    const inputG1 = document.getElementById("txtGrade1");
    const inputG2 = document.getElementById("txtGrade2");
    // Obtener estudiantes guardados o inicializar arreglo vacío
    let students = JSON.parse(localStorage.getItem("students")) || [];
    // Registrar nuevo estudiante
    function register(){
    if(inputName.value === ""){
    alert("Ingresa el nombre");
    return;
    }
    let newStudent = new Student(inputName.value, inputAge.value, inputG1.value,
    inputG2.value);
    students.push(newStudent);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
    inputName.value = "";
    inputAge.value = "";
    inputG1.value = "";
    inputG2.value = "";
    }
    // Mostrar estudiantes en pantalla
    function displayStudents(){
    const list = document.getElementById("list");
    list.innerHTML = "";
    students.forEach((student, index) => {
    let studentElement = `
    <div>
    <p>${student.name} - ${student.age} años</p>
    
    <button class="btn btn-warning" onclick="deleteStudent(${index})">Eliminar</
    button>
    </div>
    `;
    list.innerHTML += studentElement;
    });
    }
    // Eliminar un estudiante
    function deleteStudent(index){
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
    }
    // Borrar todos los datos del ls
    function clearStorage(){
    localStorage.removeItem("students");
    students = [];
    displayStudents();
    }
    // Mostrar estudiantes
    document.addEventListener("DOMContentLoaded", displayStudents);