export const dateUtils = {
    formatDate,
    toPadZeroString,
    isSameDay,
    sortByDateTime,
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();
    const month = toPadZeroString(date.getMonth() + 1);
    const dateOfMonth = toPadZeroString(date.getDate());

    if (isSameDay(date, today)) {
        const hours = toPadZeroString(date.getHours());
        const minutes = toPadZeroString(date.getMinutes());
        return `${hours}:${minutes}`
    } else if (date.getFullYear() === today.getFullYear()) {
        return `${dateOfMonth}/${month}`
    } else {
        return `${dateOfMonth}/${month}/${date.getFullYear()}`
    }
}

function toPadZeroString(n) {
    return n >= 10 ? `${n}` : `0${n}`;
}

function isSameDay(d1, d2) {
    return (
        d1.getFullYear() === d2.getFullYear()
        && d1.getMonth() === d2.getMonth()
        && d1.getDate() === d2.getDate()
    )
}

function sortByDateTime(datetime1, datetime2) {
    var convertDatetime1 = new Date(datetime1).getTime();
    var convertDatetime2 = new Date(datetime2).getTime();
    return convertDatetime1 > convertDatetime2 ? 1 : -1;
}