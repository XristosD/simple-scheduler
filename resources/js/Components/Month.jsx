import React from 'react'
import dayjs from 'dayjs';
import arraySupport  from 'dayjs/plugin/arraySupport';
import localeData   from 'dayjs/plugin/localeData ';


dayjs.extend(arraySupport);
dayjs.extend(localeData);

function Month({year, month}) {

  const daysText = dayjs.weekdaysMin();
  const monthText = dayjs.months()[month-1];

  // TODO extract on helper function and move to parent
  const date = dayjs([year, month-1]);
  const firstDayIndex = date.day();
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
      <div className='text-center p-1 text-lg font-semibold text-indigo-900/90'>{monthText}</div>
      <div className="grid grid-cols-7 auto-cols-max gap-1 p-1 justify-items-center">
        {daysText.map(dayTextual => <div className="w-5 h-5 border-2 flex items-center justify-center rounded-md">
          <span className="text-xs font-semibold text-indigo-900/90">{dayTextual}</span>
          </div>
        )}
        {days.map(day => 
          day != 0 ?
          ( <div className="w-7 h-7 border-2 flex items-center justify-center rounded-md bg-white cursor-pointer hover:ring-1 ring-indigo-400 group">
            <span className="text-xs font-semibold tabular-nums text-slate-600 group-hover:text-indigo-600 group-hover:font-black">{day}</span>
          </div> )
          : ( <div className="w-7 h-7 border-2 flex items-center justify-center rounded-md bg-slate-100/30"></div> )
        )}
      </div>
    </div>

  )
}

export default Month