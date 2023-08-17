import { Route, Routes } from "react-router-dom";
import { Analytics, Board, Menubar } from "./components";

const App = () => {
  return (
    <div className="flex gap-2">
      <Menubar />

      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </div>
  );
};

export default App;
