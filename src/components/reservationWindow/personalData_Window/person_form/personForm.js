import template from "./personForm.html";

class PersonForm_model {
  constructor(personsObj) {
    this.personNum = personsObj[0];
    this.name = "";
    this.surname = "";
    this.birthDate = "";
    this.adress = "";
    this.idNumber = "";
    this.seat = personsObj[1].seat.split("_").join(" ");
    this.airfare = personsObj[1].airfare;
    this.luggage = personsObj[1].luggage;
    this.valid = null;
  }
  formValidation(elements) {
    for (let input of elements) {
      if (!input.value) {
        this.valid = false;
        return;
      } else if (input.value.match(/\W/)) {
        this.valid = false;
        return;
      } else if (input.value.length < 2) {
        this.valid = false;
        return;
      } else {
        this.valid = true;
      }
    }
  }
}

class PersonForm_controller {
  constructor(model, view, root_element) {
    this.model = model;
    this.view = view;
    this.view.populateMarkupWithData(
      this.model.personNum,
      this.model.seat,
      this.model.airfare,
      this.model.luggage
    );
    this.view.bind_inputToData_onChange(
      this.view.name,
      this.nameChange.bind(this)
    );
    this.view.bind_inputToData_onChange(
      this.view.surname,
      this.surnameChange.bind(this)
    );
    this.view.bind_inputToData_onChange(
      this.view.birthDate,
      this.birthDateChange.bind(this)
    );
    this.view.bind_inputToData_onChange(
      this.view.adress,
      this.adressChange.bind(this)
    );
    this.view.bind_inputToData_onChange(
      this.view.idNumber,
      this.idChange.bind(this)
    );
    this.view.appendMarkup(root_element);
  }
  nameChange(newValue) {
    this.model.name = newValue;
  }
  surnameChange(newValue) {
    this.model.surname = newValue;
  }
  birthDateChange(newValue) {
    this.model.birthDate = newValue;
  }
  adressChange(newValue) {
    this.model.adress = newValue;
  }
  idChange(newValue) {
    this.model.idNumber = newValue;
  }
}

class PersonForm_view {
  constructor() {
    this.markup = document.createRange().createContextualFragment(template);
    this.box = this.markup.querySelector("#formBox");
    this.inputs = this.markup.querySelectorAll("input");
    this.name = this.inputs[0];
    this.surname = this.inputs[1];
    this.birthDate = this.inputs[2];
    this.adress = this.inputs[3];
    this.idNumber = this.inputs[4];
    this.personNumber = this.markup.querySelector("#personNumber");
    this.seatRoot = this.markup.querySelector("#chosenSeatRoot");
    this.luggageRoot = this.markup.querySelector("#luggageRoot");
    this.airfareRoot = this.markup.querySelector("#airfareRoot");
  }
  bind_inputToData_onChange(entry, handler) {
    entry.addEventListener("input", () => {
      handler(entry.value);
    });
  }
  populateMarkupWithData(number, seat, airfare, luggage) {
    this.personNumber.innerHTML = `${number}`;
    this.seatRoot.innerHTML = `${seat}`;
    this.luggageRoot.innerHTML = `${luggage}`;
    this.airfareRoot.innerHTML = `${airfare}`;
  }
  appendMarkup(target) {
    target.appendChild(this.box);
  }
}

export class PersonForm {
  constructor(root_element, data) {
    this.controller = new PersonForm_controller(
      new PersonForm_model(data),
      new PersonForm_view(),
      root_element
    );
  }
}
