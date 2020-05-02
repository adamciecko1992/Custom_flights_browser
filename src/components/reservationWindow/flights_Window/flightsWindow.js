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
        this.quitIcon = this.markup.querySelector("#quitIcon");
        this.closeWindow();
        this.appendMarkup(this.parent);
    }

    closeWindow() {
        this.quitIcon.addEventListener("click", (e) => {
            this.parent.removeChild(this.box);
            this.parent.classList.toggle("hidden");
        })
    }
    createFlights(matchedFlights, searchData) {
        for (let flight of matchedFlights) {
            new Flight(this.flightsBox, flight, searchData);
        }
    }
    hide() {
        this.box.style.display = "none";
    }
    show() {
        this.box.classList.remove("slideOutLeft");
        this.box.classList.add("slideInLeft");
    }
    appendMarkup(target) {
        target.appendChild(this.markup);
    }
}

export class FlightsWindow {
    constructor(root_element, data) {
        this.controller = new FlightsWindow_controller(new FlightsWindow_model(data), new FlightsWindow_view(root_element))
    }
}






//     elements.renderRoot.classList.toggle("hidden");
//     elements.renderRoot.innerHTML = "";
//     elements.wrapper.style.filter = "blur(4px)";
//     const flightsWindow = new BrowserWindow(formData);
//     flightsWindow.renderToTarget(elements.renderRoot);

// })






// class BrowserWindow {

//         this.content = this.createContent();

//     }



//         appendChildren(cross__wrapper, cross);
//         //title
//         const title = elementCreation('h2', "heading__secondary", "browserWindow__heading")
//         title.textContent = 'Choose your flight';

//         //flights container
//         const subcontainer = elementCreation("div", "browserWindow__sub");

//         //flights rendering

//         for (let matchedFlight of this.matchedFlights) {
//             const flightBox = new Flight(matchedFlight, this.depDateDay, this.depDateMonth, this.depDateYear, this.departure, this.arrival, this.personCount);
//             appendChildren(subcontainer, flightBox.content);
//             console.log(this.personCount);
//         }
//         //return flights Container
//         // const subcontasinerRet = elementCreation("div", "browserWindow__sub")

//         //appending 
//         appendChildren(container, cross__wrapper, title, subcontainer);
//         return container;
//     }
//     renderToTarget(target) {
//         target.innerHTML = "";
//         target.appendChild(this.content);
//         target.classList.add("animated", "fadeIn");
//     };
// }