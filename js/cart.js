// VERIFICAR SESIÓN ACTIVA
function checkActiveSession() {
    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
        // Redirigir inmediatamente a la home con código simple
        window.location.href = "./index.html?alert=auth_required";
        return false;
    }
    return true;
}

checkActiveSession()

// CARGA inicial del carrito (array de objetos) desde localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    const totalQty = cart.reduce((s, p) => s + p.quantity, 0);
    localStorage.setItem('quantity', totalQty);
    updateCartCounter()
    renderCart();
}

// RENDER
function renderCart() {
    const container = document.querySelector('#cartContainer');
    const totalEl = document.querySelector('#total');
    const itemCountEl = document.querySelector('#itemCount');

    if (!container || !totalEl || !itemCountEl) {
        console.error("Faltan elementos en el HTML");
        return;
    }

    if (!cart || cart.length === 0) {
        container.innerHTML = '<p>El carrito está vacío</p>';
        totalEl.textContent = (0).toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
        itemCountEl.textContent = '0';
        return;
    }

    container.innerHTML = ''; // limpiar

    cart.forEach((item, idx) => {
        const id = item.id;
        const name = item.name;
        const price = Number(item.price);
        const quantity = Number(item.quantity);
        const stock = Number(item.stock);
        const image = item.url ?? 'https://placehold.co/100x100';

        const card = document.createElement('article');
        card.className = 'cart-item';
        card.innerHTML = `
        <img src="${image}" alt="${name}" width="100" />
        <div class="cart-info">
            <h3>${name}</h3>
            <p>Precio unitario: ${price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
            <p>Total: ${(price * quantity).toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
            <div class="cart-controls">
                <button onclick="decreaseItem(${idx})">
                    <span class="material-symbols-outlined">remove</span>
                </button>
                <span class="qty">${quantity}</span>
                <button onclick="increaseItem(${idx})">
                    <span class="material-symbols-outlined">add</span>
                </button>
                <button onclick="removeItem(${idx})">Eliminar</button>
            </div>
            </div>
        `;
        container.appendChild(card);
    });

    calcTotal();
}

// CALCULAR TOTAL
function calcTotal() {
    const total = cart.reduce((acc, p) => acc + (Number(p.price || 0) * Number(p.quantity || 0)), 0);
    const totalItems = cart.reduce((acc, p) => acc + Number(p.quantity || 0), 0);

    document.querySelector('#total').textContent = total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
    document.querySelector('#itemCount').textContent = totalItems;
}

// FUNCIONES DE MODIFICACIÓN
function increaseItem(index) {
    if (!cart[index]) return;
    const item = cart[index];
    if (item.quantity < item.stock) {
        item.quantity = Number(item.quantity) + 1;
        saveCart();
    } else {
        Toastify({
            backgroundColor: "#ff4757",
            text: `No hay más stock disponible`,
            offset: {
                y: 95 // Posición debajo del header-top
            }
        }).showToast();
    }
}

function decreaseItem(index) {
    if (!cart[index]) return;
    const item = cart[index];
    if (item.quantity > 1) {
        item.quantity = Number(item.quantity) - 1;
        saveCart();
    } else {
        removeItem(index);
    }
}

function removeItem(index) {
    if (!cart[index]) return;

    const item = cart[index];

    Swal.fire({
        title: "¡Alerta!",
        text: `¿Estás seguro que quieres eliminar ${item.name} del carrito?`,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        showCancelButton: true,
    }).then(result => {
        if (result.isConfirmed) {
            cart.splice(index, 1);
            saveCart();

            Toastify({
                backgroundColor: "#28a745",
                text: `${item.name} eliminado del carrito correctamente`,
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        } else {
            Toastify({
                backgroundColor: "#ff4757",
                text: "Operación cancelada",
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        }
    });
}

function clearCart() {
    if (!cart || cart.length === 0) {
        Toastify({
            backgroundColor: "#ff4757",
            text: "El carrito está vacío",
            offset: {
                y: 95 // Posición debajo del header-top
            }
        }).showToast();
        return;
    }

    Swal.fire({
        title: "¡Alerta!",
        text: "¿Estás seguro que quieres vaciar todo el carrito?",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        showCancelButton: true,
    }).then(result => {
        if (result.isConfirmed) {
            cart = [];
            saveCart();

            Toastify({
                backgroundColor: "#28a745",
                text: "Carrito vaciado completamente",
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        } else {
            Toastify({
                backgroundColor: "#ff4757",
                text: "Operación cancelada",
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        }
    });
}

// FUNCIÓN DE COMPRAR
function checkout() {
    if (!cart || cart.length === 0) {
        Toastify({
            backgroundColor: "#ff4757",
            text: "El carrito está vacío",
            offset: {
                y: 95 // Posición debajo del header-top
            }
        }).showToast();
        return;
    }

    const total = cart.reduce((acc, p) => acc + (Number(p.price || 0) * Number(p.quantity || 0)), 0);
    const totalItems = cart.reduce((acc, p) => acc + Number(p.quantity || 0), 0);

    Swal.fire({
        title: "¡Confirmar compra!",
        html: `
            <div style="text-align: left;">
                <p><strong>Productos:</strong> ${totalItems} ${totalItems > 1 ? 'artículos' : 'artículo'}</p>
                <p><strong>Total a pagar:</strong> ${total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
            </div>
        `,
        confirmButtonText: "Confirmar compra",
        cancelButtonText: "Cancelar",
        showCancelButton: true,
    }).then(result => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'Procesando compra...',
                text: 'Por favor espera',
                allowOutsideClick: false,
                allowEscapeKey: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });

            // Preparar datos para enviar a la API
            const userEmail = localStorage.getItem("email");
            const orderData = {
                email: userEmail,
                cantidad: totalItems,
                total: total,
                items: cart,
            };

            // Enviar datos a MockAPI
            fetch('https://6915119d84e8bd126af8878b.mockapi.io/API/HogarYMercado/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
            }).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                } else return response.json();
            }).then(data => {
                // Compra exitosa
                cart = []; // Limpiar carrito
                saveCart();

                // Mostrar éxito con email y número de orden
                Swal.fire({
                    icon: 'success',
                    title: '¡Compra realizada exitosamente!',
                    html: `
                    <div style="text-align: left;">
                        <p><strong>Email:</strong> ${userEmail}</p>
                        <p><strong>Número de orden:</strong> #${data.id}</p>
                        <p><strong>Total pagado:</strong> ${total.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
                    </div>
                `,
                    confirmButtonText: 'Continuar'
                });
            }).catch(error => {
                // Error en la compra
                console.error('Error al procesar la compra:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al procesar la compra',
                    html: `
                    <div style="text-align: center;">
                        <p>Hubo un problema al procesar tu pedido.</p>
                        <p><small>Error: ${error.message}</small></p>
                        <p>Por favor intenta nuevamente.</p>
                    </div>
                `,
                    confirmButtonText: 'Entendido'
                });
            });
        } else {
            Toastify({
                backgroundColor: "#ff4757",
                text: "Compra cancelada",
                offset: {
                    y: 95 // Posición debajo del header-top
                }
            }).showToast();
        }
    });
}

// BOTÓN VACÍAR Y COMPRAR
const clearBtn = document.getElementById("clearCart");
const checkoutBtn = document.getElementById("checkoutBtn");

if (clearBtn) clearBtn.addEventListener("click", clearCart);
if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);

// INICIALIZAR
renderCart();
