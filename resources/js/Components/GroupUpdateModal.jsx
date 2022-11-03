import React, { useRef } from 'react'
import Modal from '@/components/Modal';
import { useForm } from '@inertiajs/inertia-react';
import { MdDelete } from 'react-icons/md';

function GroupUpdateModal({ isOpen, setIsOpen, title, id, setOpenGroupDeleteModal }) {

  const { data, setData, put, processing, errors, reset, setDefaults } = useForm({
    id: id,
    title: title,
  })

  function submit(e) {
    e.preventDefault()
    put(`/groups/${id}`, {
      preserveScroll: true,
      onSuccess: () => {
        setIsOpen(false);
        setDefaults();
      },
    })
  }

  function closeModal() {
    if(!processing){
      setIsOpen(false);
      reset();
    }
  }

  function openDeleteModal() {
    closeModal();
    setOpenGroupDeleteModal(true);
  }

  return (
    <Modal isOpen={isOpen} onClose={() => closeModal()} title={"Edit Group"}>
      <form onSubmit={submit} className='space-y-3'>
        <div className='flex flex-col'>
          <label htmlFor="title" className="text-sm text-indigo-500 font-medium pl-1 pb-0">Title</label>
          <input type="text" id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="rounded-lg border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500"/>
          {errors.title && <span className='text-xs text-red-700'>{errors.title}</span>}
        </div>
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

export default GroupUpdateModal