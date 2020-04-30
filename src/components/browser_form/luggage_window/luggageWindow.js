import { elements } from "../../utilities/DOM"
import { elementCreation, appendChildren, optionsCreation } from "../../utilities/utilities";
import { PlaneWindow } from "../seats_reservation_window/seatsReservation";


export class SummaryWindow {
    constructor(flight, day, month, year, dep, arrival, personCount) {
        this.personCount = personCount;
        this.flight = flight;
        this.day = day;
        this.month = month;
        this.year = year;
        this.dep = dep;
        this.arrival = arrival;
        this.luggageTypes = ["small", "medium", "large"];
        this.price = this.flight.price * personCount;
        this.airFares = ['economic', 'buisnes', 'premium'];
        this.content = this.createContent();

    }
    createContent() {
        const window = elementCreation('div', 'summaryWindow');
        //exit icon
        const cross__wrapper = elementCreation("div", "cross__wrapper")
        const cross = elementCreation("i", "fa-times-circle", "fas")
        cross__wrapper.addEventListener("click", () => {
            elements.renderRoot.removeChild(this.content);
            elements.renderRoot.classList.toggle("hidden");
            elements.wrapper.style.filter = "blur(0px)";
        })
        appendChildren(cross__wrapper, cross);
        //heading

        const widnow__heading = elementCreation("h2", "heading__secondary", "summaryWindow__heading")
        widnow__heading.textContent = "Luggage and airfare";
        ////////////////////////////////////////////////////////////////////////////////// Subwindow
        const subWindow = elementCreation("div", "subWindow");
        ///////////////////////////////////////////////////////////////////////////// First Box
        const firstBox = () => {
            const firstBox = elementCreation("div", "subWindow__box");

            const firstBox__heading = elementCreation("h2", "heading__secondary");
            firstBox__heading.textContent = `Luggage`;

            const luggage__label = elementCreation("p", "text", "u-m-t-3")
            luggage__label.textContent = "Choose your luggage type";
            const chooseLuggage = elementCreation("div", "u-m-t-3");

            //luggage options creation
            for (let i = 1; i <= this.personCount; i++) {
                const luggagePerPerson = elementCreation("div");
                const personNum = elementCreation("span", "text")
                personNum.textContent = `Person ${i}`;
                const luggageOptions = elementCreation("select");
                optionsCreation(luggageOptions, this.luggageTypes);
                appendChildren(luggagePerPerson, personNum, luggageOptions);
                appendChildren(chooseLuggage, luggagePerPerson);
            }
            appendChildren(firstBox, firstBox__heading, luggage__label, chooseLuggage)
            return firstBox;
        }

        ///////////////////////////////////////////////////////////////////////////// Second Box

        const secondBox = () => {
            const secondBox = elementCreation("div", "subWindow__box");

            const secondBox__heading = elementCreation("h2", "heading__secondary");
            secondBox__heading.textContent = `Airfare`;

            const airfare__label = elementCreation("p", "text", "u-m-t-3")
            airfare__label.textContent = "Choose your airfare";
            const chooseAirfare = elementCreation("div", "u-m-t-3");

            //Airfare options creation
            for (let i = 1; i <= this.personCount; i++) {
                const airfarePerPerson = elementCreation("div");
                const personNum = elementCreation("span", "text")
                personNum.textContent = `Person ${i}`;
                const airfareOptions = elementCreation("select");
                optionsCreation(airfareOptions, this.airFares);
                appendChildren(airfarePerPerson, personNum, airfareOptions);
                appendChildren(chooseAirfare, airfarePerPerson);
            }
            appendChildren(secondBox, secondBox__heading, airfare__label, chooseAirfare)

            return secondBox;
        }


        ///////////////////////////////////////////////////////////////////////////// Third Box

        const thirdBox = () => {
            const thirdBox = elementCreation("div", "subWindow__box");

            const thirdBox__heading = elementCreation("h2", "heading__secondary");
            thirdBox__heading.textContent = `Seats reservation`;
            const personInfo = elementCreation("button", "btn", "u-block", "u-m-t-3");
            personInfo.textContent = "Fill out your data";
            personInfo.addEventListener("click", () => {
                console.log("clicks");
            })
            const seatsButton = elementCreation("button", "btn", "u-block", "u-m-t-3");
            seatsButton.textContent = "Choose your sits";
            seatsButton.addEventListener("click", () => {
                const planeWindow = new PlaneWindow(this.flight, this.personCount);
                planeWindow.renderToTarget(elements.renderRoot);
            })


            appendChildren(thirdBox, thirdBox__heading, personInfo, seatsButton);
            return thirdBox;
        }



        appendChildren(subWindow, firstBox(), secondBox(), thirdBox());
        appendChildren(window, cross__wrapper, widnow__heading, subWindow);
        return window;
    }


    renderToTarget(target) {
        target.classList.remove("animated", "fadeOut");
        target.innerHTML = "";
        target.appendChild(this.content);
        target.classList.add("animated", "fadeIn");

    }
}