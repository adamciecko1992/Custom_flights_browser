import { fetchData, elementCreation, appendChildren } from "./utilities"
import { elements, searchElements } from "./DOM";
import { Flight } from "./flights";




let allFlights = [];


searchElements.searchButton.addEventListener("click", async(e) => {
    e.preventDefault();
    await fetchData("data/flights.json").then((flights) => {
        for (let flight of flights.flights) {
            allFlights.push(flight);
        }
    });

    const formData = {
        flights: allFlights,
        depDateDay: searchElements.depDateDay.value,
        depDateMonth: searchElements.depDateMonth.value,
        depDateYear: searchElements.depDateYear.value,
        departure: searchElements.departurePort.value,
        arrival: searchElements.arrivalPort.value,
        oneway: searchElements.oneway.checked,
        twoways: searchElements.twoWays.checked,
        person: searchElements.personCount.value,
        retDate: searchElements.retDateDay.value,
    }
    elements.renderRoot.classList.toggle("hidden");
    elements.renderRoot.innerHTML = "";
    elements.wrapper.style.filter = "blur(4px)";
    const flightsWindow = new BrowserWindow(formData);
    flightsWindow.renderToTarget(elements.renderRoot);

})






class BrowserWindow {
    constructor({
        flights,
        depDateDay,
        depDateYear,
        depDateMonth,
        departure,
        arrival,
        person
    }) {
        this.flightsArr = flights;
        this.depDateDay = depDateDay;
        this.depDateMonth = depDateMonth;
        this.depDateYear = depDateYear;
        this.departure = departure.toUpperCase();
        this.arrival = arrival.toUpperCase();
        this.personCount = person;
        this.matchedFlights = this.flightsArr.filter((el) => {
            return el.destination.toUpperCase() === this.arrival;
        })
        this.content = this.createContent();

    }

    createContent() {
        const container = elementCreation('div', 'browserWindow', "box--column", "text-white");
        const cross__wrapper = elementCreation("div", "cross__wrapper")
        const cross = elementCreation("i", "fa-times-circle", "fas")
        cross__wrapper.addEventListener("click", () => {
            elements.renderRoot.classList.toggle("hidden");
            elements.renderRoot.innerHTML = "";
            elements.wrapper.style.filter = "blur(0px)";

        })


        appendChildren(cross__wrapper, cross);
        //title
        const title = elementCreation('h2', "heading__secondary", "browserWindow__heading")
        title.textContent = 'Choose your flight';

        //flights container
        const subcontainer = elementCreation("div", "browserWindow__sub");

        //flights rendering

        for (let matchedFlight of this.matchedFlights) {
            const flightBox = new Flight(matchedFlight, this.depDateDay, this.depDateMonth, this.depDateYear, this.departure, this.arrival, this.personCount);
            appendChildren(subcontainer, flightBox.content);
            console.log(this.personCount);
        }
        //return flights Container
        // const subcontasinerRet = elementCreation("div", "browserWindow__sub")

        //appending 
        appendChildren(container, cross__wrapper, title, subcontainer);
        return container;
    }
    renderToTarget(target) {
        target.innerHTML = "";
        target.appendChild(this.content);
        target.classList.add("animated", "fadeIn");
    };
}