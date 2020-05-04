import template from "./header.html";


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
    }
    logIn() {
        window.eventBus.dispatchEvent("log_in_fired");
    }
}

class Header_view {
    constructor(parent) {
        this.markup = document.createRange().createContextualFragment(template);
        this.btn_logIn = this.markup.querySelector("#btn_LogIn")
        this.btn_logIn = this.markup.querySelector("#btn_LogIn")


    }
    appendMarkup(target) {
        target.appendChild(this.markup);
    }
    bind_logIn(handler) {
        this.btn_logIn.addEventListener("click", () => {
            handler();
        })
    }

}


export class Header {
    constructor(root_element) {
        this.controller = new Header_controller(new Header_model(), new Header_view(), root_element);
    }
}