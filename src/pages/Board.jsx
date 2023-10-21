import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import jsonSnapshot from "./snapshot.json";

const Board = () => {
  return (
    <div style={{ position: "fixed", inset: 0 }}>
      <Tldraw snapshot={jsonSnapshot} />
    </div>
  );
};

export default Board;
