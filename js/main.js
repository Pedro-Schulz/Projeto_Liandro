const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adiciona a classe quando entra na tela
            entry.target.classList.add('active');
        } else {
            // Opcional: remove a classe para animar de novo ao subir a página
            entry.target.classList.remove('active');
        }
    });
}, { threshold: 0.1 }); // Dispara quando 10% do item estiver visível

// Seleciona todos os itens que você quer animar
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const elements = document.querySelectorAll('.reveal');
elements.forEach(el => observer.observe(el));