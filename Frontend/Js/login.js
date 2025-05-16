// Seletores
var body = document.querySelector("body");
var container = document.querySelector(".container");
var signInButton = document.querySelector("#signIn");
var signUpButton = document.querySelector("#signUp");

// Efeito ao carregar a página
body.onload = function () {
    body.className = "on-load";
};

// Evento para "Cadastrar" (mostrar formulário de cadastro)
signUpButton.addEventListener('click', () => {
    container.classList.add('sign-up');
    container.classList.remove('sign-in');
});

// Evento para "Entrar" (mostrar formulário de login)
signInButton.addEventListener('click', () => {
    container.classList.add('sign-in');
    container.classList.remove('sign-up');
});
