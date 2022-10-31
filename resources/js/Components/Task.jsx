import React,  { useState, Fragment, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useForm } from '@inertiajs/inertia-react';
import { FiEdit3 } from 'react-icons/fi';
import TaskUpdateModal from '@/components/TaskUpdateModal';
import Switcher from '@/Components/Switcher';
import dayjs from 'dayjs';

function Task({ id, title, body, open, order, begin, end, groupId }) {
  const [openTaskUpdateModal, setOpenTaskUpdateModal] = useState(false);

  const { data, setData, put, processing, errors, reset, setDefaults } = useForm({
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
      onSuccess: () => setOpenTaskUpdateModal(false),
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
            <span>{begin && dayjs(begin).format('HH:mm')}</span> - <span>{end && dayjs(end).format('HH:mm')}</span>
          </div>
          <button onClick={() => setOpenTaskUpdateModal(true)}><FiEdit3 className="text-sm cursor-pointer" /></button>
        </div>
        <div className="text-md">{title}</div>
        <div className="flex justify-end text-xxs font-bold">
          <Switcher checked={open} setChecked={toggleTaskOpen}/>
        </div>
      </div>
      <TaskUpdateModal
        isOpen={openTaskUpdateModal}
        setIsOpen={setOpenTaskUpdateModal}
        data={data}
        setData={setData}
        submit={submit}
        errors={errors}
        processing={processing}
        reset={reset}
      />
    </>
  )
}

export default Task