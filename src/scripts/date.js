const date = new Date()
const day = date.getDate();
const month = date.getMonth();
const year = date.getFullYear();
const monthWord = monthCalc(month);
export const todayString = `${day} - ${monthWord} - ${year}`;

function monthCalc(month) {
    let day;
    switch (month) {
        case 0:
            {
                day = 'Jan';
                break;
            }
        case 1:
            {
                day = 'Feb';
                break;
            }
        case 2:
            {
                day = 'Mar';
                break;
            }
        case 3:
            {
                day = 'Apr';
                break;
            }
        case 4:
            {
                day = 'May';
                break;
            }
        case 5:
            {
                day = 'Jun';
                break;
            }
        case 6:
            {
                day = 'Jul';
                break;
            }
        case 7:
            {
                day = 'Aug';
                break;
            }
        case 8:
            {
                day = 'Sep';
                break;
            }
        case 9:
            {
                day = 'Oct';
                break;
            }
        case 10:
            {
                day = 'Nov';
                break;
            }
        case 11:
            {
                day = 'Dec';
                break;
            }

    }
    return day;
}