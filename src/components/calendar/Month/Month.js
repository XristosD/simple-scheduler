import React, { useState, useEffect, useContext } from "react";
import { Info } from "luxon";
import { fetchFullnessData } from "../../../api/calendar";
import { SchedulerContext } from "../../../App";

import "./month.css";

const Month = ({ year, month, startingWeekday, days }) => {
  const [fullnessData, setFullnessData] = useState({});

  const { setSchedulingDay } = useContext(SchedulerContext);

  useEffect(() => {
    setTimeout(() => {
      setFullnessData(fetchFullnessData());
      // console.log(fullnessData);
    }, 500);
  }, []);

  const daysArray = () => {
    const tmpArr = [];
    for (let i = 0; i < 42; i++) {
      if (i >= startingWeekday - 1 && i < startingWeekday + days - 1) {
        tmpArr[i] = i - startingWeekday + 2;
      } else {
        tmpArr[i] = null;
      }
    }
    return tmpArr;
  };

  return (
    <div className="month">
      <header className="header">
        <span>
          {Info.months("long")[month - 1]} '{String(year).slice(-2)}
        </span>
      </header>
      <section className="weekdays-container">
        {Info.weekdays("narrow").map((day, index) => (
          <div className="weekday" key={index}>
            {day}
          </div>
        ))}
      </section>
      <main className="days-container">
        {daysArray().map((i, index) => {
          return (
            <button
              key={index}
              className={`single-day 
                ${fullnessData?.[i] === "full" && "full"}
                ${fullnessData?.[i] === "not_full" && "not_full"}
              `}
              onClick={() => {
                console.log(i);
                i && setSchedulingDay({ day: i, month: month, year: year });
              }}
            >
              <span>{i}</span>
            </button>
          );
        })}
      </main>
    </div>
  );
};

export default Month;
