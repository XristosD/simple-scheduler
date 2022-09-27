import React,  { useState } from 'react'
import { Switch } from '@headlessui/react'

function GroupItem() {
  const [enabled, setEnabled] = useState(false)

  return (
    <div className="bg-indigo-200 p-1 rounded-md text-slate-800 shadow">
      <div className="flex justify-between text-xxs font-bold">
        <span>10:50</span>
        <span>edit</span>
      </div>
      <div className="text-md">Title</div>
      <div className="flex justify-end text-xxs font-bold">
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? 'bg-indigo-700' : 'bg-indigo-300'
          } relative inline-flex h-3 w-6 items-center rounded-full`}
        >
          <span className="sr-only">Enable notifications</span>
          <span
            className={`${
              enabled ? 'translate-x-3' : 'translate-x-0'
            } inline-block h-3 w-3 transform rounded-full bg-white transition`}
          />
    </Switch>
      </div>
    </div>
  )
}

export default GroupItem