import React from "react";
import ReactDOM from "react-dom/client";
import {Greeting} from './Greeting'
import {Button} from './Button'

const root = ReactDOM.createRoot(document.getElementById("root"));



root.render(
  <div>
    <Greeting title='hola' a = {[1,2,3]}/>
    <Greeting a = {[1,2,3]}/>
    <Greeting />
    <Button text = 'click me'/>
    <Button text = 'feo'/>
    <Button text = 'click me'/>
  </div>
);
