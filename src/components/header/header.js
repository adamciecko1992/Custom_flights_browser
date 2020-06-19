import template from "./header.html";
import { Popup } from "../popup/popup";


class Header_model {
    constructor() {
        //maybe some languages support
    }
}

class Header_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.view.appendMarkup(root_element)
        this.view.bind_logIn(this.logIn);
        this.view.bind_SignUp(this.signUp)
    }
    logIn() {
        window.eventBus.dispatchEvent("log_in_fired");
    }
    signUp() {
        new Popup('Unable to sign in', 'Due to current problems connected to COVID-19 outbreak signing up new clients is unavailable');
    }
}

class Header_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template);
        this.btn_logIn = this.markup.querySelector("#btn_LogIn")
        this.btn_signUp = this.markup.querySelector("#btn_signUp")
    }
    appendMarkup(target) {
        target.appendChild(this.markup);
    }
    bind_logIn(handler) {
        this.btn_logIn.addEventListener("click", () => {
            handler();
        })
    }
    bind_SignUp(handler) {
        this.btn_signUp.addEventListener("click", () => {
            handler();
        })
    }

}


export class Header {
    constructor(root_element) {
        this.controller = new Header_controller(new Header_model(), new Header_view(), root_element);
    }
}