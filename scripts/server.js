function registerServer() {
    event.preventDefault();

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

    // Guardar en LocalStorage
    tickets.push(newTicket);
    saveAndDisplayTickets();

    let formData = {
        nombre: inputName.value,
        tipo: inputType.value,
        nivel: inputImportance.value,
        descripcion: inputDescription.value
    };

    fetch("http://localhost/mgtics-final/scripts/connect.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(result => {
            console.log("Respuesta del servidor:", result);
            alert(result.message || "Ticket registrado exitosamente.");
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un error al enviar el formulario. " + error.message);
        });

    document.getElementById("registrationForm").reset();
}
