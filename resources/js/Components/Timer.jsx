import React  from 'react';
import { Fragment }  from 'react';
import { Popover, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import utc   from 'dayjs/plugin/utc';


dayjs.extend(utc);

function Timer({strTime, label, onChangeTime }) {
  let time = dayjs(strTime).utc();

  function changeHour(hour) {
    onChangeTime(time.hour(hour).toString());
  }

  function changeMinute(minute) {
    onChangeTime(time.minute(minute).toString());
  }

  return (
    <div className='relative border-[1px] rounded-lg p-1 border-indigo-400 flex gap-1 items-center'>
      <div>
        <span className='text-base text-indigo-400 font-bold'>
          {label}
        </span>
      </div>
      <div className="flex gap-2 items-center">
        <Popover className="">
          <Popover.Button>{`${time.hour()}`.padStart(2, '0')}</Popover.Button>
          <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-9 left-0 z-10">
                <div className="grid grid-cols-6 w-40 p-1 bg-indigo-400 auto-cols-max gap-1 rounded-lg    ">
                  {[...Array(24).keys()].map((_, index) => {
                    return (
                      <Popover.Button onClick={() => changeHour(index)} className="text-center text-slate-50 text-sm" key={index}>
                        {`${index}`.padStart(2, '0')}
                      </Popover.Button>
                    );
                  })}
                </div>
              </Popover.Panel>
            </Transition>
        </Popover>
        <span>:</span>
        <Popover className="">
          <Popover.Button>{`${time.minute()}`.padStart(2, '0')}</Popover.Button>
          <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute top-9 left-0 z-10">
                <div className="grid grid-cols-10 w-60 p-2 bg-indigo-400 auto-cols-max gap-1 rounded-lg    ">
                  {[...Array(60).keys()].map((_, index) => {
                    return (
                      <Popover.Button onClick={() => changeMinute(index)} className="text-center text-slate-50 text-sm" key={index}>
                        {`${index}`.padStart(2, '0')}
                      </Popover.Button>
                    );
                  })}
                </div>
              </Popover.Panel>
            </Transition>
        </Popover>
      </div>
    </div>
  )
}

export default Timer