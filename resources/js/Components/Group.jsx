import React, { useState } from 'react'
import GroupItem from './GroupItem';
import {AiFillPlusCircle} from 'react-icons/ai';
import Modal from '@/components/Modal';
import { useForm } from '@inertiajs/inertia-react';
import Switcher from '@/Components/Switcher';

function Group() {
  const [openCreator, setOpenCreator] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    title: '',
    body: '',
    open: false,
  })

  const setOpen = (open) => {
    setData('open', open);
  }

  return (
    <div className="w-44 border-2 pb-10 rounded-lg border-indigo-200">
      <div className="border-b-2 text-center bg-indigo-200 border-indigo-200 rounded-t-sm text-indigo-900">Group Title</div>
      <div className="p-1 flex flex-col gap-1 shadow-inner">
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
      </div>
      <div className='flex justify-center'>
        <button onClick={() => setOpenCreator(true)}>
          <AiFillPlusCircle className='text-2xl text-indigo-200 hover:text-indigo-300 cursor-pointer'/>
        </button>
      </div>
      <Modal isOpen={openCreator} setOpenModal={setOpenCreator} >
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
            onClick={() => setOpenCreator(false)}
          >
            cancel
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default Group