import React, { useRef } from 'react'
import Modal from '@/components/Modal';
import { useForm } from '@inertiajs/inertia-react';

function GroupUpdateModal({ isOpen, setIsOpen, title, id }) {

  const { data, setData, put, processing, errors } = useForm({
    id: id,
    title: title,
  })

  function submit(e) {
    e.preventDefault()
    put(`/groups/${id}`, {
      preserveScroll: true,
      onSuccess: () => setIsOpen(false),
    })
  }

  return (
      <Modal isOpen={isOpen} onClose={() => !processing && setIsOpen(false)} title={"Edit Group"}>
        <form onSubmit={submit} className='space-y-3'>
          <div className='flex flex-col'>
            <label htmlFor="title" className="text-sm text-indigo-500 font-medium pl-1 pb-0">Title</label>
            <input type="text" id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="rounded-lg border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500"/>
            {errors.title && <span className='text-xs text-red-700'>{errors.title}</span>}
          </div>
          <div className="pt-4 space-x-2">
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
              onClick={() => setIsOpen(false)}
              disabled={processing}
              >
              cancel
            </button>
          </div>
        </form>
      </Modal>
  )
}

export default GroupUpdateModal