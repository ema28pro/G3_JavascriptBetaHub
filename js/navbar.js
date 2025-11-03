const authSection = document.querySelector("#auth");

authSection.innerHTML = `
  <div>
    ${
      localStorage.getItem("email")
        ? `Hola Sr/a ${localStorage.getItem("email")}`
        : `<a href="./login.html">Iniciar sesión</a>`
    }
  </div>
`;

const titulos = ["Index"];
let menu = [];

for (let titulo of titulos) {
  menu.push(
    `<li><a href="./${titulo.toLowerCase().replaceAll(" ", "_")}.html">${titulo}</a></li>`
  );
}

const header = document.querySelector("header nav ul");
header.innerHTML = menu.join("");
