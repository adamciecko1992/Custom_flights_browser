export function calculateDays(dateObj) {
    let days;
    const months31 = ["Jan", "Mar", "May", "Jul", "Aug", "Oct", "Dec"];
    const months30 = ["Apr", "Jun", "Sep", "Nov"];
    const feb = ((dateObj.year % 4) && (dateObj.year % 100) || !(dateObj.year % 400)) ? 28 : 29;
    if (months31.includes(dateObj.month)) {
        days = 31;
    } else if (months30.includes(dateObj.month)) {
        days = 30;
    } else {
        days = feb;
    }
    return days;
}