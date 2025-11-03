const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailUser = form.elements[0];
    const passwordUser = form.elements[1];

    if (emailUser.value === auth.emailUser && passwordUser.value === auth.passwordUser) {
        localStorage.setItem("email", emailUser.value);
        window.location.href = "index.html";
    } else {
        // Limpiar los campos del formulario
        emailUser.value = "";
        passwordUser.value = "";
        alert("Credenciales incorrectas. Por favor, intenta de nuevo.")
    }
});
