import template from "./navigation.html";


class Nav_model {
    constructor() {
        //maybe some caurosell data someday or img loading ?
    }
}

class Nav_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.view.appendMarkup(root_element);
    }
}

class Nav_view {
    constructor(target) {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#nav");
    }
    appendMarkup(target) {
        target.appendChild(this.markup);
    }
}

export class Nav {
    constructor(root_element) {
        this.controller = new Nav_controller(new Nav_model(), new Nav_view(), root_element)
    }
}