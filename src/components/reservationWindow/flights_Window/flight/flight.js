import template from "./flight.html";




class Flight_model {
    constructor(flightData, searchData) {
        this.date = `${searchData.depDateDay} ${searchData.depDateMonth} ${searchData.depDateYear}`
        this.location = flightData.location
        this.destination = flightData.destination
        this.departureTime = flightData.departureTime
        this.arrivalTime = flightData.arrivalTime
        this.aircraft = flightData.aircraft
        this.flightData = flightData;
        this.flightData.date = this.date;
        this.flightData.persons = searchData.personCount;
    }


}

class Flight_controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.populateElements(this.model.flightData);
        this.flightClickHandler = () => {
            window.eventBus.dispatchEvent("flight_chosen", this.model.flightData);
        }
        this.view.bind_click(this.flightClickHandler);
    }

}

class Flight_view {
    constructor(root_element) {
        this.markup = document.createRange().createContextualFragment(template);
        this.parent = root_element;
        this.box = this.markup.querySelector(".flight");
        this.flightDate = this.markup.querySelector(".flightDate");
        this.departureHour = this.markup.querySelector(".departureHour");
        this.departureTown = this.markup.querySelector(".departureTown");
        this.arrivalTown = this.markup.querySelector(".arrivalTown");
        this.arrivalHour = this.markup.querySelector(".arrivalHour");
        this.appendMarkup(root_element);
        this.populateElements = (flightData) => {
            this.flightDate.innerText = flightData.date;
            this.departureHour.innerText = flightData.departureTime;
            this.departureTown.innerText = flightData.location;
            this.arrivalHour.innerText = flightData.arrivalTime;
            this.arrivalTown.innerText = flightData.destination;
        }

    }
    bind_click(handler) {
        this.box.addEventListener("click", (e) => {
            handler()
        })
    }
    appendMarkup(root_element) {
        root_element.appendChild(this.markup);
    }
}

export class Flight {
    constructor(root_element, flightData, searchData) {
        this.controller = new Flight_controller(new Flight_model(flightData, searchData), new Flight_view(root_element))
    }
}