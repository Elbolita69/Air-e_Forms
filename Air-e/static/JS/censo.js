document.addEventListener("DOMContentLoaded", function () {
    const cantidadPostes = document.getElementById("cantidadPostes");
    const postesContainer = document.getElementById("postesContainer");
    const censoForm = document.getElementById("censoForm");
    const modalConfirm = new bootstrap.Modal(document.getElementById("confirmModal"));
    const modalError = new bootstrap.Modal(document.getElementById("errorModal"));
    const errorMessage = document.getElementById("errorMessage");

    // Generar formularios dinámicos según la cantidad de PRST seleccionada
    cantidadPostes.addEventListener("change", function () {
        generarFormularios(parseInt(cantidadPostes.value));
    });

    function generarFormularios(cantidad) {
        postesContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos formularios
        if (cantidad === 0) return; // Si la cantidad es 0, no generar formularios

        for (let i = 1; i <= cantidad; i++) {
            const formPoste = document.createElement("div");
            formPoste.classList.add("postesContainer", "mb-4", "p-3", "border", "rounded");
            formPoste.innerHTML = `
                <h4>Cable Operador N°${i}</h4>
                <label>Altura:</label>
                <input type="number" class="form-control mb-2" placeholder="Altura" required>
                <label>Cables:</label>
                <input type="number" class="form-control mb-2" placeholder="Cables" required>
                <label>Caja de empalme:</label>
                <input type="number" class="form-control mb-2" placeholder="Caja de empalme" required>
                <label>Reserva:</label>
                <input type="number" class="form-control mb-2" placeholder="Reserva" required>
                <label>NAP:</label>
                <input type="number" class="form-control mb-2" placeholder="NAP" required>
                <label>SPT:</label>
                <input type="number" class="form-control mb-2" placeholder="SPT" required>
                <label>Bajante:</label>
                <input type="number" class="form-control mb-2" placeholder="Bajante" required>
            `;
            postesContainer.appendChild(formPoste);
        }
    }

    // Validar archivos
    function validarArchivo(file) {
        const formatosPermitidos = ["image/png", "image/jpeg", "image/jpg"];
        return formatosPermitidos.includes(file.type);
    }

    // Manejar el envío del formulario
    censoForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita la recarga de la página

        // Validar campos obligatorios
        const selects = censoForm.querySelectorAll("select[required]");
        let isValid = true;
        selects.forEach(select => {
            if (select.value === "") {
                isValid = false;
                select.classList.add("is-invalid");
            } else {
                select.classList.remove("is-invalid");
            }
        });

        if (!isValid) {
            errorMessage.textContent = "Por favor, completa todos los campos obligatorios.";
            modalError.show();
            return;
        }

        // Validar archivos subidos
        const fotoPlaca = document.getElementById("fotoPlaca").files[0];
        const fotoDetallada = document.getElementById("fotoDetallada").files[0];
        const fotoPanoramica = document.getElementById("fotoPanoramica").files[0];

        if (!validarArchivo(fotoPlaca)) {
            errorMessage.textContent = "El archivo de 'Foto de la Placa' no es válido. Solo se permiten imágenes en formato PNG, JPEG o JPG.";
            modalError.show();
            return;
        }

        if (!validarArchivo(fotoDetallada)) {
            errorMessage.textContent = "El archivo de 'Foto Detallada' no es válido. Solo se permiten imágenes en formato PNG, JPEG o JPG.";
            modalError.show();
            return;
        }

        if (!validarArchivo(fotoPanoramica)) {
            errorMessage.textContent = "El archivo de 'Foto Panorámica' no es válido. Solo se permiten imágenes en formato PNG, JPEG o JPG.";
            modalError.show();
            return;
        }

        // Mostrar el modal de confirmación
        let fechaSeleccionada = document.getElementById("fecha").value;
        let fechaHoraExacta = new Date().toLocaleString("es-ES", {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        });
        document.getElementById("fechaSeleccionada").textContent = fechaSeleccionada;
        document.getElementById("fechaHoraExacta").textContent = fechaHoraExacta;
        modalConfirm.show();

        // Después de cerrar el modal, limpiar el formulario y los campos dinámicos
        document.getElementById("confirmModal").addEventListener("hidden.bs.modal", function () {
            censoForm.reset(); // Restablecer los campos principales
            postesContainer.innerHTML = ""; // Limpiar los formularios dinámicos
        });
    });
});
