const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailUser = form.elements[0];
    const passwordUser = form.elements[1];

    // Validar campos vacíos
    if (emailUser.value.trim() === "" || passwordUser.value.trim() === "") {
        Toastify({
            text: "Por favor, completa todos los campos.",
            backgroundColor: "#ff6b35",
            gravity: "top",
            offset: {
                y: 95 // Posición debajo del header-top
            },
        }).showToast();
        return;
    }

    if (emailUser.value === auth.emailUser && passwordUser.value === auth.passwordUser) {
        localStorage.setItem("email", emailUser.value);
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.setItem("quantity", 0);
        window.location.href = "./index.html?auth=correct";
    } else {
        emailUser.value = "";
        passwordUser.value = "";
        Toastify({
            text: "Credenciales incorrectas. Por favor, intenta de nuevo.",
            backgroundColor: "#ff4757",
            gravity: "top",
            offset: {
                y: 95 // Posición debajo del header-top
            },
        }).showToast()
    }
});

if (localStorage.getItem("email")) {
    window.location.href = "./index.html";
}