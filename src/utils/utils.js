const _mixDate = (startDate, endDate) => {
  const start = new Date(
    `${startDate.substring(0, 4)}-${startDate.substring(4, 6)}-${startDate.substring(6, 8)}`
  );
  const end = new Date(
    `${endDate.substring(0, 4)}-${endDate.substring(4, 6)}-${endDate.substring(6, 8)}`
  );

  const startYear = start.getFullYear();
  const startMonth = String(start.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const startDay = String(start.getDate()).padStart(2, '0');

  const endMonth = String(end.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1
  const endDay = String(end.getDate()).padStart(2, '0');

  return `${startYear}. ${startMonth}. ${startDay} ~ ${endMonth}. ${endDay}`;
};

const _leftDate = (e) => {
  const today = new Date();
  const specificDate = new Date(
    `${e.substring(0, 4)}-${e.substring(4, 6)}-${e.substring(6)}`
  );

  if (today > specificDate) return false;

  const differenceInMilliseconds = specificDate - today;
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const differenceInDays = Math.floor(
    differenceInMilliseconds / millisecondsPerDay
  );
  return differenceInDays;
};

export { _mixDate, _leftDate };
