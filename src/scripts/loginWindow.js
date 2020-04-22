import { elements } from "./DOM";
import { logIn, logOut } from "./logIn_Out";
import { fetchData } from "./utilities";

elements.signIn.addEventListener("click", () => {
    elements.loginBox.classList.toggle("hidden");
    elements.wrapper.style.filter = "blur(4px)";
})


elements.closeLogin.addEventListener("click", (e) => {
    elements.loginBox.classList.add("hidden");
    elements.wrapper.style.filter = "blur(0px)";
    console.log(e);
})

elements.logInButton.addEventListener("click", (e) => {
    e.preventDefault();
    const inputUser = elements.logInUser.value;
    const inputPassword = elements.logInPassword.value;
    const fetched = fetchData("/data/user.json");
    fetched.then(data => {
        for (let user of data.users) {
            if (user.user === inputUser && user.password === inputPassword) {
                elements.loginBox.classList.toggle("hidden");
                elements.wrapper.style.filter = "blur(0px)";
                logIn();
            }
        }
    })
})