import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { TaskProvider } from "./context/TaskContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <TaskProvider>
    <Router>
      <App />
    </Router>
  </TaskProvider>
);
