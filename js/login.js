const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailUser = form.elements[0];
    const passwordUser = form.elements[1];

    if (emailUser.value === auth.emailUser && passwordUser.value === auth.passwordUser) {
        localStorage.setItem("email", emailUser.value);
        localStorage.setItem("cart", JSON.stringify([]));
        localStorage.setItem("quantity", 0);
        window.location.href = "./index.html";
    } else {
        emailUser.value = "";
        passwordUser.value = "";
        alert("Credenciales incorrectas. Por favor, intenta de nuevo.");
    }
});

if (localStorage.getItem("email")) {
    window.location.href = "./index.html";
}