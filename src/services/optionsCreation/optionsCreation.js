import { elementCreation } from "../elementCreation/elementCreation";

export const optionsCreation = (parent, num) => {
    for (let i = 1; i <= num; i++) {
        let option = elementCreation("option");
        option.value = i;
        option.textContent = i;
        parent.appendChild(option);
    }
}
export const optionsCreation_val = (parent, arr) => {
    for (let i = 1; i <= arr.lenght; i++) {
        let option = elementCreation("option");
        option.value = arr[i];
        option.textContent = arr[i];
        parent.appendChild(option);
        console.log(option);
    }
}