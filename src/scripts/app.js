import EventBus from "./eventBus";
import { Header } from "../components/header/header"
import { Nav } from "../components/navigation/navigation";
import { LogInWindow } from "../components/login_Window/loginWindow"
import { Hero } from "../components/hero/hero";
import { BrowserForm } from "../components/browser_form/browserFrom";


export const eventBus = new EventBus();
window.eventBus = new EventBus();
window.eventBus.addEventListener("example", (event) => {
        console.log(event)
    })
    // class MessageBus {
    //     constructor() {
    //         this.subscriptions = { name: [] };
    //     }
    //     subscribe(name, callback) {
    //         this.subscriptions = this.subscriptions.name || [];
    //         this.subscriptions.name.push(callback)


//     }
//     publish() {

//     }
// }









// const layout = `
//     <div id="logInBox_root"></div>
//     <div class="box box--window hidden" id="browserWindowRoot"> </div>
//     <div class="wrapper" id="wrapper">
//         <div class="box box--colum box--hero">
//             <div id="headerRoot"></div>
//             <div id="navRoot"></div>
//             <div id="browserRoot"></div>
//         </div>
//         <footer class="container"></footer>
//     </div>`
const layout = `
        <div id="logInBox_root"></div>
        <div class="box box--window hidden" id="browserWindowRoot"> </div>
        <div class="wrapper" id="wrapper">
            <div id="headerRoot"></div>
            <div id="navRoot"></div>
            <div id="heroRoot"></div>
            <div id="browserRoot"></div>

        <footer class="container"></footer>
    </div>`

class app {
    constructor() {
        this.page = document.createRange().createContextualFragment(layout);
        this.logInWindowRoot = this.page.querySelector("#logInBox_root");
        this.headerRoot = this.page.querySelector("#headerRoot");
        this.navRoot = this.page.querySelector("#navRoot");
        this.heroRoot = this.page.querySelector("#heroRoot");
        this.browserRoot = this.page.querySelector("#browserRoot");

        this.appRoot = document.getElementById("app");


        new Header(this.headerRoot);
        new Nav(this.navRoot);
        new LogInWindow(this.logInWindowRoot);
        new Hero(this.heroRoot);
        new BrowserForm(this.browserRoot);
        this.appRoot.appendChild(this.page);
    }
}

new app();