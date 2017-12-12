import moment from 'moment';
import {eventConstants} from "../constants";
import {extendMoment} from 'moment-range';
const momentRange = extendMoment(moment);

export const dateUtils = {
    formatDate,
    sortByDateTime,
    convertISOToLocaleString,
    convertISOToLocaleDateString,
    convertDateTimeToISO,
    convertFrequencyInfoToEventTimes,
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
    if (datetime) {
        var date = new Date(datetime);
        var result = date.toLocaleString();
        return result;
    }
    return "";
}

function convertISOToLocaleDateString(datetime) {
    if (datetime) {
        var date = new Date(datetime);
        var result = date.toLocaleDateString();
        return result;
    }
    return "";
}

function convertDateTimeToISO(datetime) {
    if (datetime) {
        var date = moment.utc(datetime).valueOf();
        var result = new Date(date).toISOString();
        return result;
    }
    return "";
}

function convertFrequencyInfoToEventTimes(frequencyValue, frequencies) {
    var periods = []
    if (frequencyValue == eventConstants.FREQUENCY.DAILY) {
        if(frequencies && frequencies.daily){
            const range = momentRange.range(frequencies.daily.startDate, frequencies.daily.endDate);
            const days = Array.from(range.by('day'));
            days.map(m => {
                var dateString = m.format('YYYY-MM-DD')
                var startTimeString = moment(frequencies.daily.startTime).format('HH:mm:ss')
                var endTimeString = moment(frequencies.daily.endTime).format('HH:mm:ss')
                periods.push(moment.parseZone(dateString + "T" + startTimeString+ "+07:00").utc().format())
                periods.push(moment.parseZone(dateString + "T" + endTimeString+ "+07:00").utc().format())
            })
        }
    } else if(frequencyValue == eventConstants.FREQUENCY.WEEKLY){
        if(frequencies && frequencies.weekly){
            const range = momentRange.range(frequencies.weekly.startDate, frequencies.weekly.endDate);
            const days = Array.from(range.by('day'));
            days.map(m => {
                var dayOfWeekString = m.format('dddd')
                var dateString = m.format('YYYY-MM-DD')
                if(frequencies.weekly.days.indexOf(dayOfWeekString) !== -1){
                    var startTimeString = moment(frequencies.weekly.startTime).format('HH:mm:ss')
                    var endTimeString = moment(frequencies.weekly.endTime).format('HH:mm:ss')
                    periods.push(moment.parseZone(dateString + "T" + startTimeString+ "+07:00").utc().format())
                    periods.push(moment.parseZone(dateString + "T" + endTimeString+ "+07:00").utc().format())
                }
            })
        }
    }
    return periods
}