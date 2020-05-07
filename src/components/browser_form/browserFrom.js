import template from "./browserForm.html";
import { optionsCreation } from "../../services/optionsCreation/optionsCreation";
import { convertMonth } from "../../services/convertMonth/convertMonth";
import { monthToNum } from "../../services/monthToNum/monthToNum"
import { calculateDays } from "../../services/calcDaysInMonth/calculateDays"


class BrowserForm_model {
    constructor() {
        this.today = {};
        this.getTodayObj();
        this.dateIsValid = true;
    }
    dateValidation(chosenDay, chosenMonth, chosenYear) {
        const currentDay = this.today.day;
        const currentMonthNum = monthToNum(this.today.month);
        const currentYear = this.today.year;
        const chosenMonthNum = monthToNum(chosenMonth);


        if ((chosenDay < currentDay) &&
            (chosenMonthNum <= currentMonthNum) &&
            (chosenYear <= currentYear)) {

            return false
        }
        if (chosenDay == currentDay &&
            chosenMonthNum < currentMonthNum &&
            chosenYear <= currentYear) {

            return false
        }
        if ((chosenYear > currentYear) &&
            (chosenMonthNum >= currentMonthNum) &&
            (chosenDay > currentDay)) {

            return false
        }
        if ((chosenYear > currentYear) &&
            (chosenMonthNum > currentMonthNum)) {

            return false
        }
        return true;
    }
    getTodayObj() {
        const date = new Date()
        this.today.day = date.getDate();
        this.today.month = convertMonth(date.getMonth());
        this.today.year = date.getFullYear();
        this.today.days = calculateDays(this.today);
    }
}


class BrowserForm_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.view.bind_searchClick(this.searchHandler.bind(this));
        this.view.bind_monthChange(this.monthChangeHandler.bind(this));
        this.view.bind_yearChange(this.yearChangeHandler.bind(this))
        this.view.appendMarkup(root_element);
        this.view.fillDataFiled(this.model.today);
    }
    searchHandler(formData) {
        if (this.model.dateValidation(this.view.depDateDay.value, this.view.depDateMonth.value, this.view.depDateYear.value)) {
            window.eventBus.dispatchEvent("search_triggered", formData);
        }
    }
    monthChangeHandler(newDate) {
        this.view.fillDataFiled(newDate, true);
    }
    yearChangeHandler(newDate) {
        // this.view.fillDataFiled(this.model.today, true);
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
        this.personCount = this.markup.getElementById("personCount")
        this.searhButton = this.markup.querySelector("#searchButton")
    }

    bind_searchClick(handler) {
        this.searhButton.addEventListener("click", (e) => {
            e.preventDefault();
            // if (sessionStorage.loggedIn === "true") { //turned off for development
            const formData = {
                departurePort: this.departurePort.value,
                arrivalPort: this.arrivalPort.value,
                depDateDay: this.depDateDay.value,
                depDateMonth: this.depDateMonth.value,
                depDateYear: this.depDateYear.value,
                personCount: this.personCount.value
            }
            handler(formData);
            // } else {
            // alert("You have to be logged in to begin reservation process");
            // }
        })
    }
    bind_monthChange(handler) {
        this.depDateMonth.addEventListener("input", () => {
            const { depDateMonth, depDateDay, depDateYear } = this;
            const newDate = {
                day: depDateDay.value,
                month: depDateMonth.value,
                year: depDateYear.value,
                days: null
            }
            newDate.days = calculateDays(newDate)
            handler(newDate);
        })
    }
    bind_yearChange(handler) {
        this.depDateYear.addEventListener("input", () => {
            const { depDateMonth, depDateDay, depDateYear } = this;
            const newDate = {
                day: depDateDay.value,
                month: depDateMonth.value,
                year: depDateYear.value,
                days: null
            }
            newDate.days = calculateDays(newDate);
            handler(this.depDateYear.value);
        })
    }

    fillDataFiled(dateObj) {
        const selectedOptionIndex = dateObj.day - 1;
        this.depDateDay.innerHTML = "";
        optionsCreation(this.depDateDay, dateObj.days);
        this.depDateMonth.value = dateObj.month;
        this.depDateYear.value = dateObj.year;
        const dayOptions = this.depDateDay.childNodes;
        dayOptions[selectedOptionIndex].selected = true;
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