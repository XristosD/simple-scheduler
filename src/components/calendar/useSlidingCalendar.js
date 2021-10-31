import { useState } from "react";
import { DateTime } from "luxon";

const initializeMonths = () => {
  const now = DateTime.now();
  let months = [];
  months.push(getMonthInfo(now));
  for (let step = 1; step < 7; step++) {
    months.push(getMonthInfo(now.plus({ months: step })));
  }
  for (let step = 5; step > 0; step--) {
    months.push(getMonthInfo(now.minus({ months: step })));
  }
  return months;
};

const getMonthInfo = (dateTime) => {
  return {
    month: dateTime.month,
    year: dateTime.year,
    startingWeekday: dateTime.startOf("month").weekday,
    days: dateTime.daysInMonth,
  };
};

const useSlidingCalendar = () => {
  const [data, setData] = useState(initializeMonths());

  // data = [6, 7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5];
  // looping around
  // TODO explain working float
  // TODO refactor maths
  const moveFrontward = (next) => {
    const indexToChange = (next + 6) % 12;
    const indexToReference = (next + 5) % 12;
    setData((oldData) =>
      oldData.map((item, index) => {
        return index === indexToChange
          ? getMonthInfo(
              DateTime.local(
                oldData[indexToReference].year,
                oldData[indexToReference].month
              ).plus({ months: 1 })
            )
          : item;
      })
    );
  };

  const moveBackward = (next) => {
    const indexToChange = (next + 7) % 12;
    const indexToReference = (next + 8) % 12;
    setData((oldData) =>
      oldData.map((item, index) => {
        return index === indexToChange
          ? getMonthInfo(
              DateTime.local(
                oldData[indexToReference].year,
                oldData[indexToReference].month
              ).minus({ months: 1 })
            )
          : item;
      })
    );
  };

  const sliderSettings = {
    dots: false,
    infinite: true,
    centerMode: true,
    speed: 100,
    slidesToShow: 7,
    slidesToScroll: 1,
    beforeChange: (current, next) => {
      if (current === 0 && next === 11) {
        moveBackward(next);
      } else if (current === 11 && next === 0) {
        moveFrontward(next);
      } else {
        current < next ? moveFrontward(next) : moveBackward(next);
      }
    },
  };

  return [data, sliderSettings];
};

export default useSlidingCalendar;
