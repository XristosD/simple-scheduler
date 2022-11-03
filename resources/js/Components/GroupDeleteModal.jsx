import React from 'react';
import Modal from '@/components/Modal';

function GroupDeleteModal({isOpen, setIsOpen, deleteGroup, deleteProcess}) {
  return (
    <Modal  isOpen={isOpen} onClose={setIsOpen} title={"Delete Task"}>
      <p className="pb-2">Are you sure you want to delete the group and all it's tasks?</p>
      <div className='space-x-2'>
        <button
          type="button"
          onClick={deleteGroup}
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-200 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          disabled={deleteProcess}
          >
          delete
        </button>
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-200 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
          onClick={() => setIsOpen(false)}
          disabled={deleteProcess}
          >
          cancel
        </button>
      </div>
    </Modal>
  )
}

export default GroupDeleteModal