import template from "./reservationWindow.html";
import { FlightsWindow } from "./flights_Window/flightsWindow"
import { LuggageWindow } from "./luggage_window/luggageWindow";
import { SeatsReservation } from "./seats_reservation_window/seatsReservation";
import { PersonalData } from "./personalData_Window/personalData";
import { SummaryWindow } from "./summary_window/summaryWindow";
import { wrapper } from "../../scripts/app";



class ReservationWindow_model {
    constructor() {
        this.searchData = {};
        eventBus.addEventListener("search_triggered", (event) => {
            this.updateSearchData(event.detail)
            eventBus.dispatchEvent("data_updated", this.searchData)
        })
        this.flightWindow = null;
        this.luggageWindow = null;
        this.seatsReservation = null;
        this.personalData = null;
        this.summaryWindow = null;

    }
    updateSearchData(data) {
        this.searchData = {};
        for (let prop in data) {
            this.searchData[prop] = data[prop];
        }

    }
}

class ReservationWindow_controller {
    constructor(model, view, root_element) {
        this.parent = root_element;
        this.wrapper = document.getElementById("wrapper");
        this.model = model;
        this.view = view;
        this.view.bind_quitClick(this.killReservationProcess.bind(this));
        this.view.bind_backClick(this.previousWindow.bind(this));

        eventBus.addEventListener("data_updated", (event) => {
            this.model.flightWindow = new FlightsWindow(this.view.wizardRoot, event.detail);
            this.view.windowHeading.innerHTML = "Choose your flight";
            this.view.flightsDot.classList.toggle("selected");
            this.view.showWindow();
            this.model.activeWindow = "flights";
            wrapper.style.filter = "brightness(20%)"
        })
        eventBus.addEventListener("flight_chosen", (event) => {
            const flightData = event.detail;
            this.view.windowHeading.innerHTML = "Choose your luggage and airfare";
            this.view.flightsDot.classList.toggle("selected");
            this.view.luggageDot.classList.toggle("selected");
            this.model.flightWindow.controller.view.hide();
            this.model.activeWindow = "luggage";
            this.model.luggageWindow = new LuggageWindow(this.view.wizardRoot, flightData);
        })
        eventBus.addEventListener("reservationBtn_clicked", (event) => {
            const flightData = event.detail;
            this.view.windowHeading.innerHTML = "Choose your seats";
            this.view.seatsDot.classList.toggle("selected");
            this.view.luggageDot.classList.toggle("selected");
            this.model.luggageWindow.controller.view.hide();
            this.model.activeWindow = "seats";
            this.model.seatsReservation = new SeatsReservation(this.view.wizardRoot, flightData);
        })
        eventBus.addEventListener("seats_chosen", (event) => {
            const flightData = event.detail;
            this.view.windowHeading.innerHTML = "Fill personal data";
            this.view.seatsDot.classList.toggle("selected");
            this.view.dataDot.classList.toggle("selected");
            this.model.seatsReservation.controller.view.hide();
            this.model.activeWindow = "personalData";
            this.model.personalData = new PersonalData(this.view.wizardRoot, flightData);
        })
        eventBus.addEventListener("to_summary", (event) => {
            const finalData = event.detail;
            this.view.windowHeading.innerHTML = "Summary";
            this.model.personalData.controller.view.hide();
            this.view.hideDots();
            this.model.activeWindow = "summary";
            this.model.summaryWindow = new SummaryWindow(this.view.wizardRoot, finalData);
        })
        this.view.appendMarkup(root_element);
    }
    killReservationProcess() {
        this.model.searchData = {};
        this.model.flightWindow = {};
        this.model.luggageWindow = {};
        this.model.personalData = {};
        this.view.deactivateDots();
        wrapper.style.filter = "brightness(100%)"
    }
    switchWindow(heading, currentWindow, nextWindow, currentDot, nextDot, activeWindow) {
        const { view, model } = this;
        view.windowHeading.innerHTML = heading;
        if (currentDot && nextDot !== null) {
            currentDot.classList.toggle("selected");
            nextDot.classList.toggle('selected');
        }
        currentWindow.controller.view.hideReversed();
        nextWindow.controller.view.showOnBack();
        model.activeWindow = activeWindow;
        currentWindow = null;
    }
    previousWindow() {
        const { view, model } = this;
        switch (model.activeWindow) {
            case "flights":
                this.killReservationProcess();
                view.showWindow();
                view.wizardRoot.innerHTML = "";
                break;
            case "luggage":
                this.switchWindow("Choose your flight", model.luggageWindow, model.flightWindow, view.flightsDot, view.luggageDot, 'flights')
                break;
            case "seats":
                model.luggageWindow.controller.model.flightData.luggageSelections = [];
                model.luggageWindow.controller.model.flightData.airfareSelections = [];
                this.switchWindow("Choose your luggage", model.seatsReservation, model.luggageWindow, view.seatsDot, view.luggageDot, 'luggage')
                break;
            case "personalData":
                this.switchWindow("Choose your sits", model.personalData, model.seatsReservation, view.seatsDot, view.dataDot, 'seats')
                break;
            case "summary":
                view.showDots();
                this.switchWindow("Fill personal data", model.summaryWindow, model.personalData, null, null, 'seats')
                break;
        }
    }
}

class ReservationWindow_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template).firstChild;
        this.header = this.markup.querySelector("#reservation_header");
        this.flightsDot = this.markup.querySelector("#flightsDot");
        this.luggageDot = this.markup.querySelector("#luggageDot");
        this.seatsDot = this.markup.querySelector("#seatsDot");
        this.dataDot = this.markup.querySelector("#dataDot");
        this.allDots = [this.flightsDot, this.luggageDot, this.seatsDot, this.dataDot];
        this.windowHeading = this.markup.querySelector("#window_heading");
        this.wizardRoot = this.markup.querySelector("#wizardRoot");
        this.quitIcon = this.markup.querySelector("#quitIcon");
        this.backButton = this.markup.querySelector("#backBtn")
    }
    appendMarkup(root_element) {
        root_element.appendChild(this.markup);
    }
    hideDots() {
        for (let dot of this.allDots) {
            dot.classList.add("hidden");
        }
    }
    showDots() {
        for (let dot of this.allDots) {
            dot.classList.remove("hidden");
        }
    }
    bind_quitClick(hanlder) {
        this.quitIcon.addEventListener("click", () => {
            this.wizardRoot.innerHTML = "";
            this.showWindow();
            hanlder();
        })
    }
    deactivateDots() {
        const { dataDot, flightsDot, luggageDot, seatsDot } = this;
        dataDot.classList.remove("selected");
        flightsDot.classList.remove("selected");
        luggageDot.classList.remove("selected");
        seatsDot.classList.remove("selected");
    }
    showWindow() {
        this.markup.classList.toggle("hidden");
    }
    bind_backClick(handler) {
        this.backButton.addEventListener('click', () => {
            handler()
        })

    }
}

export class ReservationWindow {
    constructor(root_element) {
        this.controller = new ReservationWindow_controller(new ReservationWindow_model(), new ReservationWindow_view(), root_element)
    }
}