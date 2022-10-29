import React, {useState} from 'react';
import Group from './Group';
import {AiFillPlusCircle} from 'react-icons/ai';
import Modal from '@/components/Modal';
import { useForm } from '@inertiajs/inertia-react';
import GroupCreateModal from './GroupCreateModal';

function Agenda({ groups, date }) {
  const [openGroupCreateModal, setGroupCreateModal] = useState(false);

  const orderedGroups = _.orderBy(groups, 'order', 'asc');

  return (
    <div className='flex items-start'>
      <div className="flex gap-2">
        {orderedGroups.map((group) => {
          return <Group key={group.id} id={group.id} title={group.title} order={group.order} date={group.date} tasks={group.tasks}/>
        })}
      </div>
      <div className='ml-1 pt-1'>
        <button onClick={() => {setGroupCreateModal(true)}}>
          <AiFillPlusCircle className='text-2xl text-indigo-200 hover:text-indigo-300 cursor-pointer'/>
        </button>
      </div>
      <GroupCreateModal isOpen={openGroupCreateModal} setIsOpen={setGroupCreateModal} refDate={date} />
    </div>
    
  )
}

export default Agenda