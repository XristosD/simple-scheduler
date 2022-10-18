import React,  { useState, Fragment } from 'react'
import { FiEdit3 } from 'react-icons/fi';
import TaskUpdateModal from '@/components/TaskUpdateModal';
import Switcher from '@/Components/Switcher';
import dayjs from 'dayjs';

function Task({ id, title, body, open, order, begin, end, groupId }) {
  const [itemOpen, setItemOpen] = useState(open);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const setOpen = (open) => {
    setData('open', open);
  }

  return (
    <>
      <div className="bg-indigo-200 p-1 rounded-md text-slate-800 shadow">
        <div className="flex justify-between text-xs font-bold">
          <div>
            <span>{dayjs(begin).format('HH:mm')}</span> - <span>{dayjs(end).format('HH:mm')}</span>
          </div>
          <button onClick={() => setOpenUpdateModal(true)}><FiEdit3 className="text-sm cursor-pointer" /></button>
        </div>
        <div className="text-md">{title}</div>
        <div className="flex justify-end text-xxs font-bold">
          <Switcher checked={itemOpen} setChecked={setItemOpen} />
        </div>
      </div>
      <TaskUpdateModal 
        isOpen={openUpdateModal}
        setIsOpen={setOpenUpdateModal}
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