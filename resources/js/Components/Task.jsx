import React,  { useState, Fragment, useEffect } from 'react'
import { FiEdit3 } from 'react-icons/fi';
import TaskUpdateModal from '@/components/TaskUpdateModal';
import Switcher from '@/Components/Switcher';
import dayjs from 'dayjs';

function Task({ id, title, body, open, order, begin, end, groupId }) {
  const [taskOpen, setTaskOpen] = useState(open);
  const [openTaskUpdateModal, setOpenTaskUpdateModal] = useState(false);

  useEffect(() => {
    setTaskOpen(open);
  }, [open])

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
          <Switcher checked={taskOpen} setChecked={setTaskOpen} />
        </div>
      </div>
      <TaskUpdateModal 
        isOpen={openTaskUpdateModal}
        setIsOpen={setOpenTaskUpdateModal}
        id={id}
        title={title}
        body={body}
        open={open}
        begin={begin}
        end={end}
      />
    </>
  )
}

export default Task