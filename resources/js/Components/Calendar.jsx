import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import Month from '@/Components/Month';

import SwiperCore, { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([Virtual, Navigation]);

function Calendar({date, aheadBehind, daysSum}) {
  const [months, setMonths] = useState(createMonthsArray());

  useEffect(() => {
    setMonths(createMonthsArray());
  }, [date, aheadBehind, daysSum])

  function createMonthsArray() {
    let tmp = [];
    const daysInfo = daysSum.reduce((prev, day) => {
      const dayDate = dayjs(day.date);

      prev[dayDate.year()] ??= {};
      prev[dayDate.year()][dayDate.month()] ??= {};
      prev[dayDate.year()][dayDate.month()][dayDate.date()] = day;

      return prev;
    }, {});

    let monthDate = null;
    for(let i = aheadBehind ; i >= 1 ; i--) {
      monthDate = dayjs(date).subtract(i, 'month')
      tmp.push({
        key: monthDate.unix(),
        month: <Month date={monthDate} dayInfo={daysInfo?.[monthDate.year()]?.[monthDate.month()]} activeDate={date}/>
      });
    }

    for(let i = 0 ; i <= aheadBehind ; i++) {
      monthDate = dayjs(date).add(i, 'month');
      tmp.push({
        key: monthDate.unix(),
        month: <Month date={monthDate} dayInfo={daysInfo?.[monthDate.year()]?.[monthDate.month()]} activeDate={date}/>
      })
    }

    return tmp;
  }
  

  
  return (
    <Swiper
        slidesPerView={7}
        initialSlide={months.length/2}
        centeredSlides={true}
        spaceBetween={30}
        navigation={true}
        virtual>
          {
            months.map((month, index) => (
              <SwiperSlide key={month.key} virtualIndex={index} >
                {month.month}
              </SwiperSlide>
            ))
          }
    </Swiper>
  )
}

export default Calendar