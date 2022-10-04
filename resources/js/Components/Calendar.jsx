import React, { useState } from 'react'
import Month from '@/Components/Month';

import SwiperCore, { Virtual, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

SwiperCore.use([Virtual, Navigation]);

function Calendar() {
  const [months, setMonths] = useState([
      <Month year={2022} month={5} />,
      <Month year={2022} month={6} />,
      <Month year={2022} month={7} />,
      <Month year={2022} month={8} />,
      <Month year={2022} month={9} />,
      <Month year={2022} month={10} />,
      <Month year={2022} month={10} />,
      <Month year={2022} month={10} />,
      <Month year={2022} month={10} />,
      <Month year={2022} month={10} />,
      <Month year={2022} month={10} />,
      <Month year={2022} month={10} />,
      <Month year={2022} month={10} />,
      <Month year={2022} month={11} />
  ])
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
              <SwiperSlide key={month} virtualIndex={index} >
                {month}
              </SwiperSlide>
            ))
          }
    </Swiper>
  )
}

export default Calendar