type FormatDate = (date: Date | string) => string | null;

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const formatDate: FormatDate = date => {
  try {
    const dateAsDateObject = new Date(date);

    const month = dateAsDateObject.getMonth();
    const day = dateAsDateObject.getDate();
    const year = dateAsDateObject.getFullYear();

    return `${months[month]} ${day}, ${year}`;
  } catch (error) {
    return null;
  }
};

export default formatDate;
