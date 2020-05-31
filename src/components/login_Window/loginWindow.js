import template from "./loginWindow.html";
import { fetchData } from "../../services/fetchData/fetchData";
import { Popup } from "../popup/popup";

class LogIn_model {
  constructor() {
    this.data = "";
  }
  async getData() {
    await fetchData(
      "https://api.github.com/repos/adamciecko1992/Custom_flights_browser/contents/docs/data/user.json"
    ).then((data) => {
      this.data = JSON.parse(atob(data.content));
    });
  }
  setData(data) {
    this.data = data;
  }
  reloadWindow() {
    window.location.reload();
  }
  startLogOutTimer() {
    const timer = setTimeout(() => {
      sessionStorage.loggedIn = false;
      new Popup("Your session has ended", "", this.reloadWindow);
    }, 180000);
  }
}

class LogIn_controller {
  constructor(model, view, root_element) {
    this.model = model;
    this.view = view;
    this.users = model.data;
    this.logIn = async (name, password) => {
      await this.model.getData();
      const users = this.model.data.users;
      for (let user of users) {
        if (user.user === name && user.password === password) {
          sessionStorage.setItem("loggedIn", true);
          new Popup(`Welcome ${user.user}`);
          this.model.startLogOutTimer();
          this.view.hideAndShow();
        }
      }
    };

    this.view.bind_logIn(this.logIn);
    this.view.bind_closeWindow();
    this.view.appendMarkup(root_element);

    window.eventBus.addEventListener("log_in_fired", () => {
      this.view.hideAndShow();
    });
  }
}

class LogIn_view {
  constructor() {
    this.markup = document.createRange().createContextualFragment(template);
    this.box = this.markup.querySelector("#loginBox");
    this.quitIcon = this.markup.querySelector("#closeLogin");
    this.logInButton = this.markup.querySelector("#logInButton");
    this.signInButton = this.markup.querySelector("#signInButton");
    this.nameInput = this.markup.querySelector("#logInUser");
    this.passwordInput = this.markup.querySelector("#logInPassword");

    this.hideAndShow = () => {
      this.box.classList.toggle("hidden");
      document.querySelector("#wrapper").style.filter = "brightness(20%)";
    };
  }

  bind_closeWindow() {
    this.quitIcon.addEventListener("click", () => {
      this.hideAndShow();
      document.querySelector("#wrapper").style.filter = "brightness(100%)";
    });
  }
  bind_logIn(handler) {
    this.logInButton.addEventListener("click", (e) => {
      e.preventDefault();
      handler(this.nameInput.value, this.passwordInput.value);
    });
  }
  appendMarkup(target) {
    target.appendChild(this.markup);
  }
}

export class LogInWindow {
  constructor(root_element) {
    this.controller = new LogIn_controller(
      new LogIn_model(),
      new LogIn_view(),
      root_element
    );
  }
}
