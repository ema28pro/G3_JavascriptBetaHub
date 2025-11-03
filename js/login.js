const form = document.querySelector("form");

form.addEventListener("submit", () => {
    ev.preventDefault(); 

    const emailUser = form.elements[0]value;
    const passwordUser = form.elements[1]value;

    if (emailUser === auth.email && passwordUser === auth.password){
     localStorage.setItem("email", emailUser);
     localStorage.href = "index.html"; 
    } else {
        alert("dou")
    }





});


