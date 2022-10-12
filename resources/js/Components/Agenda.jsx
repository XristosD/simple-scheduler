import React, {useState} from 'react';
import Group from './Group';
import {AiFillPlusCircle} from 'react-icons/ai';
import Modal from '@/components/Modal';
import { useForm } from '@inertiajs/inertia-react';

function Agenda({ groups }) {
  const [openCreator, setOpenCreator] = useState(false);

  const { data, setData, post, processing, errors } = useForm({
    title: '',
  })

  const orderedGroups = _.orderBy(groups, 'order', 'desc');

  return (
    <div className='flex items-start'>
      <div className="flex gap-2">
        {orderedGroups.map((group) => {
          return <Group key={group.id} id={group.id} title={group.title} order={group.order} date={group.date} tasks={group.tasks}/>
        })}
      </div>
      <div className='ml-1 pt-1'>
        <button onClick={() => {setOpenCreator(true)}}>
          <AiFillPlusCircle className='text-2xl text-indigo-200 hover:text-indigo-300 cursor-pointer'/>
        </button>
      </div>
      <Modal isOpen={openCreator} setOpenModal={setOpenCreator} >
        <form action="" className='space-y-3'>
          <div className='flex flex-col'>
            <label htmlFor="title" className="text-sm text-indigo-500 font-medium pl-1 pb-0 peer-focus:text-indigo-900">Title</label>
            <input type="text" id="title" value={data.title} onChange={e => setData('title', e.target.value)} className="rounded-lg border-indigo-400 focus:border-indigo-500 focus:ring-indigo-500 peer"/>
          </div>
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

export default Agenda