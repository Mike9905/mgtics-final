document.addEventListener("DOMContentLoaded", function() {
    let tickets = JSON.parse(localStorage.getItem("tickets")) || [];
    let historialBody = document.getElementById("historialTickets");

    if (tickets.length === 0) {
        historialBody.innerHTML = `<tr><td colspan="5" class="text-center">No hay tickets registrados</td></tr>`;
        return;
    }

    tickets.forEach(ticket => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td>${ticket.name}</td>
            <td>${ticket.type}</td>
            <td>${ticket.importance}</td>
            <td>${ticket.description}</td>
            <td>${ticket.fileName}</td>
        `;
        historialBody.appendChild(row);
    });
});
