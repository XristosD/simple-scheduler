import React,  { useState, Fragment } from 'react'
import { FiEdit3 } from 'react-icons/fi';
import Modal from '@/components/Modal';
import Switcher from '@/Components/Switcher';
import { useForm } from '@inertiajs/inertia-react';
import dayjs from 'dayjs';

function GroupItem({ id, title, body, open, order, begin, end, groupId }) {
  const [itemOpen, setItemOpen] = useState(open);
  const [openEditor, setOpenEditor] = useState(false);
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    body: '',
    open: false,
  })

  const setOpen = (open) => {
    setData('open', open);
  }

  return (
    <>
      <div className="bg-indigo-200 p-1 rounded-md text-slate-800 shadow">
        <div className="flex justify-between text-xs font-bold">
          <div>
            <span>{dayjs(begin).format('HH:mm')}</span> - <span>{dayjs(end).format('HH:mm')}</span>
          </div>
          <button onClick={() => setOpenEditor(true)}><FiEdit3 className="text-sm cursor-pointer" /></button>
        </div>
        <div className="text-md">{title}</div>
        <div className="flex justify-end text-xxs font-bold">
          <Switcher checked={itemOpen} setChecked={setItemOpen} />
        </div>
      </div>
      <Modal isOpen={openEditor} setOpenModal={setOpenEditor} >
        <form action="" className='space-y-3'>
          <div className='flex flex-col'>
            <label htmlFor="title" className="text-sm text-indigo-500 font-medium pl-1 pb-0 peer-focus:text-indigo-900">Title</label>
            <input type="text" id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="rounded-lg border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500 peer"/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="body" className="text-sm text-indigo-500 font-medium pl-1 pb-0 peer-focus:text-indigo-900">Body</label>
            <textarea rows="3" id="body" value={data.body} onChange={e => setData('body', e.target.value)} className="rounded-lg border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500 peer"/>
          </div>
          <Switcher checked={data.open} setChecked={setOpen} />
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