import template from "./flightsWindow.html";
import { fetchData } from "../../../services/fetchData/fetchData"

import { Flight } from "./flight/flight";


class FlightsWindow_model {
    constructor(searchData) {
        this.searchData = searchData;
        this.matchedFlights = [];
        this.getMatchedFilghts(searchData);

    }



    getMatchedFilghts(filterEl) {
        this.matchedFlights = [];
        fetchData("../../data/flights.json").then((data) => {
            const allFlights = data.flights;
            const matched = allFlights.filter((flight) => {
                return flight.destination.toUpperCase() === filterEl.arrivalPort.toUpperCase();
            })
            for (let flight of matched) {
                this.matchedFlights.push(flight);
            }
            window.eventBus.dispatchEvent("flights_filtered", this.matchedFlights);
        })
    }

}

class FlightsWindow_controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        window.eventBus.addEventListener("flights_filtered", function handle_filtered(event) {
            this.view.createFlights(event.detail, this.model.searchData);
            window.eventBus.removeEventListener("flights_filtered", handle_filtered);
        }.bind(this))
    }

}

class FlightsWindow_view {
    constructor(root_element) {
        this.parent = root_element;
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#flightsWindow");
        this.flightsBox = this.markup.querySelector("#flightsRoot");
        this.appendMarkup(this.parent);
    }
    createFlights(matchedFlights, searchData) {
        for (let flight of matchedFlights) {
            new Flight(this.flightsBox, flight, searchData);
        }
    }
    hide() {
        this.box.classList.add("animated", "slideOutLeft");
        setTimeout(() => {
            this.box.style.display = "none";
        }, 1000)
    }
    show() {
        this.box.style.display = "block"
    }
    appendMarkup(target) {
        target.appendChild(this.box);
    }
}

export class FlightsWindow {
    constructor(root_element, data) {
        this.controller = new FlightsWindow_controller(new FlightsWindow_model(data), new FlightsWindow_view(root_element))
    }
}