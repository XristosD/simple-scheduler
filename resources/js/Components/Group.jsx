import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import Task from './Task';
import {AiFillPlusCircle} from 'react-icons/ai';
import { useForm } from '@inertiajs/inertia-react';
import { FiEdit3 } from 'react-icons/fi';
import GroupUpdateModal from '@/Components/GroupUpdateModal';
import TaskCreateModal from '@/Components/TaskCreateModal';
import GroupDeleteModal from '@/Components/GroupDeleteModal';

function Group({ id, title, order, date, tasks }) {
  const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
  const [openEditGroupModal, setOpenEditGroupModal] = useState(false);
  const [openGroupDeleteModal, setOpenGroupDeleteModal] = useState(false);
  const [deleteProcess, setDeleteProcess] = useState(false);


  const { data, setData, post, processing, errors } = useForm({
    title: '',
    body: '',
    open: false,
  })

  const deleteGroup = () => {
    Inertia.delete(`/groups/${id}`,{
      preserveScroll: true,
      onSuccess: () => setOpenGroupDeleteModal(false),
      onStart: () => setDeleteProcess(true),
      onFinish: () => setDeleteProcess(false),
    })
  }

  const orderedTasks = _.orderBy(tasks, 'order', 'asc');

  return (
    <div className="w-44 border-2 pb-10 rounded-lg border-indigo-200">
      <div onClick={() => setOpenEditGroupModal(true)} className="flex items-center justify-center border-b-2 bg-indigo-200 border-indigo-200 rounded-t-sm text-indigo-900 px-1 py-2 relative group cursor-pointer">
        <span className='text-center'>{title}</span>
        <FiEdit3 className="hidden text-xs absolute right-1 bottom-1 group-hover:block" />
      </div>
      <GroupUpdateModal isOpen={openEditGroupModal} setIsOpen={setOpenEditGroupModal} title={title} id={id} setOpenGroupDeleteModal={setOpenGroupDeleteModal}/>
      <GroupDeleteModal 
        isOpen={openGroupDeleteModal} 
        setIsOpen={setOpenGroupDeleteModal}
        deleteGroup={deleteGroup}
        deleteProcess={deleteProcess}
      />
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