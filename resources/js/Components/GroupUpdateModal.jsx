import React, { useRef } from 'react'
import Modal from '@/components/Modal';
import { useForm } from '@inertiajs/inertia-react';

function GroupUpdateModal({ isOpen, setIsOpen, groupTitle, groupId }) {

  const { data, setData, put, processing, errors } = useForm({
    id: groupId,
    title: groupTitle,
  })

  function submit(e) {
    e.preventDefault()
    put(`/groups/${groupId}`, {
      preserveScroll: true,
      onSuccess: () => setIsOpen(false),
    })
  }

  return (
      <Modal isOpen={isOpen} setOpenModal={setIsOpen} title={"Edit Group"}>
        <form onSubmit={submit} className='space-y-3'>
          <div className='flex flex-col'>
            <label htmlFor="title" className="text-sm text-indigo-500 font-medium pl-1 pb-0 peer-focus:text-indigo-900">Title</label>
            <input type="text" id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="rounded-lg border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500 peer"/>
          </div>

          <div className="mt-4">
            <button
              type="button"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              onClick={() => setIsOpen(false)}
              >
              cancel
            </button>
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              disabled={processing}
              >
              save
            </button>
          </div>
        </form>
      </Modal>
  )
}

export default GroupUpdateModal