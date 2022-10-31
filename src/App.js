import { useState, useEffect } from "react";
import Peer from "peerjs";
import { useAutomerge } from "./useAutomerge";
import Automerge from "automerge";

function App() {
  const [peer, setPeer] = useState();
  const [userId, setUserId] = useState("");
  const [doc, updateDoc, setDoc] = useAutomerge({
    users: [],
    tickets: [],
  });

  useEffect(() => {
    sendData(Automerge.save(doc));
  }, [doc]);

  useEffect(() => {
    updateDoc((draft) => {
      draft.users = ["sabbiu"];
    });
  }, []);

  const sendAutomergeData = () => {
    console.log("sending...");
    updateDoc((draft) => {
      let sup = [...doc.users, "newuser"];
      console.log(sup);
      draft.users = sup;
    });
  };

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on("open", () => setPeer(newPeer));
    newPeer.on("connection", function (conn) {
      conn.on("data", function (data) {
        // Will print 'hi!'
        console.log(data);
        if (data && data !== "hi") {
          const newDoc = Automerge.merge(doc, Automerge.load(data));
          setDoc(newDoc);
        }
      });
    });

    return () => newPeer.destroy();
  }, []);

  function sendData(data) {
    if (!peer) return;

    const conn = peer.connect(userId);
    conn.on("open", function () {
      // here you have conn.id
      conn.send(data);
    });
  }

  return (
    <div className="App">
      {peer ? (
        <div>
          <p>lorem ipsums lakdfj lsadk fljksd flksjdf</p>
          <pre>{peer.id}</pre>
          <input value={userId} onChange={(e) => setUserId(e.target.value)} />
          <button onClick={() => sendData("hi")}>Submit</button>
          <pre>{doc.users}</pre>
          <button onClick={() => sendAutomergeData()}>Send Data</button>
        </div>
      ) : (
        <div>sup</div>
      )}
    </div>
  );
}

export default App;
