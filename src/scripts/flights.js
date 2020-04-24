import { elementCreation, appendChildren } from "./utilities"
import { SummaryWindow } from "./summaryWindow";
import { elements } from "./DOM";


export class Flight {
    constructor(flight, day, month, year, dep, arrival, person) {
        this.content = this.createContent(flight, day, month, year, dep, arrival);
        this.personCount = person;
        this.flight = flight;
        this.day = day;
        this.month = month;
        this.year = year;
        this.dep = dep;
        this.arrival = arrival;
    }






    createContent(matchedFlight, depDateDay, depDateMonth, depDateYear, departure, arrival) {
        const flight = elementCreation("div", "flight");

        flight.addEventListener("click", (e) => {

            const { flight, day, month, year, dep, arrival, personCount } = this;
            const summary = new SummaryWindow(flight, day, month, year, dep, arrival, personCount)
            summary.renderToTarget(elements.renderRoot);
        });


        //icon
        const iconWrapper = elementCreation("div", "icon__wrapper");
        const icon = elementCreation("i", "fas", "fa-plane", "text--white");
        appendChildren(iconWrapper, icon);

        //departure date
        const date__Wrapper = elementCreation('div', "cell");
        const date__Text = elementCreation("p", "text", "text--white", "text--center");
        date__Text.textContent = `${depDateDay} - ${depDateMonth} - ${depDateYear}`;
        appendChildren(date__Wrapper, date__Text);

        //Hour of departure
        const hour__wrapper = elementCreation('div', "cell");
        const hour__Text = elementCreation("p", "text", "text--white", "text--center");
        hour__Text.textContent = `${matchedFlight.departureTime}`
        appendChildren(hour__wrapper, hour__Text);

        //departure port
        const departure__wrapper = elementCreation("div", "cell");
        const deperture__text = elementCreation("p", "text", "text--white")
        deperture__text.textContent = `${departure} `;
        const arrow = elementCreation("i", "fas", "fa-arrow-right");
        appendChildren(deperture__text, arrow);
        appendChildren(departure__wrapper, deperture__text);

        //arrival port 
        const arrival__wrapper = elementCreation("div", "cell");
        const arrival__text = elementCreation("p", "text", "text--white", "text--center")
        arrival__text.textContent = `${arrival}`;
        appendChildren(arrival__wrapper, arrival__text);
        const arrHour__wrapper = elementCreation('div', "cell");
        const arrHour__Text = elementCreation("p", "text", "text--white", "text--center");
        arrHour__Text.textContent = `${matchedFlight.arrivalTime}`;
        appendChildren(arrHour__wrapper, arrHour__Text);


        //appending to flight
        appendChildren(flight, iconWrapper, date__Wrapper, hour__wrapper, departure__wrapper, arrival__wrapper, arrHour__wrapper);


        return flight;
    }
}