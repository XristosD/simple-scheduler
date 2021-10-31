import React, { useState, useContext } from "react";
import { DateTime } from "luxon";
import Calendar from "./components/calendar/Calendar";
import Scheduler from "./components/scheduler/Scheduler";

import "./App.css";

export const SchedulerContext = React.createContext();

function App() {
  const [schedulingDay, setSchedulingDay] = useState({
    day: DateTime.now().day,
    month: DateTime.now().month,
    year: DateTime.now().year,
  });

  return (
    <SchedulerContext.Provider value={{ setSchedulingDay }}>
      <Calendar />
      <Scheduler {...schedulingDay} />
    </SchedulerContext.Provider>
  );
}

export default App;
