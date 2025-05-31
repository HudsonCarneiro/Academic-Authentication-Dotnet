document.addEventListener("DOMContentLoaded", function () {
    const body = document.querySelector("body");
    const signInButton = document.querySelector("#signIn");
    const signUpButton = document.querySelector("#signUp");
    const accessButton = document.querySelector("#access");

    // Classe inicial
    body.className = "on-load";

    // Alternância entre telas
    signInButton?.addEventListener("click", () => {
        body.className = "sign-in";
    });

    signUpButton?.addEventListener("click", () => {
        body.className = "sign-up";
    });

    // Ação de login
    accessButton?.addEventListener("click", async function (e) {
        e.preventDefault();

        const loginForm = accessButton.closest("form");
        if (!loginForm) {
            alert("Formulário de login não encontrado.");
            return;
        }

        const emailInput = loginForm.querySelector('input[placeholder="E-mail"]');
        const passwordInput = loginForm.querySelector('input[placeholder="Senha"]');

        if (!emailInput || !passwordInput) {
            alert("Campos de e-mail ou senha não encontrados.");
            return;
        }

        const email = emailInput.value.trim();
        const senha = passwordInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !senha) {
            alert("Preencha todos os campos.");
            return;
        }
        
        if (!emailRegex.test(email)) {
            alert('E-mail inválido!');
            return;
        }

        accessButton.disabled = true;
        accessButton.textContent = "Carregando...";

        try {
            const response = await fetch("https://umfgcloud-autenticacao-service-7e27ead80532.herokuapp.com/Autenticacao/autenticar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, senha })
            });

            const contentType = response.headers.get("Content-Type");

            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const text = await response.text();
                throw new Error("Resposta não JSON: " + text);
            }

            if (response.ok) {
                const { token, dataExpiracao } = data;
                localStorage.setItem("token", token);
                localStorage.setItem("email", email);
                localStorage.setItem("tokenExpiracao", dataExpiracao);
                window.location.href = "./Pages/dashboard.html";
            } else {
                alert(data.mensagem || "Erro ao autenticar.");
            }

        } catch (error) {
            console.error("Erro na requisição:", error);
            alert("Erro ao conectar com o servidor ou resposta inválida.");
        } finally {
            accessButton.disabled = false;
            accessButton.textContent = "Entrar";
        }
    });
});
