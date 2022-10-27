import React from 'react';
import dayjs from 'dayjs';
import { Link } from '@inertiajs/inertia-react';
import arraySupport  from 'dayjs/plugin/arraySupport';
import localeData   from 'dayjs/plugin/localeData ';


dayjs.extend(arraySupport);
dayjs.extend(localeData);

function Month({date, dayInfo, activeDate}) {
  const daysText = dayjs.weekdaysMin();
  const monthText = dayjs.months()[date.month()];
  const activeDay = date.isSame(dayjs(activeDate), 'month') && dayjs(activeDate).date();
  
  // TODO extract on helper function
  const firstDayIndex = date.startOf('month').day();
  const monthDays = date.daysInMonth();
  const days = [];
  for(let i = 0; i < 42; i++) {
    if( i < firstDayIndex || i > firstDayIndex + monthDays - 1 ) {
      days.push(0);
    }
    else {
      days.push(i - firstDayIndex + 1 );
    }
  }

  return (
    <div className='border-2 rounded-md bg-slate-200 cursor-default drop-shadow w-max'>
      <div className='text-center p-1 text-lg font-semibold text-indigo-900/90'>{monthText} {date.year()}</div>
      <div className="grid grid-cols-7 auto-cols-max gap-1 p-1 justify-items-center">
        {daysText.map((dayTextual, index) => (
            <div key={index} className="w-5 h-5 border-2 flex items-center justify-center rounded-md">
              <span className="text-xs font-semibold text-indigo-900/90">{dayTextual}</span>
            </div>
          )
        )}
        {days.map((day, index) => 
          day != 0 ?
          (<Link as="button" href={`/scheduler/${date.date(day).format('DD-MM-YYYY')}`} key={index} className={`w-7 h-7 border-2 relative flex items-center justify-center rounded-md 
                                bg-white ${dayInfo?.[day] && 'bg-red-200'} ${dayInfo?.[day]?.open > 0 && 'bg-green-200'} cursor-pointer hover:ring-1 ring-indigo-400 group
                                ${day === activeDay && 'ring-2 hover:ring-2'}`}>
            <span className="text-xs font-semibold tabular-nums text-slate-600 group-hover:text-indigo-600 group-hover:font-black">{day}</span>
            {dayInfo?.[day] && (
              <div className="absolute rounded h-10 w-16 hidden group-hover:flex items-center justify-center flex-col left-9 z-10 p-1 bg-indigo-200">
                <div className='text-xs font-semibold'>total: <span className='text-red-500'>{dayInfo?.[day]?.total}</span></div>
                <div className='text-xs font-semibold'>open: <span className="text-green-500">{dayInfo?.[day]?.open}</span></div>
              </div>
            )}
          </Link>)
          : ( <div key={index} className="w-7 h-7 border-2 flex items-center justify-center rounded-md bg-slate-100/30"></div> )
        )}
      </div>
    </div>

  )
}

export default Month