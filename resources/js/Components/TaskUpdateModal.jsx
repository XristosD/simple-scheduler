import React from 'react';
import Modal from '@/components/Modal';
import Switcher from '@/Components/Switcher';
import { useForm } from '@inertiajs/inertia-react';

function TaskUpdateModal({ isOpen, setIsOpen, id, title, body, open, begin, end }) {

  const { data, setData, put, processing, errors, reset } = useForm({
    id: id,
    title: title,
    body: body,
    open: open,
    begin: begin,
    end: end,
  })
  

  function submit(e) {
    e.preventDefault()
    put(`/tasks/${id}`, {
      preserveScroll: true,
      onSuccess: () => setIsOpen(false),
    })
  }

  function setTaskOpen(val) {
    setData('open', val)
  }

  function closeModal() {
    if(!processing){
      setIsOpen(false);
      reset();
    }
  }

  return (
      <Modal isOpen={isOpen} onClose={() => closeModal()} title={"Edit Task"}>
        <form onSubmit={submit} className='space-y-3'>
          <div className='flex flex-col'>
            <label htmlFor="title" className="text-sm text-indigo-500 font-medium pl-1 pb-0 peer-focus:text-indigo-900">Title</label>
            <input type="text" id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="rounded-lg border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500 peer"/>
          </div>
          <div className='flex flex-col'>
            <label htmlFor="body" className="text-sm text-indigo-500 font-medium pl-1 pb-0 peer-focus:text-indigo-900">Body</label>
            <textarea rows="3" id="body" value={data.body} onChange={e => setData('body', e.target.value)} className="rounded-lg border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500 peer"/>
          </div>
          <Switcher checked={data.open} setChecked={setTaskOpen} />
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

export default TaskUpdateModal