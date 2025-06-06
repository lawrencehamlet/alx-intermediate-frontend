document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.age-calc-form');
  const dayInput = document.getElementById('day');
  const monthInput = document.getElementById('month');
  const yearInput = document.getElementById('year');
  const yearsResult = document.getElementById('years');
  const monthsResult = document.getElementById('months');
  const daysResult = document.getElementById('days');
  const dayError = document.getElementById('day-error');
  const monthError = document.getElementById('month-error');
  const yearError = document.getElementById('year-error');

  function clearErrors() {
    dayError.textContent = '';
    monthError.textContent = '';
    yearError.textContent = '';
    dayInput.classList.remove('input-error');
    monthInput.classList.remove('input-error');
    yearInput.classList.remove('input-error');
  }

  function setError(input, errorElem, message) {
    errorElem.textContent = message;
    input.classList.add('input-error');
  }

  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  function getDaysInMonth(month, year) {
    return [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
  }

  // Remove min/max and required attributes to allow any input value and disable browser validation
  dayInput.removeAttribute('min');
  dayInput.removeAttribute('max');
  dayInput.removeAttribute('required');
  monthInput.removeAttribute('min');
  monthInput.removeAttribute('max');
  monthInput.removeAttribute('required');
  yearInput.removeAttribute('required');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    // 1. Required fields check
    let requiredValid = true;
    if (!dayInput.value) {
      setError(dayInput, dayError, 'This field is required');
      requiredValid = false;
    }
    if (!monthInput.value) {
      setError(monthInput, monthError, 'This field is required');
      requiredValid = false;
    }
    if (!yearInput.value) {
      setError(yearInput, yearError, 'This field is required');
      requiredValid = false;
    }
    if (!requiredValid) {
      yearsResult.textContent = '--';
      monthsResult.textContent = '--';
      daysResult.textContent = '--';
      return;
    }

    const day = parseInt(dayInput.value, 10);
    const month = parseInt(monthInput.value, 10);
    const year = parseInt(yearInput.value, 10);
    let valid = true;

    // 2. Validate month
    if (isNaN(month) || month < 1 || month > 12) {
      setError(monthInput, monthError, 'Must be a valid month');
      valid = false;
    }

    // 3. Validate year
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const currentDay = now.getDate();
    if (isNaN(year) || year < 1900) {
      setError(yearInput, yearError, 'Must be a valid year');
      valid = false;
    } else if (
      year > currentYear ||
      (year === currentYear && month > currentMonth) ||
      (year === currentYear && month === currentMonth && day > currentDay)
    ) {
      setError(yearInput, yearError, 'Must be in the past');
      valid = false;
    }

    // 4. Validate day
    if (isNaN(day) || day < 1) {
      setError(dayInput, dayError, 'Must be a valid day');
      valid = false;
    }

    // 5. Validate day in month (e.g. 31st April, 30th Feb, etc)
    if (valid && (day > getDaysInMonth(month, year))) {
      setError(dayInput, dayError, 'Must be a valid date');
      dayInput.classList.add('input-error');
      monthInput.classList.add('input-error');
      yearInput.classList.add('input-error');
      valid = false;
    }

    // Highlight only the fields with errors (for invalid day/month/year)
    if (monthError.textContent) monthInput.classList.add('input-error');
    if (yearError.textContent) yearInput.classList.add('input-error');
    if (dayError.textContent) dayInput.classList.add('input-error');

    if (!valid) {
      yearsResult.textContent = '--';
      monthsResult.textContent = '--';
      daysResult.textContent = '--';
      return;
    }

    // Calculate age
    let y = currentYear - year;
    let m = currentMonth - month;
    let d = currentDay - day;

    if (d < 0) {
      m -= 1;
      d += getDaysInMonth((currentMonth === 1 ? 12 : currentMonth - 1), (currentMonth === 1 ? currentYear - 1 : currentYear));
    }
    if (m < 0) {
      y -= 1;
      m += 12;
    }

    yearsResult.textContent = y;
    monthsResult.textContent = m;
    daysResult.textContent = d;
  });
});
