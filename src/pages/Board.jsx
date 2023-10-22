import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useCallback, useEffect, useState } from "react";
import { createConsumer } from "@rails/actioncable";
import { useParams } from "react-router-dom";
const URL = "ws://localhost:3000/cable";

const Board = () => {
  // Храним снимок в состоянии
  const [editor, setEditor] = useState(null);
  const params = useParams();
  const editorEventHandler = useCallback(
    (event, channel) => {
      if (event.name === "pointer_up") {
        const snapshot = editor.store.getSnapshot();
        channel.send_json(snapshot);
      }
    },
    [editor]
  );

  useEffect(() => {
    console.log(editor);

    if (editor) {
      const consumer = createConsumer(URL);
      console.log("123");

      const boardChannel = consumer.subscriptions.create(
        {
          channel: "BoardChannel",
          id: params.id,
        },
        {
          connected: () => {
            console.log("connected");
          },
          disconnected: () => {
            console.log("disc");
          },
          send_json(data) {
            this.perform("send_json", { data, id: params.id });
          },
          received: (data) => {
            if (data instanceof Object) {
              editor.store.loadSnapshot(data);
            }
          },
        }
      );
      editor.on("event", (e) => editorEventHandler(e, boardChannel));
      return () => {
        consumer.disconnect();
      };
    }
  }, [editor, editorEventHandler, params]);

  const onDrawMount = useCallback((instance) => {
    setEditor(instance);
  }, []);

  return (
    <>
      <div style={{ position: "fixed", inset: 0 }}>
        <Tldraw onMount={onDrawMount} />
      </div>
    </>
  );
};

export default Board;
