import { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export function TaskContextProvider(props) {

  // useEffect(() => {
  //   setTasks(data);
  // }, []);

  return (
    <TaskContext.Provider>
      {props.children}
    </TaskContext.Provider>
  );
}
