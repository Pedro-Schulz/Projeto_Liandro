// 1. Definições de Configuração
const SCHEMA = {
    '#login': ['email', 'password'],
    '#register': ['username', 'email', 'password']
};

// 2. Gerenciador de Rotas (Visual)
function handleRoute() {
    const hash = window.location.hash || "#login";
    const loginDiv = document.getElementById("login");
    const registerDiv = document.getElementById("register");

    // Dica: Se tiver muitos elementos, você pode usar querySelectorAll('.view') 
    // e dar loop escondendo todos, depois mostrar só o atual.
    if (hash === "#register") {
        loginDiv.classList.add('hidden');
        registerDiv.classList.remove('hidden');
    } else {
        loginDiv.classList.remove('hidden');
        registerDiv.classList.add('hidden');
    }
}

// 3. Processamento do Formulário
function handleFormSubmit(event) {
    event.preventDefault(); // Bloqueia o recarregamento imediatamente

    const currentHash = window.location.hash || "#login";
    const allowedFields = SCHEMA[currentHash];
    
    // Se o hash não estiver no SCHEMA (ex: o user digitou algo errado na URL)
    if (!allowedFields) return;

    const formData = new FormData(event.currentTarget);
    const filteredData = {};

    allowedFields.forEach(field => {
        if (formData.has(field)) {
            filteredData[field] = formData.get(field);
        }
    });

    console.log(`Enviando dados de ${currentHash}:`, filteredData);
    
    // Remove o # da hash para usar como endpoint
    let endpoint = currentHash.slice(1);
    
    // Aqui entraria sua chamada de API (fetch)
    realizePost(endpoint, filteredData)
}

// 4. Inicialização dos Eventos
window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
    handleRoute();
    
    // Seleciona e anexa o evento de submit
    const forms = document.querySelectorAll(".auth-form");
    forms.forEach(form => form.addEventListener('submit', handleFormSubmit));
});

async function realizePost(endpoint, dados) {
    try {
        // O fetch envia a requisição e retorna uma "Promise"
        const response = await fetch(`http://localhost:8800/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Avisa o servidor que estamos enviando JSON
            },
            body: JSON.stringify(dados) // Transforma o objeto JS em texto (string)
        });

        // Verifica se o servidor respondeu com erro (ex: 400, 404, 500)
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro na requisição');
        }

        // Se deu tudo certo, lê o JSON de resposta
        const resultado = await response.json();
        console.log(resultado.status);
    } catch (error) {
        // Captura erros de rede ou o erro lançado acima
        console.error("Erro no processo:", error.message);
    }
}
