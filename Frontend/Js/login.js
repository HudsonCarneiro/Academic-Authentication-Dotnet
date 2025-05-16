var body = document.querySelector("body");
var signInButton = document.querySelector("#signIn");
var signUpButton = document.querySelector("#signUp");

body.onload = function(){
    body.className = "on-load";
}

signUpBtn.addEventListener('click', () => {
    container.classList.add('sign-up');
    container.classList.remove('signIn');
});

signInBtn.addEventListener('click', () => {
    container.classList.add('sign-in');
    container.classList.remove('sign-up');
});