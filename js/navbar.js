const authSection = document.querySelector("#auth");

// Función para actualizar el contador del carrito
function updateCartCounter() {
    const cartCount = document.querySelector(".cart-count");
    if (cartCount) {
        const quantity = localStorage.getItem("quantity") || 0;
        cartCount.textContent = quantity;
    }
}

// Función Cerrar Sesion
function logout() {
    localStorage.removeItem("email");
    window.location.reload();
}

function renderAuth() {
    const userEmail = localStorage.getItem("email");
    if (authSection) {
        authSection.innerHTML = userEmail
            ? `<div class="auth-user">
            <span>Hola, ${userEmail}</span>
            <button class="logout-btn" onclick="logout()">Cerrar Sesión</button>
            </div>`
            : `<a href="./login.html" class="login-btn">Iniciar Sesión</a>`;
    }
}

// Llamar la función al cargar
renderAuth();
updateCartCounter();

// Lista de páginas (puedes agregar más aquí)
const titulos = ["Inicio"];
let menu = [];

for (let titulo of titulos) {
    const href = titulo === "Inicio" ? "./index.html" : `./${titulo.toLowerCase().replaceAll(" ", "_")}.html`;
    menu.push(`<li><a href="${href}">${titulo}</a></li>`);
}

const header = document.querySelector("header nav ul");
header.innerHTML = menu.join("");
