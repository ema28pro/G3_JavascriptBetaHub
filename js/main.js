const main = document.querySelector("main");
const buscador = document.getElementById("buscador");
const listaCategoria = document.getElementById("category");
const barraBusqueda = document.querySelector(".search-container");

const categoriasBtn = categorylist.map(categoria =>
    `<li><button class="category-btn" onclick="seleccionarCategoria('${categoria}')">${categoria}</button></li>`
);

listaCategoria.innerHTML = categoriasBtn.join("");

let categoriaSeleccionada = "Todos";
let terminoBusqueda = "";

mostrarCards(data); // Mostrar Data apenas se cargue la página

function filtrarMostrar() {
    const productosFiltrados = data.filter(producto => {
        const cumpleCategoria = categoriaSeleccionada === "Todos" ||
            producto.category.includes(categoriaSeleccionada);

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

function seleccionarCategoria(categoria) {
    categoriaSeleccionada = categoria
    filtrarMostrar()
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
            <button onclick="addToCar('${producto.name}')">Carrito</button>
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

function addToCar(productName) {
    Swal.fire({
        title: '¡Alerta!',
        text: `¿Estas seguro que quieres añadir el producto ${productName}?`,
        // icon: 'success',
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCancelButton: true,
        showCloseButtton: true
    }).then(result => {
        if (result.isConfirmed) {
            Toastify({
                text: `${productName} Agregado`
            }).showToast()
        };
    });
};