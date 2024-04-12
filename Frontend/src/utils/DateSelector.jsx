
import PropTypes from 'prop-types';

const DateSelector = ({ day, month, year, onDayChange, onMonthChange, onYearChange }) => {
  // Generate options for days, months, and years
  const daysOptions = Array.from({ length: 31 }, (_, index) => (
    <option key={index + 1} value={index + 1}>{index + 1}</option>
  ));

  const monthsOptions = Array.from({ length: 12 }, (_, index) => {
    const monthValue = index + 1;
    const monthLabel = monthValue < 10 ? `0${monthValue}` : `${monthValue}`;
    const monthName = new Date(2000, index, 1).toLocaleString('en-US', { month: 'long' });
    return <option key={monthValue} value={monthLabel}>{monthName}</option>;
  });

  const currentYear = new Date().getFullYear();
  const yearsOptions = Array.from({ length: 100 }, (_, index) => (
    <option key={currentYear - index} value={currentYear - index}>{currentYear - index}</option>
  ));

  return (
    <div className="flex">
      <select value={day} onChange={onDayChange} className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2">
        <option value="" disabled hidden>Day</option>
        {daysOptions}
      </select>
      <select value={month} onChange={onMonthChange} className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2">
        <option value="" disabled hidden>Month</option>
        {monthsOptions}
      </select>
      <select value={year} onChange={onYearChange} className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
        <option value="" disabled hidden>Year</option>
        {yearsOptions}
      </select>
    </div>
  );
};

DateSelector.propTypes = {
  day: PropTypes.string.isRequired, // Change to string
  month: PropTypes.string.isRequired, // Change to string
  year: PropTypes.string.isRequired, // Change to string
  onDayChange: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

export default DateSelector;
