import template from "./personalData.html";


class PersonalData_model {
    constructor(data) {
        this.flightData = data;
    }
}

class PersonalData_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.view.appendMarkup(root_element);
    }
}

class PersonalData_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#formsBox");
    }
    appendMarkup(target) {
        target.appendChild(this.box);
    }
}

export class PersonalData {
    constructor(root_element, data) {
        this.controller = new PersonalData_controller(new PersonalData_model(data), new PersonalData_view(), root_element)
    }
}