import template from "./personalData.html";
import { PersonForm } from "./person_form/personForm";
import { Popup } from "../../popup/popup";
import { WindowViewParent } from '../Window_View_ParentClass/WindowViewParent';

class PersonalData_model {
    constructor(data) {
        this.flightData = data;
        this.personsSpecificData = {};
        this.forms = [];
        this.allFormsValid = true;
    }
    sortPersonsData() {
        for (let i = 1; i <= this.flightData.chosenSeats.length; i++) {
            const currPerson = `Person${i}`;
            this.personsSpecificData[currPerson] = {};
            this.personsSpecificData[currPerson].seat = this.flightData.chosenSeats[
                i - 1
            ].seat;
            this.personsSpecificData[
                currPerson
            ].airfare = this.flightData.airfareSelections[i - 1].airfare;
            this.personsSpecificData[
                currPerson
            ].luggage = this.flightData.luggageSelections[i - 1].luggage;
        }
    }
}

class PersonalData_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.model.sortPersonsData(this.model.flightData);
        this.view.createForms(
            this.model.personsSpecificData,
            this.saveFormsToObj.bind(this)
        );
        this.view.bind_confirmClick(this.confirmationHandler.bind(this));
        this.view.appendMarkup(root_element);
    }
    confirmationHandler() {
        for (let form of this.model.forms) {
            form.controller.model.formValidation(form.controller.view.inputs);
            if (!form.controller.model.valid) {
                this.model.allFormsValid = false;
            } else {
                this.model.allFormsValid = true;
            }
        }
        if (this.model.allFormsValid) {
            window.eventBus.dispatchEvent("to_summary", [
                this.model.forms,
                this.model.flightData,
            ]);
        } else {
            new Popup(
                "Invalid input",
                "No empty inputs are allowed, also no symbols are accepted in input fields, only letters and numbers"
            );
            return;
        }
    }
    saveFormsToObj(form) {
        this.model.forms.push(form);
    }
}

class PersonalData_view extends WindowViewParent {
    constructor() {
        super();
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#formsBox");
        this.button = this.markup.querySelector("#confirmData");
    }
    createForms(personObj, handler) {
        for (let i = 0; i < Object.keys(personObj).length; i++) {
            const personNumber = `${Object.keys(personObj)[i]}`;
            const personReservChoices = Object.values(personObj)[i];
            const form = new PersonForm(this.box, [
                personNumber,
                personReservChoices,
            ]);
            handler(form);
        }
    }
    bind_confirmClick(handler) {
        this.button.addEventListener("click", () => {
            handler();
        });
    }

}

export class PersonalData {
    constructor(root_element, data) {
        this.controller = new PersonalData_controller(
            new PersonalData_model(data),
            new PersonalData_view(),
            root_element
        );
    }
}