import template from "./personalData.html";
import { PersonForm } from "./person_form/personForm";



class PersonalData_model {
    constructor(data) {
        this.flightData = data;
        this.personsSpecificData = {};
        this.forms = [];
        this.allFormsValid = true;
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
        this.view.createForms(this.model.personsSpecificData, this.saveFormsToObj.bind(this));
        this.view.bind_confirmClick(this.confirmationHandler.bind(this));
        this.view.appendMarkup(root_element);
    }
    confirmationHandler() {
        // for (let form of this.model.forms) {
        //     form.controller.model.formValidation(form.controller.view.inputs);
        //     if (!form.controller.model.valid) {
        //         this.model.allFormsValid = false;
        //     } else {
        //         this.model.allFormsValid = true;
        //     }
        // }
        if (this.model.allFormsValid) {
            window.eventBus.dispatchEvent("to_summary", [this.model.forms, this.model.flightData]);
        } else {
            alert("fill all inputs properly")
        }
    }
    saveFormsToObj(form) {
        this.model.forms.push(form);
    }
}

class PersonalData_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#formsBox");
        this.button = this.markup.querySelector("#confirmData");
    }
    createForms(personObj, handler) {
        for (let i = 0; i < Object.keys(personObj).length; i++) {
            const personNumber = `${Object.keys(personObj)[i]}`;
            const personReservChoices = Object.values(personObj)[i];
            const form = new PersonForm(this.box, [personNumber, personReservChoices]);
            handler(form);
        }
    }
    bind_confirmClick(handler) {
        this.button.addEventListener("click", () => {
            handler();
        })
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