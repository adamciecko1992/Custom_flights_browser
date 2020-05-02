import template from "./luggageWindow.html";
import { elementCreation } from "../../../services/elementCreation/elementCreation";
import { appendChildren } from "../../../services/appendChildren/appendChildren";



class LuggageWindow_model {
    constructor(flightData) {
        this.flightData = flightData;
        this.persons = flightData.persons;
        this.luggageTypes = ["small", "medium", "big"];
        this.airfareTypes = ["economic", "buisnes", "premium"];
    }
}

class LuggageWindow_controller {
    constructor(model, view, root_element) {
        this.parent = root_element;
        this.model = model;
        this.view = view;
        this.handleQuit = () => {
            this.parent.removeChild(this.view.box);
            this.parent.classList.toggle("hidden");
        }
        this.view.createChoiceBoxes(this.view.airfareOptionsRoot, this.model.persons, this.model.airfareTypes);
        this.view.createChoiceBoxes(this.view.luggageOptionsRoot, this.model.persons, this.model.luggageTypes);
        this.view.bind_closeWindow(this.handleQuit);
        this.view.appendMarkup(root_element);
    }

}

class LuggageWindow_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#luggageWindow");
        this.quitIcon = this.markup.querySelector("#quitIcon");
        this.luggageOptionsRoot = this.markup.querySelector("#personsLuggageRoot");
        this.airfareOptionsRoot = this.markup.querySelector("#personsAirfareRoot")
    }
    appendMarkup(root_element) {
        root_element.appendChild(this.box);
    }
    bind_closeWindow(handler) {
        this.quitIcon.addEventListener("click", () => {
            handler();
        })
    }

    createChoiceBoxes(parent, num, optionsArr) {
        for (let i = 1; i <= num; i++) {
            const optionBox = elementCreation("div");
            const optionSelect = elementCreation("select");
            for (let i = 0; i < optionsArr.length; i++) {
                const option = elementCreation("option", "text");
                option.innerText = optionsArr[i];
                option.value = optionsArr[i];
                optionSelect.appendChild(option);
            }
            const label = elementCreation("span", "text");
            label.innerText = `Person ${i}`;
            appendChildren(optionBox, label, optionSelect);
            parent.appendChild(optionBox);
        }
    }
}

export class LuggageWindow {
    constructor(root_element, flightData) {
        this.controller = new LuggageWindow_controller(new LuggageWindow_model(flightData), new LuggageWindow_view(), root_element)
    }
}