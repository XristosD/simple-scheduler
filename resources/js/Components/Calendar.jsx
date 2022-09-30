import React from 'react'
import Month from '@/Components/Month';

function Calendar() {
  return (
    <div className="flex gap-3">
      <Month year={2022} month={5} />
      <Month year={2022} month={6} />
      <Month year={2022} month={7} />
      <Month year={2022} month={8} />
      <Month year={2022} month={9} />
      <Month year={2022} month={10} />
      <Month year={2022} month={11} />
    </div>
  )
}

export default Calendar