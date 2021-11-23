import React from "react";
import { DateTime, Info } from "luxon";
import Group from "./Group/Group";

import "./scheduler.css";

const Scheduler = ({ day, month, year }) => {
  const schedulingDay = DateTime.local(year, month, day);

  return (
    <div className="scheduler">
      <header>
        <div>{Info.weekdays()[schedulingDay.weekday - 1]}</div>
        <div>{schedulingDay.toFormat("dd/MM/yyyy")}</div>
      </header>
      <main className="group-container">
        <Group />
      </main>
    </div>
  );
};

export default Scheduler;
