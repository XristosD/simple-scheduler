import React,  { useState, Fragment, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { FiEdit3 } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import TaskUpdateModal from '@/components/TaskUpdateModal';
import TaskDeleteModal from '@/components/TaskDeleteModal';
import Switcher from '@/Components/Switcher';
import dayjs from 'dayjs';
import utc   from 'dayjs/plugin/utc';

dayjs.extend(utc);

function Task({ id, title, body, open, order, begin, end, groupId }) {
  const [openTaskUpdateModal, setOpenTaskUpdateModal] = useState(false);
  const [openTaskDeleteModal, setOpenTaskDeleteModal] = useState(false);
  const [deleteProcess, setDeleteProcess] = useState(false);

  const { data, setData, put, processing, errors, reset, setDefaults } = useForm({
    id: id,
    title: title,
    body: body,
    open: open,
    begin_time: begin,
    end_time: end,
  });

  function closeUpdateModal() {
    if(!processing){
      setOpenTaskUpdateModal(false);
      reset();
    }
  }

  function OpenUpdateModal() {
    setDefaults({
      id: id,
      title: title,
      body: body,
      open: open,
      begin_time: begin,
      end_time: end,
    });
    setOpenTaskUpdateModal(true);
  }

  function submit(e) {
    e.preventDefault()
    put(`/tasks/${id}`, {
      preserveScroll: true,
      onSuccess: (page) => {
        setOpenTaskUpdateModal(false);
      },
    })
  }

  const deleteTask = () => {
    Inertia.delete(`/tasks/${id}`,{
      preserveScroll: true,
      onSuccess: () => setOpenTaskUpdateModal(false),
      onStart: () => setDeleteProcess(true),
      onFinish: () => setDeleteProcess(false),
    })
  }

  const toggleTaskOpen = (negOpen) => {
    Inertia.post(`/tasks/${id}/open`, {
        open: negOpen
      }, {
      preserveScroll: true,
      onSuccess: () => setData("open", negOpen)
    });
  }

  return (
    <>
      <div className="bg-indigo-200 p-1 rounded-md text-slate-800 shadow">
        <div className="flex justify-between text-xs font-bold">
          <div>
            <span>{begin && dayjs(begin).utc().format('HH:mm')}</span> - <span>{end && dayjs(end).utc().format('HH:mm')}</span>
          </div>
          <button onClick={() => OpenUpdateModal()}><FiEdit3 className="text-sm cursor-pointer" /></button>
        </div>
        <div className="text-md">{title}</div>
        <div className="flex items-center pt-1 justify-between text-xxs font-bold">
          <Switcher checked={open} setChecked={toggleTaskOpen}/>
          <button type='button' onClick={() => setOpenTaskDeleteModal(true)}>
            <MdDelete className='text-base text-red-700' />
          </button>
        </div>
      </div>
      <TaskUpdateModal
        isOpen={openTaskUpdateModal}
        closeModal={closeUpdateModal}
        data={data}
        setData={setData}
        submit={submit}
        errors={errors}
        processing={processing}
        reset={reset}
        deleteTask={deleteTask}
        setOpenTaskDeleteModal={setOpenTaskDeleteModal}
      />
      <TaskDeleteModal 
        isOpen={openTaskDeleteModal} 
        setIsOpen={setOpenTaskDeleteModal}
        deleteTask={deleteTask}
        deleteProcess={deleteProcess}
      />
    </>
  )
}

export default Task