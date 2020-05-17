export function convertMonth(month) {
    let monthWord;
    switch (month) {
        case 0:
            {
                monthWord = 'Jan';
                break;
            }
        case 1:
            {
                monthWord = 'Feb';
                break;
            }
        case 2:
            {
                monthWord = 'Mar';
                break;
            }
        case 3:
            {
                monthWord = 'Apr';
                break;
            }
        case 4:
            {
                monthWord = 'May';
                break;
            }
        case 5:
            {
                monthWord = 'Jun';
                break;
            }
        case 6:
            {
                monthWord = 'Jul';
                break;
            }
        case 7:
            {
                monthWord = 'Aug';
                break;
            }
        case 8:
            {
                monthWord = 'Sep';
                break;
            }
        case 9:
            {
                monthWord = 'Oct';
                break;
            }
        case 10:
            {
                monthWord = 'Nov';
                break;
            }
        case 11:
            {
                monthWord = 'Dec';
                break;
            }

    }
    return monthWord;
}