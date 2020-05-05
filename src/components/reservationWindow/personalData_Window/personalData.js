import template from "./personalData.html";
import { PersonForm } from "./person_form/personForm";


class PersonalData_model {
    constructor(data) {
        this.flightData = data;
        this.personsSpecificData = {};
    }
    sortPersonsData() {
        for (let i = 1; i <= this.flightData.chosenSeats.length; i++) {
            const currPerson = `Person${i}`
            this.personsSpecificData[currPerson] = {};
            this.personsSpecificData[currPerson].seat = (this.flightData.chosenSeats[i - 1].seat);
            this.personsSpecificData[currPerson].airfare = (this.flightData.airfareSelections[i - 1].airfare);
            this.personsSpecificData[currPerson].luggage = (this.flightData.luggageSelections[i - 1].luggage);
        }
    }
}

class PersonalData_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.model.sortPersonsData(this.model.flightData);
        this.view.createForms(this.model.personsSpecificData);
        this.view.appendMarkup(root_element);
    }
}

class PersonalData_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#formsBox");
    }
    createForms(personsObj) {
        for (let i = 0; i < Object.keys(personsObj).length; i++) {
            new PersonForm(this.box, [Object.keys(personsObj)[i], Object.values(personsObj)[i]]);
        }
    }
    hide() {
        this.box.classList.remove("slideInRight", "delay-1s");
        this.box.classList.add("animated", "slideOutLeft");
        setTimeout(() => {
            this.box.style.display = "none";
        }, 1000)
    }
    appendMarkup(root_element) {
        root_element.appendChild(this.box);
        this.box.classList.add("animated", "slideInRight", "delay-1s");
    }
}

export class PersonalData {
    constructor(root_element, data) {
        this.controller = new PersonalData_controller(new PersonalData_model(data), new PersonalData_view(), root_element)
    }
}