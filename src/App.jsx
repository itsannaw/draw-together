import { Route, Routes } from "react-router-dom";
import Board from "./pages/Board";
import HomePage from "./pages/HomePage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/board/:id" element={<Board />} />
      </Routes>
    </>
  );
};

export default App;
