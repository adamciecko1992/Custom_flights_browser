import template from "./hero.html";


class Hero_model {
    constructor() {
        //maybe some caurosell data someday or img loading ?
    }
}

class Hero_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.view.appendMarkup(root_element);
    }
}

class Hero_view {
    constructor(target) {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#hero");
    }
    appendMarkup(target) {
        target.appendChild(this.markup);
    }
}

export class Hero {
    constructor(root_element) {
        this.controller = new Hero_controller(new Hero_model(), new Hero_view(), root_element)
    }
}