import template from "./loginWindow.html";

import { fetchData } from "../../scripts/utilities/utilities";



class LogIn_model {
    constructor() {
        this.data = "";
    }
    async getData() {
        await fetchData("../../data/user.json").then((data) => {
            this.data = data;
        });
    }
    setData(data) {
        this.data = data;
    }
}

class LogIn_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.users = model.data;
        this.logIn = async(name, password) => {
            await this.model.getData();
            const users = this.model.data.users;
            for (let user of users) {
                if (user.user === name && user.password === password) {
                    this.view.hideAndShow();
                }
            }

        }

        this.view.bind_logIn(this.logIn);
        this.view.bind_closeWindow();
        this.view.appendMarkup(root_element);

        window.eventBus.addEventListener("log_in_fired", () => {
            this.view.hideAndShow();
        })
    }
}

class LogIn_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#loginBox");
        this.quitIcon = this.markup.querySelector("#closeLogin");
        this.logInButton = this.markup.querySelector("#logInButton");
        this.signInButton = this.markup.querySelector("#signInButton");
        this.nameInput = this.markup.querySelector("#logInUser");
        this.passwordInput = this.markup.querySelector("#logInPassword");


        this.hideAndShow = () => {
            this.box.classList.toggle("hidden");
        }
    }

    bind_closeWindow() {
        this.quitIcon.addEventListener("click", () => {
            this.hideAndShow();
        })
    }
    bind_logIn(handler) {
        this.logInButton.addEventListener("click", (e) => {
            e.preventDefault();
            handler(this.nameInput.value, this.passwordInput.value);
        })
    }
    appendMarkup(target) {
        target.appendChild(this.markup);
    }
}




export class LogInWindow {
    constructor(root_element) {
        this.controller = new LogIn_controller(new LogIn_model(), new LogIn_view(), root_element);
    }
}