import moment from 'moment';

const timeFormat = (timeString) => {
    const formattedDate = moment(timeString).format('h:mm a');
    return formattedDate;
}

export default timeFormat;
