document.addEventListener('DOMContentLoaded', () => {
    const registerButton = document.getElementById('register');

    registerButton.addEventListener('click', async (event) => {
        event.preventDefault();

        const inputs = document.querySelectorAll('.first-content .form input');
        const [emailInput, passwordInput, passwordConfirmedInput] = inputs;

        const email = emailInput.value.trim();
        const senha = passwordInput.value.trim();
        const senhaConfirmada = passwordConfirmedInput.value.trim();

        if (!email || !senha || !senhaConfirmada) {
            alert('Todos os campos são obrigatórios!');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('E-mail inválido!');
            return;
        }

        if (senha.length < 6 || senha.length > 50) {
            alert('A senha deve ter entre 6 e 50 caracteres.');
            return;
        }

        if (senha !== senhaConfirmada) {
            alert('As senhas não coincidem!');
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

            const isJson = response.headers.get("content-type")?.includes("application/json");
            const result = isJson ? await response.json() : null;

            if (response.ok) {
                alert('Cadastro realizado com sucesso!');
                window.location.href = "../index.html";
            } else {
    
                alert(result?.message || 'Erro ao cadastrar. Verifique os dados e tente novamente.');
            }

        } catch (error) {
            console.error('Erro ao cadastrar usuário:', error);
            alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
        }
    });
});
