export const appendChildren = (parent, ...children) => {
    for (let child of children) {
        parent.appendChild(child);
    }
};