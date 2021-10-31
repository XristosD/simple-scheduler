import React, { useState } from "react";
import Month from "./Month/Month";
import Slider from "react-slick";
import useSlidingCalendar from "./useSlidingCalendar";

import "./calendar.css";

const Calendar = () => {
  const [months, sliderSettings] = useSlidingCalendar();

  return (
    <div>
      <Slider {...sliderSettings}>
        {months.map((month, index) => {
          return <Month index={index} key={index} {...month} />;
        })}
      </Slider>
    </div>
  );
};

export default Calendar;
