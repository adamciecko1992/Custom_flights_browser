class Flight {
    constructor() {
        this.content = this.createContent();
    }
    createContent() {
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
        const airfare = elementCreation
        appendChildren(flight, iconWrapper, date__Wrapper, hour__wrapper, departure__wrapper, arrival__wrapper, arrHour__wrapper);
    }
}