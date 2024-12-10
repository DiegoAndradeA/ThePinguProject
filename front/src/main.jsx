import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TaskContextProvider } from "./context/TaskContext.jsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TaskContextProvider>
      <BrowserRouter basename="/ThePinguProject">
        <App />
      </BrowserRouter>
    </TaskContextProvider>
  </StrictMode>
);
