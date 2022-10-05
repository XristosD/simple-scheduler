import React,  { useState, Fragment } from 'react'
import { Switch } from '@headlessui/react'
import { FiEdit3 } from 'react-icons/fi';
import Modal from '@/components/Modal';

function GroupItem() {
  const [enabled, setEnabled] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

  return (
    <>
      <div className="bg-indigo-200 p-1 rounded-md text-slate-800 shadow">
        <div className="flex justify-between text-xs font-bold">
          <span>10:50</span>
          <button onClick={() => setOpenEditor(true)}><FiEdit3 className="text-sm cursor-pointer" /></button>
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
      <Modal isOpen={openEditor} setOpenModal={setOpenEditor} >
        <form action="">
          <label for="appt">Select a time:</label>
          <input type="time" id="appt" name="appt"></input>
        </form>

        <div className="mt-4">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => setOpenEditor(false)}
          >
            cancel
          </button>
        </div>
      </Modal>
    </>
  )
}

export default GroupItem