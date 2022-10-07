import React from 'react';
import { Switch } from '@headlessui/react';

function Switcher({ checked, setChecked }) {
  return (
  <Switch
      checked={checked}
      onChange={setChecked}
      className={`${
        checked ? 'bg-indigo-700' : 'bg-indigo-300'
      } relative inline-flex h-3 w-6 items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          checked ? 'translate-x-3' : 'translate-x-0'
        } inline-block h-3 w-3 transform rounded-full bg-white transition`}
      />
    </Switch>
  )
}

export default Switcher