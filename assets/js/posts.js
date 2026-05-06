function checkHash() {
    const hash = window.location.hash;

    if(hash) {
        console.log(`Abrir post ${hash}`);
    } else {
        console.log("Mostrar posts!");
    }
}

checkHash();