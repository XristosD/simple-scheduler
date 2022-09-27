import React from 'react'
import GroupItem from './GroupItem';

function Group() {
  return (
    <div className="w-44 border-2 pb-10 rounded-lg border-indigo-500">
      <div className="border-b-2 text-center bg-indigo-200 border-indigo-500 rounded-t-lg text-indigo-900">Group Title</div>
      <div className="p-1 flex flex-col gap-1 shadow-inner">
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
      </div>
    </div>
  )
}

export default Group