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