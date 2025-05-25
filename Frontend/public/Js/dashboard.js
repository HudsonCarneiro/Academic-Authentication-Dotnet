document.addEventListener("DOMContentLoaded", () => {
    const email = localStorage.getItem("email");
    const rawExpiracao = localStorage.getItem("tokenExpiracao");
    const saudacao = document.getElementById("saudacao");

    if (email && rawExpiracao) {
        const expiracao = rawExpiracao.split(".")[0]; // remove milissegundos
        const dataExpiracao = new Date(expiracao);
        saudacao.textContent = `Seja bem-vindo(a), ${email}! Seu token expira em ${dataExpiracao.toLocaleString("pt-BR")}`;
    } else {
        saudacao.textContent = "Informações de login não encontradas.";
    }
});

function logout() {
    localStorage.clear();
    window.location.href = "../index.html";
}

