import template from "./reservationWindow.html";
import { FlightsWindow } from "./flights_Window/flightsWindow"
import { LuggageWindow } from "./luggage_window/luggageWindow";
import { SeatsReservation } from "./seats_reservation_window/seatsReservation";
import { PersonalData } from "./personalData_Window/personalData";
import { wrapper } from "../../scripts/app";



class ReservationWindow_model {
    constructor() {
        this.searchData = {};
        eventBus.addEventListener("search_triggered", (event) => {
            this.updateSearchData(event.detail)
            eventBus.dispatchEvent("data_updated", this.searchData)
        })

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

        eventBus.addEventListener("data_updated", (event) => {
            this.model.flightWindow = new FlightsWindow(this.view.wizardRoot, event.detail);
            this.view.windowHeading.innerHTML = "Choose your flight";
            this.view.flightsDot.classList.toggle("selected");
            this.view.showWindow();
            wrapper.style.filter = "brightness(20%)"
        })
        eventBus.addEventListener("flight_chosen", (event) => {
            const flightData = event.detail;
            this.view.windowHeading.innerHTML = "Choose your luggage and airfare";
            this.view.flightsDot.classList.toggle("selected");
            this.view.luggageDot.classList.toggle("selected");
            this.model.flightWindow.controller.view.hide();
            this.model.luggageWindow = new LuggageWindow(this.view.wizardRoot, flightData);
        })
        eventBus.addEventListener("reservationBtn_clicked", (event) => {
            const flightData = event.detail;
            this.view.windowHeading.innerHTML = "Choose your seats";
            this.view.seatsDot.classList.toggle("selected");
            this.view.luggageDot.classList.toggle("selected");
            this.model.luggageWindow.controller.view.hide();
            this.model.seatsReservation = new SeatsReservation(this.view.wizardRoot, flightData);
        })
        eventBus.addEventListener("seats_chosen", (event) => {
            const flightData = event.detail;
            this.view.windowHeading.innerHTML = "Fill personal data";
            this.view.seatsDot.classList.toggle("selected");
            this.view.dataDot.classList.toggle("selected");
            this.model.seatsReservation.controller.view.hide();
            this.model.personalData = new PersonalData(this.view.wizardRoot, flightData);
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
}

class ReservationWindow_view {
    constructor() {
        this.markup = document.createRange().createContextualFragment(template).firstChild;
        this.header = this.markup.querySelector("#reservation_header");
        this.flightsDot = this.markup.querySelector("#flightsDot");
        this.luggageDot = this.markup.querySelector("#luggageDot");
        this.seatsDot = this.markup.querySelector("#seatsDot");
        this.dataDot = this.markup.querySelector("#dataDot");
        this.windowHeading = this.markup.querySelector("#window_heading");
        this.wizardRoot = this.markup.querySelector("#wizardRoot");
        this.quitIcon = this.markup.querySelector("#quitIcon");
    }
    appendMarkup(root_element) {
        root_element.appendChild(this.markup);
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
}

export class ReservationWindow {
    constructor(root_element) {
        this.controller = new ReservationWindow_controller(new ReservationWindow_model(), new ReservationWindow_view(), root_element)
    }
}