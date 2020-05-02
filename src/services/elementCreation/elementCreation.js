export const elementCreation = (element, ...cssClasses) => {
    const object = document.createElement(`${element}`);
    if (cssClasses) {
        for (let cssClass of cssClasses) {
            object.classList.add(`${cssClass}`);
        }
    }
    return object;
};