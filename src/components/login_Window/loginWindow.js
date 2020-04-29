import { elements } from "../../DOM"
import { componentsHTML } from "../../templates"
import { fetchData } from "../../utilities";



class LogIn_Model {
    constructor() {
        this.data = "";
    }
    async getData() {
        await fetchData("/data/user.json").then((data) => {
            this.data = data;
        });
    }
    setData(data) {
        this.data = data;
    }
}

class LogIn_Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.users = model.data;
        this.hide = () => {
            this.view.markup.classList.toggle("hidden");
        }
        this.logIn = async(name, password) => {
            await this.model.getData();
            const users = this.model.data.users;

            for (let user of users) {
                if (user.user === name && user.password === password) {
                    this.hide();
                }
            }

        }
        this.view.bind_closeWindow(this.hide);
        this.view.bind_logIn(this.logIn);
    }
}

class LogIn_View {
    constructor() {
            this.markup = componentsHTML.querySelector("#loginBox");

            this.quitIcon = this.markup.querySelector("#closeLogin");
            this.logInButton = this.markup.querySelector("#logInButton");
            this.signInButton = this.markup.querySelector("#signInButton");
            this.nameInput = this.markup.querySelector("#logInUser");
            this.passwordInput = this.markup.querySelector("#logInPassword");
            this.root = elements.loginBox;

            this.hideAndShow = () => {
                this.markup.classList.toggle("hidden");
            }
            this.root.appendChild(this.markup);
        }
        //methods
    bind_closeWindow(handler) {
        this.quitIcon.addEventListener("click", () => {
            handler();
        })
    }
    bind_logIn(handler) {
        this.logInButton.addEventListener("click", (e) => {
            e.preventDefault();
            handler(this.nameInput.value, this.passwordInput.value);
        })
    }
}



new LogIn_Controller(new LogIn_Model, new LogIn_View);