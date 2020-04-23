import { fetchData, elementCreation, appendChildren } from "./utilities"
import { elements, searchElements } from "./DOM";

const allFlights = [];
fetchData("data/flights.json").then((flights) => {
    for (let flight of flights.flights) {
        allFlights.push(flight);
    }
});




searchElements.searchButton.addEventListener("click", (e) => {
    e.preventDefault();
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
    elements.wrapper.style.filter = "blur(4px)";
    const flightsWindow = new BrowserWindow(formData);
    flightsWindow.renderToTarget(elements.renderRoot);
})




// fetchFlights();

class BrowserWindow {
    constructor({
        flights,
        depDateDay,
        depDateYear,
        depDateMonth,
        departure,
        arrival,
        ways,
        retDate,
        person
    }) {
        this.flightsArr = flights;
        this.depDateDay = depDateDay;
        this.depDateMonth = depDateMonth;
        this.depDateYear = depDateYear;
        this.departure = departure.toUpperCase();
        this.arrival = arrival.toUpperCase();
        this.matchedFlights = this.flightsArr.filter((el) => {
            return el.destination.toUpperCase() === this.arrival;
        })
        this.content = this.createContent();


    }
    filterRetrunFlights() {
        //or not
    }
    createContent() {
        const container = elementCreation('div', 'browserWindow', "box--column");
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
        for (let flight of this.matchedFlights) {

            const flight = elementCreation("div", "flight");

            //icon
            const iconWrapper = elementCreation("div", "icon__wrapper");
            const icon = elementCreation("i", "fas", "fa-plane", "text--white");

            appendChildren(iconWrapper, icon);
            //departure date
            const date__Wrapper = elementCreation('div', "cell");
            const date__Text = elementCreation("p", "text", "text--white", "text--center");
            date__Text.textContent = `${this.depDateDay} - ${this.depDateMonth} - ${this.depDateYear}`;
            appendChildren(date__Wrapper, date__Text);
            //Hour of departure
            const hour__wrapper = elementCreation('div', "cell");
            const hour__Text = elementCreation("p", "text", "text--white", "text--center");
            hour__Text.textContent = "12:00";
            appendChildren(hour__wrapper, hour__Text);

            //departure port
            const departure__wrapper = elementCreation("div", "cell");
            const deperture__text = elementCreation("p", "text", "text--white")
            deperture__text.textContent = `${this.departure} `;
            const arrow = elementCreation("i", "fas", "fa-arrow-right");
            appendChildren(deperture__text, arrow);
            appendChildren(departure__wrapper, deperture__text);

            const arrival__wrapper = elementCreation("div", "cell");
            const arrival__text = elementCreation("p", "text", "text--white", "text--center")
            arrival__text.textContent = `${this.arrival}`;
            appendChildren(arrival__wrapper, arrival__text);

            const arrHour__wrapper = elementCreation('div', "cell");
            const arrHour__Text = elementCreation("p", "text", "text--white", "text--center");
            arrHour__Text.textContent = "14:00";
            appendChildren(arrHour__wrapper, arrHour__Text);



            //appending to flight
            const arrival = elementCreation
            appendChildren(flight, iconWrapper, date__Wrapper, hour__wrapper, departure__wrapper, arrival__wrapper, arrHour__wrapper);
            appendChildren(subcontainer, flight);
        }
        //return flights Container
        const subcontainerRet = elementCreation("div", "browserWindow__sub")
        appendChildren(container, cross__wrapper, title, subcontainer, subcontainerRet);
        return container;
    }



    renderToTarget(target) {
        target.appendChild(this.content);
        target.classList.add("animated", "fadeIn");
    };

}