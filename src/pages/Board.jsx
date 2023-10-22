import { Tldraw } from "@tldraw/tldraw";
import "@tldraw/tldraw/tldraw.css";
import { useCallback, useEffect, useState } from "react";
import { createConsumer } from "@rails/actioncable";
const URL = "ws://localhost:3000/cable";

const Board = () => {
  // Храним снимок в состоянии
  const [editor, setEditor] = useState(null);
  const editorEventHandler = useCallback(
    (event, channel) => {
      if (event.name === "pointer_up") {
        const snapshot = editor.store.getSnapshot();
        channel.send_json(snapshot);
        console.log(channel);
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
          username: "cool_kid_20",
        },
        {
          connected: () => {
            console.log("connected");
          },
          disconnected: () => {
            console.log("disc");
          },
          send_json(data) {
            console.log(data);
            this.perform("send_json", data);
          },
          received: (data) => {
            console.log(data, "test");
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
  }, [editor, editorEventHandler]);

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
