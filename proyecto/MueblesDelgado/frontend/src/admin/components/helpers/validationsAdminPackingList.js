

export const isValidDate = (dateString = '') => {
    const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
    const MIN_YEAR = 2000;
    const MAX_YEAR = 2035;

    if (!DATE_REGEX.test(dateString)) return false;

    const [year, month, day] = dateString.split('-').map(Number);

    if (year < MIN_YEAR || year > MAX_YEAR || month < 1 || month > 12 || day < 1 || day > 31) {
        return false;
    }

    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
};