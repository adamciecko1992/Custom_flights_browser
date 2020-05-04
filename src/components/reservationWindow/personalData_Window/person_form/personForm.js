import template from "./personForm.html";


class PersonForm_model {
    constructor(personsObj) {
        this.person = personsObj;
        this.personNum = personsObj[0];
        this.personData = personsObj[1];
        this.seat = this.personData.seat.split("_").join(" ");
        this.airfare = this.personData.airfare;
        this.luggage = this.personData.luggage;
    }
}

class PersonForm_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.view.populateMarkupWithData(this.model.personNum, this.model.seat, this.model.airfare, this.model.luggage);
        this.view.appendMarkup(root_element);
    }
}

class PersonForm_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#formBox");
        this.personNumber = this.markup.querySelector("#personNumber");
        this.seatRoot = this.markup.querySelector("#chosenSeatRoot");
        this.luggageRoot = this.markup.querySelector("#luggageRoot");
        this.airfareRoot = this.markup.querySelector("#airfareRoot");
    }
    populateMarkupWithData(number, seat, airfare, luggage) {
        this.personNumber.innerHTML = `${number}`;
        this.seatRoot.innerHTML = `${seat}`;
        this.luggageRoot.innerHTML = `${luggage}`;
        this.airfareRoot.innerHTML = `${airfare}`;
    }
    appendMarkup(target) {
        target.appendChild(this.box);
    }
}

export class PersonForm {
    constructor(root_element, data) {
        this.controller = new PersonForm_controller(new PersonForm_model(data), new PersonForm_view(), root_element)
    }
}