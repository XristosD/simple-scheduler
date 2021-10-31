import React, { useState, useEffect } from "react";
import { Info } from "luxon";
import { fetchFullnessData } from "../../../api/calendar";

import "./month.css";

const Month = ({ year, month, startingWeekday, days }) => {
  const [fullnessData, setFullnessData] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setFullnessData(fetchFullnessData());
      console.log(fullnessData);
    }, 500);
  }, []);

  const daysArray = () => {
    return [
      ...Array(startingWeekday - 1),
      ...[...Array(days + 1).keys()].slice(1),
      ...Array(43 - startingWeekday - days),
    ];
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
