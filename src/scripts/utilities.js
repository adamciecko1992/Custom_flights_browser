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

export const fetchData = async(url) => {
    const data = await fetch(url);
    const parsed = await data.json();
    return parsed
}