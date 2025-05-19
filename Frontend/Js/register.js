document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('register');

    registerButton.addEventListener('click', async (event) => {
        event.preventDefault();

        // Captura os valores dos inputs
        const inputs = document.querySelectorAll('.first-content .form input');
        const [nameInput, emailInput, passwordInput] = inputs;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Validação básica
        if (!name || !email || !password) {
            alert('Preencha todos os campos para se cadastrar.');
            return;
        }

        const userData = {
            name,
            email,
            password
        };

        try {
            const response = await fetch('https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/autenticar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                // Redireciona ou limpa o formulário
            } else {
                alert(result.message || 'Erro ao cadastrar. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro de conexão com o servidor.');
        }
    });
});
