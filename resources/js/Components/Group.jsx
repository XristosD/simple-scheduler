import React, { useState } from 'react'
import Task from './Task';
import {AiFillPlusCircle} from 'react-icons/ai';
import Modal from '@/components/Modal';
import { useForm } from '@inertiajs/inertia-react';
import Switcher from '@/Components/Switcher';
import { FiEdit3 } from 'react-icons/fi';
import GroupUpdateModal from '@/Components/GroupUpdateModal';
import TaskCreateModal from '@/Components/TaskCreateModal';

function Group({ id, title, order, date, tasks }) {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);


  const { data, setData, post, processing, errors } = useForm({
    title: '',
    body: '',
    open: false,
  })

  const setOpen = (open) => {
    setData('open', open);
  }

  const orderedTasks = _.orderBy(tasks, 'order', 'asc');

  return (
    <div className="w-44 border-2 pb-10 rounded-lg border-indigo-200">
      <div onClick={() => setOpenEditGroupModal(true)} className="flex items-center justify-center border-b-2 bg-indigo-200 border-indigo-200 rounded-t-sm text-indigo-900 px-1 py-2 relative group cursor-pointer">
        <span className='text-center'>{title}</span>
        <FiEdit3 className="hidden text-xs absolute right-1 bottom-1 group-hover:block" />
      </div>
      <GroupUpdateModal isOpen={openEditGroupModal} setIsOpen={setOpenEditGroupModal} title={title} id={id}/>
      <div className="p-1 flex flex-col gap-1 shadow-inner">
        {orderedTasks.map((task) => <Task key={task.id} id={task.id} title={task.title} body={task.body} open={task.open} order={task.order} begin={task.begin_time} end={task.end_time} groupId={task.group_id} />)}
      </div>
      <div className='flex justify-center'>
        <button onClick={() => setOpenCreateTaskModal(true)}>
          <AiFillPlusCircle className='text-2xl text-indigo-200 hover:text-indigo-300 cursor-pointer'/>
        </button>
      </div>
      <TaskCreateModal isOpen={openCreateTaskModal} setIsOpen={setOpenCreateTaskModal} groupId={id}/>
    </div>
  )
}

export default Group