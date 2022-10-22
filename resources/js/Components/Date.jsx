import React from 'react'
import dayjs from 'dayjs';

function Date({date}) {
  return (
    <div className="pl-4 py-2">
      <span className="text-lg text-indigo-900 cursor-default">{dayjs(date).format('dddd, DD/MM/YYYY')}</span>
    </div>
  )
}

export default Date