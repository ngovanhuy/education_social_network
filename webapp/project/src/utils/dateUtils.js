import moment from 'moment';

export const dateUtils = {
    formatDate,
    sortByDateTime,
    convertISOToLocaleString,
    convertISOToLocaleDateString,
    convertDateTimeToISO,
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const today = new Date();
    const month = _toPadZeroString(date.getMonth() + 1);
    const dateOfMonth = _toPadZeroString(date.getDate());

    if (_isSameDay(date, today)) {
        const hours = _toPadZeroString(date.getHours());
        const minutes = _toPadZeroString(date.getMinutes());
        return `${hours}:${minutes}`
    } else if (date.getFullYear() === today.getFullYear()) {
        return `${dateOfMonth}/${month}`
    } else {
        return `${dateOfMonth}/${month}/${date.getFullYear()}`
    }
}

function _toPadZeroString(n) {
    return n >= 10 ? `${n}` : `0${n}`;
}

function _isSameDay(d1, d2) {
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

function convertISOToLocaleString(datetime) {
    if(datetime){
        var date = new Date(datetime);
        var result = date.toLocaleString();
        return result;
    }
    return "";
}

function convertISOToLocaleDateString(datetime) {
    if(datetime){
        var date = new Date(datetime);
        var result = date.toLocaleDateString();
        return result;
    }
    return "";
}

function convertDateTimeToISO(datetime) {
    if(datetime){
        var date = moment.utc(datetime).valueOf();
        var result = new Date(date).toISOString();
        return result;
    }
    return "";
}