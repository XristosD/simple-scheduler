import React from 'react'

function Month() {
  const daysTextual = ['M', 'T', 'T', 'W', 'F', 'S', 'S']
  const days = Array.from(Array(42).keys());
  return (
    <div className="grid grid-cols-7 auto-cols-max max-w-fit gap-1 p-1 border-2 rounded-md bg-slate-200 justify-items-center cursor-default drop-shadow">
      {daysTextual.map(dayTextual => <div className="w-5 h-5 border-2 flex items-center justify-center rounded-md">
        <span className="text-xs font-semibold text-indigo-900/90">{dayTextual}</span>
        </div>
      )}
      {days.map(day => 
        <div className="w-7 h-7 border-2 flex items-center justify-center rounded-md bg-white cursor-pointer">
          <span className="text-xs font-semibold tabular-nums text-slate-600">{day}</span>
        </div>
      )}
    </div>
  )
}

export default Month