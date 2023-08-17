import { Route, Routes } from "react-router-dom";
import { Analytics, Board, Menubar } from "./components";

const App = () => {
  return (
    <div className="flex gap-2">
      <Menubar />
      <div className="w-[calc(100% - 4rem)] ms-16 me-5">
        <Routes>
          <Route path="/" element={<Board />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
