// VERIFICAR MENSAJES DE REDIRECCIÓN EN LA URL
function checkUrlMessages() {
    const urlParams = new URLSearchParams(window.location.search);
    const alert = urlParams.get('alert');
    const alertMessages = {
        'auth_required': {
            text: "Debes iniciar sesión para acceder al carrito",
            backgroundColor: "#ff4757"
        },
        'auth_correct': {
            text: "Sesión iniciada correctamente",
            backgroundColor: "#28a745"
        },
        'invalid_product': {
            text: "Indice de producto inválido",
            backgroundColor: "#ff4757"
        }
    };

    // Verificar si existe el mensaje, si no usar default de error
    if (alert) {
        const messageConfig = alertMessages[alert] || {
            text: "Error desconocido",
            backgroundColor: "#ff4757"
        };

        Toastify({
            text: messageConfig.text,
            backgroundColor: messageConfig.backgroundColor,
            gravity: "top",
            offset: {
                y: 80 // Posición debajo del header-top
            }
        }).showToast();
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

// Ejecutar verificación al cargar la página
checkUrlMessages();

const main = document.querySelector("main");
const buscador = document.getElementById("buscador");
const listaCategoria = document.getElementById("category");
const barraBusqueda = document.querySelector(".search-container");

// Crear el elemento "Todos" primero
let categoriasCheckboxes = `<li>
    <input type="checkbox" id="categoria-todos" value="Todos" checked onchange="manejarSeleccionTodos(this)">
    <label for="categoria-todos" class="checkbox-btn">Todos</label>
</li>`;

// Concatenar el resto de categorías
categoriasCheckboxes += categorylist
    .map((categoria, id) => {
        return `<li>
            <input type="checkbox" id="categoria-${id}" value="${categoria}" onchange="manejarSeleccionCategoria()">
            <label for="categoria-${id}" class="checkbox-btn">${categoria}</label>
        </li>`;
    }).join("");

listaCategoria.innerHTML = categoriasCheckboxes;

let categoriasSeleccionadas = ["Todos"];
let terminoBusqueda = "";

const loadingSwal = Swal.fire({
    title: 'Cargando productos...',
    text: 'Por favor espera',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    willOpen: () => {
        Swal.showLoading();
    }
});
main.innerHTML = `<h2 class="no-results">Cargando productos 🌀</h2>`;

const cargarProductos = new Promise((resolve) => {
    setTimeout(() => {
        resolve(data);
    }, 3000);
});


cargarProductos.then(productosResueltos => {
    loadingSwal.close(); // Cerrar el SweetAlert de carga
    mostrarCards(productosResueltos);
});
// ---- FIN SPRINT 3 ----


function filtrarMostrar() {
    const productosFiltrados = data.filter(producto => {
        // Si no hay categorías seleccionadas o "Todos" está seleccionado, mostrar todos
        const cumpleCategoria = categoriasSeleccionadas.length === 0 ||
            categoriasSeleccionadas.includes("Todos") ||
            categoriasSeleccionadas.some(categoria =>
                producto.category.includes(categoria)
            );

        const cumpleBusqueda = terminoBusqueda === "" ||
            producto.name.toLowerCase().includes(terminoBusqueda) ||
            producto.short_description.toLowerCase().includes(terminoBusqueda) ||
            producto.long_description.toLowerCase().includes(terminoBusqueda) ||
            producto.category.some(categoria =>
                categoria.toLowerCase().includes(terminoBusqueda)
            );

        return cumpleCategoria && cumpleBusqueda;
    });

    mostrarCards(productosFiltrados);
}

function manejarSeleccionTodos(checkbox) {
    if (checkbox.checked) {
        // Si se selecciona "Todos", deseleccionar todas las demás categorías
        categoriasSeleccionadas = ["Todos"];
        const otrosCheckboxes = document.querySelectorAll('#category input[type="checkbox"]:not([value="Todos"])');
        otrosCheckboxes.forEach(cb => cb.checked = false);
    } else {
        // Si se deselecciona "Todos", removerlo de la lista
        categoriasSeleccionadas = categoriasSeleccionadas.filter(cat => cat !== "Todos");
    }
    filtrarMostrar();
}

function manejarSeleccionCategoria() {
    // Obtener todos los checkboxes marcados (excepto "Todos")
    const checkboxesMarcados = document.querySelectorAll('#category input[type="checkbox"]:checked:not([value="Todos"])');
    const checkboxTodos = document.querySelector('#category input[type="checkbox"][value="Todos"]');

    if (checkboxesMarcados.length > 0) {
        // Si hay categorías específicas seleccionadas, deseleccionar "Todos"
        if (checkboxTodos.checked) {
            checkboxTodos.checked = false;
        }
        categoriasSeleccionadas = Array.from(checkboxesMarcados).map(cb => cb.value);
    } else {
        // Si no hay categorías específicas seleccionadas, las categorías seleccionadas quedan vacías
        categoriasSeleccionadas = [];
    }

    filtrarMostrar();
}

function realizarBusqueda() {
    terminoBusqueda = buscador.value.toLowerCase().trim();
    if (terminoBusqueda !== "") {
        mostrarBoton();
    } else {
        quitarBoton();
    };
    filtrarMostrar(); // Aplicar filtro combinado
}

function mostrarCards(productos) {
    if (productos.length === 0) {
        main.innerHTML = `<h2 class="no-results">Lo sentimos, no encontramos coincidencias</h2>`;
        return;
    };
    const cards = productos.map(producto =>
        `<div class="card">
            <img src="${producto.url}" alt="${producto.name}">
            <h2>${producto.name}</h2>
            <p>${producto.short_description}</p>
            <span>Precio: ${producto.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</span>
            <br>
            <a href="detalles.html?prod=${producto.id}">Ver más</a>
        </div>`
    );
    main.innerHTML = cards.join("");
}

function limpiarBuscador() {
    buscador.value = "";
    terminoBusqueda = "";
    filtrarMostrar(); // Aplicar filtro (mantiene categoría seleccionada)
    quitarBoton();
    buscador.focus();
}

// Función para crear botones dinámicamente
function crearBoton(id, texto, handler) {
    const botonExistente = document.getElementById(id);
    if (!botonExistente) {
        const btn = document.createElement("button");
        btn.id = id;
        btn.innerHTML = texto;
        btn.addEventListener("click", handler);
        barraBusqueda.appendChild(btn);
    }
}

function mostrarBoton() {
    crearBoton("btn-limpiar", "Limpiar", limpiarBuscador);
    // crearBoton("btn-buscar", "Buscar", realizarBusqueda);
}

function quitarBoton() {
    const btnLimpiar = document.getElementById("btn-limpiar");
    const btnBuscar = document.getElementById("btn-buscar")
    if (btnLimpiar) {
        btnLimpiar.removeEventListener("click", limpiarBuscador);
        btnLimpiar.remove();
    }
    // if (btnBuscar) {
    //     btnBuscar.removeEventListener("click", realizarBusqueda);
    //     btnBuscar.remove();
    // }
}

buscador.addEventListener("input", realizarBusqueda); // Es ineficiente para muchos datos
// buscador.addEventListener("input", mostrarBoton)