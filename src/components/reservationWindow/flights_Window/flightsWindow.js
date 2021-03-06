import template from "./flightsWindow.html";
import { fetchData } from "../../../services/fetchData/fetchData";
import { Flight } from "./flight/flight";
import { WindowViewParent } from '../Window_View_ParentClass/WindowViewParent';

class FlightsWindow_model {
    constructor(searchData) {
        this.searchData = searchData;
        this.matchedFlights = [];
        this.getMatchedFilghts(searchData);
    }

    getMatchedFilghts(filterEl) {
        this.matchedFlights = [];
        fetchData(
            "https://api.github.com/repos/adamciecko1992/Custom_flights_browser/contents/docs/data/flights.json"
        ).then((data) => {
            const parsedData = JSON.parse(atob(data.content));
            const allFlights = parsedData.flights;
            const matched = allFlights.filter((flight) => {
                return (
                    flight.destination.toUpperCase() ===
                    filterEl.arrivalPort.toUpperCase()
                );
            });
            for (let flight of matched) {
                this.matchedFlights.push(flight);
            }
            window.eventBus.dispatchEvent("flights_filtered", this.matchedFlights);
        });
    }
}

class FlightsWindow_controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        window.eventBus.addEventListener(
            "flights_filtered",
            function handle_filtered(event) {
                this.view.createFlights(event.detail, this.model.searchData);
                window.eventBus.removeEventListener(
                    "flights_filtered",
                    handle_filtered
                );
            }.bind(this)
        );
    }
}

class FlightsWindow_view extends WindowViewParent {
    constructor(root_element) {
        super();
        this.parent = root_element;
        this.markup = document.createRange().createContextualFragment(template);
        this.box = this.markup.querySelector("#flightsWindow");
        this.flightsBox = this.markup.querySelector("#flightsRoot");
        this.appendMarkup_noAnimation(this.parent);
    }
    createFlights(matchedFlights, searchData) {
        for (let flight of matchedFlights) {
            new Flight(this.flightsBox, flight, searchData);
        }
    }

}

export class FlightsWindow {
    constructor(root_element, data) {
        this.controller = new FlightsWindow_controller(
            new FlightsWindow_model(data),
            new FlightsWindow_view(root_element)
        );
    }
}