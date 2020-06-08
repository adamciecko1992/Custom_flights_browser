import template from "./navigation.html";

class Nav_model {
    constructor() {}
}

class Nav_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.view.appendMarkup(root_element);
    }
}

class Nav_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#nav");
        this.navToggle = this.markup.querySelector(".nav__toggle");
        this.navStatus = false;
        this.showMenuOnClick();
    }
    showMenuOnClick() {
        this.navToggle.addEventListener("click", () => {
            window.addEventListener("resize", () => {
                if (document.documentElement.clientWidth >= 960) {
                    this.box.classList.remove("animated", "slideInLeft", "slideOutLeft");
                } else {
                    this.box.classList.add("animated", "slideOutLeft");
                }
            });
            if (!this.navStatus) {
                this.box.style.display = "block";
                this.box.classList.remove("slideOutLeft");
                this.box.classList.add("animated", "slideInLeft");
                this.navStatus = true;
                return;
            } else {
                this.box.classList.remove("slideInLeft");
                this.box.classList.add("slideOutLeft");
                this.navStatus = false;
            }
        });
    }
    appendMarkup(target) {
        target.appendChild(this.markup);
    }
}

export class Nav {
    constructor(root_element) {
        this.controller = new Nav_controller(
            new Nav_model(),
            new Nav_view(),
            root_element
        );
    }
}