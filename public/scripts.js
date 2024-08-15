const signIn = document.querySelector("#sign-in-btn");
const signUp = document.querySelector("#sign-up-btn");
const container = document.querySelector(".outer-container");

signUp.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
});

signIn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
});