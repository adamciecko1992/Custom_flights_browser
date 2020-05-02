import EventBus from "./eventBus";
import { Header } from "../components/header/header"
import { Nav } from "../components/navigation/navigation";
import { LogInWindow } from "../components/login_Window/loginWindow"
import { Hero } from "../components/hero/hero";
import { BrowserForm } from "../components/browser_form/browserFrom";
import { ReservationWindow } from "../components/reservationWindow/reservationWindow";



export const eventBus = new EventBus();
window.eventBus = new EventBus();



const layout = `
        <div id="logInBox_root"></div>
        <div id="reservationWindowRoot"></div>
        <div class="wrapper" id="wrapper">
            <div id="headerRoot"></div>
            <div id="navRoot"></div>
            <div id="heroRoot"></div>
            <div id="browserRoot"></div>
        <footer></footer>
    </div>`

class app {
    constructor() {
        this.page = document.createRange().createContextualFragment(layout);
        this.logInWindowRoot = this.page.querySelector("#logInBox_root");
        this.headerRoot = this.page.querySelector("#headerRoot");
        this.navRoot = this.page.querySelector("#navRoot");
        this.heroRoot = this.page.querySelector("#heroRoot");
        this.browserRoot = this.page.querySelector("#browserRoot");
        this.reservationWindowRoot = this.page.querySelector("#reservationWindowRoot");


        this.appRoot = document.getElementById("app");


        new Header(this.headerRoot);
        new Nav(this.navRoot);
        new LogInWindow(this.logInWindowRoot);
        new Hero(this.heroRoot);
        new BrowserForm(this.browserRoot);
        new ReservationWindow(this.reservationWindowRoot);


        this.appRoot.appendChild(this.page);
    }
}

new app();