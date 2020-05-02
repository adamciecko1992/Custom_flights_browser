import template from "./reservationWindow.html";
import { FlightsWindow } from "./flights_Window/flightsWindow"
import { LuggageWindow } from "./luggage_window/luggageWindow";


class ReservationWindow_model {
    constructor() {
        this.searchData = {};
        window.eventBus.addEventListener("search_triggered", (event) => {
            this.updateSearchData(event.detail)
            window.eventBus.dispatchEvent("data_changed", this.searchData)
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
    constructor(model, view) {
        this.model = model;
        this.view = view;
        window.eventBus.addEventListener("data_changed", (event) => {
            this.model.flightWindow = new FlightsWindow(this.view.markup, event.detail);
            this.view.showWindow();
        })
        window.eventBus.addEventListener("flight_chosen", (event) => {
            const flightData = event.detail;
            this.model.flightWindow.controller.view.hide();
            this.model.luggageWindow = new LuggageWindow(this.view.markup, flightData);
        })

    }
}

class ReservationWindow_view {
    constructor(root_element) {
        this.markup = document.createRange().createContextualFragment(template).firstChild;
        this.appendMarkup(root_element);
    }
    appendMarkup(root_element) {
        root_element.appendChild(this.markup);
    }
    showWindow() {
        this.markup.classList.toggle("hidden");
    }
}

export class ReservationWindow {
    constructor(root_element) {
        this.controller = new ReservationWindow_controller(new ReservationWindow_model(), new ReservationWindow_view(root_element))
    }
}