// Verificar checar hash
function checkHash() {
    const hash = window.location.hash;

    if(hash === "#register") {
        console.log("Usuário quer se registrar!");
    } else {
        console.log("Usuário quer logar!");
    }
}

checkHash()