export const elementCreation = (element, ...cssClasses) => {
    const object = document.createElement(`${element}`);

    //looping over classes
    if (cssClasses) {
        for (let cssClass of cssClasses) {
            object.classList.add(`${cssClass}`);
        }
    }
    return object;
};

//Appending multiple children

export const appendChildren = (parent, ...children) => {
    for (let child of children) {
        parent.appendChild(child);
    }
};

//Getting animation time in miliseconds

export const getAnimationTime = (item) => {
    const styles = getComputedStyle(item);
    const computedTime = parseFloat(styles.animationDuration);
    return computedTime * 1000;
};

export const getTransitionTime = (item) => {
    const styles = getComputedStyle(item);
    const computedTransition = parseFloat(styles.transitionDuration);
    console.log(computedTransition);
    return computedTransition * 1000;
};

export const optionsCreation = (parent, arr) => {
    for (let el of arr) {
        let option = elementCreation("option");
        option.value = el;
        option.textContent = el
        parent.appendChild(option);
    }
}



export async function fetchData(url) {
    const response = await fetch(url, {});
    const json = await response.json();
    return json
}
// fetchData("data/user.json").then(data => {
//     dator = data;
// });
// setTimeout(() => {
//     console.log(dator);
// }, 3000)