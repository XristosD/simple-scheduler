import React from 'react'
import Month from '@/Components/Month';

function Calendar() {
  return (
    <div className="flex gap-3">
      <Month />
      <Month />
      <Month />
      <Month />
      <Month />
      <Month />
    </div>
  )
}

export default Calendar