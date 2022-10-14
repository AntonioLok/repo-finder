/* eslint-disable import/prefer-default-export */
import moment from 'moment';

const getFormattedDate = date => moment(date).format('MMMM Do YYYY, h:mm:ss a');

export {
  getFormattedDate,
};
