import { Route, Routes } from "react-router-dom";
import { Board, Menubar } from "./components";

const App = () => {
  return (
    <div className="flex gap-2">
      <Menubar />

      <Routes>
        <Route path="/" element={<Board />} />
      </Routes>
    </div>
  );
};

export default App;
