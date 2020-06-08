export class WindowViewParent {
    hide() {
        this.box.classList.remove("slideInRight", "delay-1s");
        this.box.classList.add("animated", "slideOutLeft");
        setTimeout(() => {
            this.box.style.display = "none";
        }, 1000);
    }
    hideReversed() {
        this.box.classList.remove("slideInRight", "delay-1s");
        this.box.classList.add("animated", "slideOutRight");
        setTimeout(() => {
            this.box.style.display = "none";
        }, 1000);
    }
    appendMarkup_noAnimation(root_element) {
        root_element.appendChild(this.box);
    }
    show() {
        this.box.style.display = "block";
    }
    showOnBack() {
        setTimeout(() => {
            this.box.classList.remove('slideOutLeft');
            this.box.classList.add('slideInLeft');
            this.box.style.display = "block";
        }, 1000);

    }
    appendMarkup(root_element) {
        root_element.appendChild(this.box);
        this.box.classList.add("animated", "slideInRight", "delay-1s");
    }
}