document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('register');

    registerButton.addEventListener('click', async (event) => {
        event.preventDefault();

        // Captura os valores dos inputs
        const inputs = document.querySelectorAll('.first-content .form input');
        const [emailInput, passwordInput, passowordConfirmedInput] = inputs;

        const email = emailInput.value.trim();
        const senha = passwordInput.value.trim();
        const senhaConfirmada  = passowordConfirmedInput.value.trim();

        // Validação básica
        if (!email || !senha|| !senhaConfirmada) {
            alert('Preencha todos os campos para se cadastrar.');
            return;
        }

        const userData = {
            email,
            senha,
            senhaConfirmada
        };

        try {
            const response = await fetch('https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/registar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result = await response.json();

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = "../index.html";
            } else {
                alert(result.message || 'Erro ao cadastrar. Verifique os dados e tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert('Erro de conexão com o servidor.');
        }
    });
});
