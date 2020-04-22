export const logIn = () => {
    setTimeout(() => {
        logOut();
    }, 180000);
}

export const logOut = () => {
    alert("twoja sesja wygasła");
    window.location.reload();
}