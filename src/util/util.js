/**
 * @param {number} date_1 - a date in ms since January 1st, 1970
 * @param {number} date_2 - a date in ms since January 1st, 1970
 * Calculates the difference between two dates and returns
 * a string of the highest whole integer difference in seconds,
 * minutes, hours, days, weeks, months, or years.
 */
export const formatDateDiff = (date_1, date_2) => {
    const maxToLabel = [
        [60, 'second'],
        [3600, 'minute'],
        [86400, 'hour'],
        [604800, 'day'],
        [2592000, 'week'],
        [31557600, 'month']
    ];
    const diff = (Math.abs(date_1 - date_2)/1000) + 1; // ms to seconds
    const lessThanMax = maxToLabel.map((entry, i) => {
        return {entry, i}
    }).filter(({entry: [max, label]}) => diff < max);

    let finalNum = diff;
    let finalLabel;
    if (lessThanMax.length) {
        const {entry: [max, label], i} = lessThanMax.shift();
        finalLabel = label;
        if (i > 0) finalNum = diff/maxToLabel[i-1][0];
    } else {
        finalNum = diff/31557600;
        finalLabel = 'year';
    }
    finalNum = Math.floor(finalNum);
    return `${finalNum} ${finalLabel}${finalNum > 1 ? 's' : ''}`
};

function uppercase(str) {
    if (str.length) {
        return str.slice(0,1).toUpperCase() + str.slice(1);
    }
    return str;
}

export function prettifyTitle(str) {
    return str.split("_").map(uppercase).join(" ").trim();
}