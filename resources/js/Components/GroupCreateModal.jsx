import React from 'react';
import Modal from '@/components/Modal';
import { useForm } from '@inertiajs/inertia-react';

function GroupCreateModal({ isOpen, setIsOpen, refDate }) {

    const { data, setData, post, processing, errors, reset, setDefaults } = useForm({
    ref_date: refDate,
    title: '',
  })

  function submit(e) {
    e.preventDefault()
    post('/groups', {
      preserveScroll: true,
      onSuccess: () => {
        setIsOpen(false);
        setDefaults();
        reset();
      },
    })
  }

  function closeModal() {
    if(!processing){
      setIsOpen(false);
      reset();
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={() => closeModal()} title={"Create Group"}>
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
            onClick={() => closeModal()}
            disabled={processing}
            >
            cancel
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default GroupCreateModal