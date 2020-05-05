import template from "./browserForm.html";
import { optionsCreation } from "../../services/optionsCreation/optionsCreation";
import { convertMonth } from "../../services/convertMonth/convertMonth";


class BrowserForm_model {
    constructor() {
        this.date = {};
        this.getDateObj();
    }

    calculateDays() {
        let days;
        const months31 = ["Jan", "Mar", "May", "Jul", "Aug", "Oct", "Dec"];
        const months30 = ["Apr", "Jun", "Sep", "Nov"];
        const feb = ((this.date.year % 4) && (this.date.year % 100) || !(this.date.year % 400)) ? 28 : 29;
        if (months31.includes(this.date.month)) {
            days = 31;
        } else if (months30.includes(this.date.month)) {
            days = 30;
        } else {
            days = feb;
        }
        return days;
    }
    getDateObj() {
        const date = new Date()
        this.date.day = date.getDate();
        this.date.month = convertMonth(date.getMonth());
        this.date.year = date.getFullYear();
        this.date.days = this.calculateDays();
    }
}


class BrowserForm_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.view.bind_searchClick(this.searchHandler.bind(this));
        this.view.bind_monthChanged(this.monthChangeHandler.bind(this));
        this.view.appendMarkup(root_element);
        this.view.fillDataFiled(this.model.date);
    }
    searchHandler(formData) {
        window.eventBus.dispatchEvent("search_triggered", formData);
    }
    monthChangeHandler(month) {
        this.model.date.month = month;
        this.model.date.days = this.model.calculateDays();
        this.view.fillDataFiled(this.model.date);
    }


}

class BrowserForm_view {
    constructor(target) {
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#browserBox")
        this.departurePort = this.markup.getElementById("departure")
        this.arrivalPort = this.markup.getElementById("arrival")
        this.depDateDay = this.markup.getElementById("dateDay")
        this.depDateMonth = this.markup.querySelector("#dateMonth")
        this.depDateYear = this.markup.getElementById("dateYear")
        this.retDateDay = this.markup.getElementById("retDateDay")
        this.retDateMonth = this.markup.getElementById("retDateMonth")
        this.retDateYear = this.markup.getElementById("retDateYear")
        this.formSecondary = this.markup.getElementById("formSecondary")
        this.oneway = this.markup.getElementById("oneWay")
        this.twoWays = this.markup.getElementById("twoWays")
        this.personCount = this.markup.getElementById("personCount")
        this.searhButton = this.markup.querySelector("#searchButton")
    }
    bind_monthChanged(handler) {
        this.depDateMonth.addEventListener("input", () => {
            handler(this.depDateMonth.value);
        })
    }
    bind_searchClick(handler) {
        this.searhButton.addEventListener("click", (e) => {
            e.preventDefault();

            // if (sessionStorage.loggedIn === "true") {
            const formData = {
                departurePort: this.departurePort.value,
                arrivalPort: this.arrivalPort.value,
                depDateDay: this.depDateDay.value,
                depDateMonth: this.depDateMonth.value,
                depDateYear: this.depDateYear.value,
                // retDateDay: this.retDateDay.value,
                // retDateMonth: this.retDateMonth.value,
                // retDateYear: this.retDateYear.value,
                // oneway: this.oneway.checked,
                // twoWays: this.twoWays.checked,
                personCount: this.personCount.value
            }
            handler(formData);
            // } else {
            // alert("You have to be logged in to begin reservation process");
            // }
        })
    }
    fillDataFiled(dateObj) {
        this.depDateDay.innerHTML = "";
        this.depDateMonth.value = dateObj.month;
        this.depDateYear.value = dateObj.year;
        optionsCreation(this.depDateDay, dateObj.days);
        const dayOptions = this.depDateDay.childNodes;
        for (let option of dayOptions) {
            if (parseInt(option.textContent) === dateObj.day) {
                option.selected = true;
            }
        }
    }
    appendMarkup(target) {
        target.appendChild(this.markup);
    }
}

export class BrowserForm {
    constructor(root_element) {
        new BrowserForm_controller(new BrowserForm_model, new BrowserForm_view(), root_element);
    }
}