import { elements } from "../../utilities/DOM"
import { bombardierSvg, boeing_737, boeing_747 } from "../flight/assets/planeSvg"
import { elementCreation, appendChildren, optionsCreation } from "../../utilities/utilities";

export class PlaneWindow {
    constructor(flight, personCount) {
        this.personCount = personCount;
        this.flight = flight;
        this.planeImg = this.getMatchedImg(this.flight.aircraft);

        this.seats = [];
        this.content = this.createContent(this.planeImg);


    }
    getSeatsList(aircraft) {
        const paths = document.getElementsByTagName("path");
        const pathsArr = [...paths];
        let seatsList;
        switch (aircraft) {
            case "Bombardier":
                pathsArr.shift();
                pathsArr.shift();
                pathsArr.splice(60, 8);
                seatsList = pathsArr;
                break
            case "Boeing_737":
                pathsArr.splice(0, 5);
                pathsArr.splice(186, 2);
                seatsList = pathsArr;
                break
            case "Boeing_747":
                pathsArr.splice(0, 5);
                pathsArr.splice(279, 2);
                console.log(pathsArr);

                seatsList = pathsArr;
                break
        }
        return seatsList;
    }
    updateSeats() {
        this.seats = this.getSeatsList(this.flight.aircraft);
        this.addSeatFunctionality(this.seats);
    }
    addSeatFunctionality(seats) {
        let availableSeats = this.personCount
        for (let seat of seats) {

            seat.addEventListener("click", () => {
                if (availableSeats > 0) {
                    seat.classList.add("seat");
                    availableSeats--;
                } else {
                    alert("no more seats");
                }
            })
        }
    }




    getMatchedImg(aircraft) {
        let svgPlane;
        switch (aircraft) {
            case "Bombardier":
                svgPlane = bombardierSvg;

                break;
            case "Boeing_737":
                svgPlane = boeing_737;
                break;
            case "Boeing_747":
                svgPlane = boeing_747;
        }
        return svgPlane
    }
    createContent(imgSvg) {
        const window = elementCreation('div', 'planeWindow');
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

        const widnow__heading = elementCreation("h2", "heading__secondary", "planeWindow__heading")
        widnow__heading.textContent = "Choose your sits";
        ////////////////////////////////////////////////////////////////////////////////// Subwindow
        const subWindow = elementCreation("div", "subWindow");
        ///////////////////////////////////////////////////////////////////////////// First Box
        const firstBox = () => {
            const planeSvg = elementCreation('div', "plane__wrapper");
            planeSvg.innerHTML = imgSvg;
            return planeSvg;
        }
        const secondBox = () => {
            const seatsButton = elementCreation("button", "btn", "u-block", "u-m-t-3");
            seatsButton.textContent = "Confirm";
            return seatsButton;
        }
        appendChildren(subWindow, firstBox(), secondBox());
        appendChildren(window, cross__wrapper, widnow__heading, subWindow);
        return window;
    }


    renderToTarget(target) {
        target.classList.remove("animated", "fadeOut");
        target.innerHTML = "";
        target.appendChild(this.content);
        target.classList.add("animated", "fadeIn");
        this.updateSeats();
    }
}