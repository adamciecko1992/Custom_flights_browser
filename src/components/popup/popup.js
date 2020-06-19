import template from "./popup.html";

class Popup_model {
    constructor() {}
}

class Popup_controller {
    constructor(model, view, quitFunction) {
        this.model = model;
        this.view = view;
        this.view.hide(quitFunction);
        this.view.appendMarkup(document.body);
    }
}

class Popup_view {
    constructor(header, content = "") {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector(".popup");
        this.header = this.markup.querySelector(".popup__body__header");
        this.content = this.markup.querySelector(".popup__body__content");
        this.quitIcon = this.markup.querySelector(".closePopup");
        this.header.innerHTML = `${header}`;
        this.content.innerHTML = `${content}`;
        this.darken();
    }
    hide(quitFunction = null) {
        this.quitIcon.addEventListener("click", () => {
            if (quitFunction) {
                this.box.style.display = "none";
                quitFunction();
            } else {
                this.box.style.display = "none";
                this.lighten();
            }
        });
    }
    darken() {
        const wrapper = document.querySelector("#wrapper");
        wrapper.style.filter = `brightness(20%)`;
    }
    lighten() {
        const wrapper = document.querySelector("#wrapper");
        wrapper.style.filter = `brightness(100%)`;
    }
    appendMarkup(target) {
        target.appendChild(this.markup);
    }
}

export class Popup {
    constructor(header, content = "", quitFunction = null) {
        this.controller = new Popup_controller(
            new Popup_model(),
            new Popup_view(header, content),
            quitFunction
        );
    }
}