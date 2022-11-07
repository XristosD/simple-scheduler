import React from 'react';
import Modal from '@/components/Modal';
import Switcher from '@/Components/Switcher';
import { MdDelete } from 'react-icons/md';
import Timer from '@/Components/Timer';

function TaskUpdateModal({ isOpen, closeModal, data, setData, submit, errors, processing, setOpenTaskDeleteModal }) {

  function openDeleteModal() {
    closeModal();
    setOpenTaskDeleteModal(true);
  }

  function changeBeginTime(time) {
    setData("begin_time", time)
  }

  function changeEndTime(time) {
    setData("end_time", time)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => closeModal()} title={"Edit Task"}>
      <form onSubmit={submit} className='space-y-3'>
        <div className='flex flex-col'>
          <label htmlFor="title" className="text-sm text-indigo-500 font-medium pl-1 pb-0 peer-focus:text-indigo-900">Title</label>
          <input type="text" id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="rounded-lg border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500 peer"/>
          {errors.title && <span className='text-xs text-red-700'>{errors.title}</span>}
        </div>
        <div className='flex flex-col pb-0'>
          <span className="text-sm text-indigo-500 font-medium pl-1 pb-0">Time</span>
          <div className='flex gap-2'>
            <div>
              <label htmlFor="begin-time" className='hidden'>Begin Time</label>
              <input type="hidden" name="begin-time" value={data.begin} />
              <Timer strTime={data.begin_time} label={"begin"} onChangeTime={changeBeginTime}/>
            </div>
            <div>
              <label htmlFor="end-time" className='hidden'>End Time</label>
              <input type="hidden" name="end-time" value={data.end} />
              <Timer strTime={data.end_time} label={"end"} onChangeTime={changeEndTime}/>
            </div>
          </div>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="body" className="text-sm text-indigo-500 font-medium pl-1 pb-0 peer-focus:text-indigo-900">Body</label>
          <textarea rows="3" id="body" value={data.body} onChange={e => setData('body', e.target.value)} className="rounded-lg border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500 peer"/>
          {errors.body && <span className='text-xs text-red-700'>{errors.body}</span>}
        </div>
        <Switcher checked={data.open} setChecked={(val) => setData('open', val)} />
        {errors.open && <span className='text-xs text-red-700'>{errors.open}</span>}
        
        <div className="pt-4 flex justify-between items-center">
          <div className='space-x-2'>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-200 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              disabled={processing}
              >
              save
            </button>
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-200 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => closeModal()}
              disabled={processing}
              >
              cancel
            </button>
          </div>
          <div>
            <button type='button' onClick={openDeleteModal}>
              <MdDelete className='text-lg text-red-700' />
            </button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default TaskUpdateModal