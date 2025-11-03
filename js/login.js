const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emailUser = form.elements[0].value;
    const passwordUser = form.elements[1].value;

    if (emailUser === auth.mailUser && passwordUser === auth.passwordUser) {
        localStorage.setItem("email", emailUser);
        window.location.href = "index.html";
    } else {
        alert("Credenciales incorrectas. Por favor, intenta de nuevo.")
    }
});
