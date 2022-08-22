import dayjs from "dayjs";

let currentMonth = new Date().toJSON().slice(0, 7);
let currentDate = new Date().toJSON().slice(0, 10);
let currentYear = new Date().toJSON().slice(0, 4);

const getPeriod = (option) => {
  switch (option) {
    case "month":
      return {
        from: `${currentMonth}-01`,
        to: `${currentMonth}-${dayjs().daysInMonth()}`,
      };

    case "day":
      return {
        from: `${currentDate}`,
        to: `${currentDate}`,
      };

    case "year":
      return {
        from: `${currentYear}-01-01`,
        to: `${currentYear}-12-31`,
      };

    case "week":
      return {
        from: `${dayjs().day(1).format("YYYY-MM-DD")}`,
        to: `${dayjs().day(7).format("YYYY-MM-DD")}`,
      };
  }
};

export const getPeriodFromMonth = (month) => {
  const startDate = `${currentYear}-${month}-01`;
  const endDate = `${currentYear}-${month}-${dayjs(startDate).daysInMonth()}`;
  return {
    from: startDate,
    to: endDate,
  };
};
export default getPeriod;
