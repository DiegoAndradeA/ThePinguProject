import React from "react";
import ReactDOM from "react-dom/client";
import {Greeting} from './Greeting'
import {Button} from './Button'
import {TaskCard} from './Task'

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <div>
    <Greeting title='hola' a = {[1,2,3]}/>
    <Button text = 'click me'/>
    <TaskCard/>
  </div>
);
