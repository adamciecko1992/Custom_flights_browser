import template from "./browserForm.html";
import { fetchData } from "../../scripts/utilities/utilities";

let allFlights = [];


// searchElements.searchButton.addEventListener("click", async(e) => {
//     e.preventDefault();
//     await fetchData("data/flights.json").then((flights) => {
//         for (let flight of flights.flights) {
//             allFlights.push(flight);
//         }
//     });

//     const formData = {
//         flights: allFlights,
//         depDateDay: searchElements.depDateDay.value,
//         depDateMonth: searchElements.depDateMonth.value,
//         depDateYear: searchElements.depDateYear.value,
//         departure: searchElements.departurePort.value,
//         arrival: searchElements.arrivalPort.value,
//         oneway: searchElements.oneway.checked,
//         twoways: searchElements.twoWays.checked,
//         person: searchElements.personCount.value,
//         retDate: searchElements.retDateDay.value,
//     }
//     elements.renderRoot.classList.toggle("hidden");
//     elements.renderRoot.innerHTML = "";
//     elements.wrapper.style.filter = "blur(4px)";
//     const flightsWindow = new BrowserWindow(formData);
//     flightsWindow.renderToTarget(elements.renderRoot);

// })

class BrowserForm_model {
    constructor() {
        this.flights = [];
        this.searchData = {};
        this.getFlights();
        console.log(this.flights);
    }
    async getFlights() {
        await fetchData("../../data/flights.json").then((flights) => {
            for (let flight of flights.flights) {
                this.flights.push(flight);
            }
        });
    }
    updateData(prop, key) {
        this.searchData[prop] = key;
    }
}

class BrowserForm_controller {
    constructor(model, view, root_element) {
        this.model = model;
        this.view = view;
        this.view.bind_searchClick(this.searchHandler);
        this.view.appendMarkup(root_element);

    }
    searchHandler() {

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
        console.log(this.depDateDay);
    }
    appendMarkup(target) {
        target.appendChild(this.markup);
    }
    bind_searchClick(handler) {
        this.searhButton.addEventListener("click", (e) => {
            e.preventDefault();
            const formData = {
                departurePort: this.departurePort.value,
                arrivalPort: this.arrivalPort.value,
                depDateDay: this.depDateDay.value,
                depDateMonth: this.depDateMonth.value,
                depDateYear: this.depDateYear.value,
                retDateDay: this.retDateDay.value,
                retDateMonth: this.retDateMonth.value,
                retDateYear: this.retDateYear.value,
                oneway: this.oneway.checked,
                twoWays: this.twoWays.checked,
                personCount: this.personCount.value
            }
            console.log(formData);
        })
    }
}

export class BrowserForm {
    constructor(root_element) {
        new BrowserForm_controller(new BrowserForm_model, new BrowserForm_view(), root_element);
    }
}