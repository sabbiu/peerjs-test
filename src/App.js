import { useState, useEffect } from "react";
import Peer from "peerjs";
import * as Automerge from "@automerge/automerge";

function App() {
  const [peer, setPeer] = useState();
  const [userId, setUserId] = useState("");
  const [doc, setDoc] = useState(() => Automerge.init());
  console.log(doc);

  useEffect(() => {
    const newPeer = new Peer();

    newPeer.on("open", () => setPeer(newPeer));
    newPeer.on("connection", function (conn) {
      conn.on("data", function (data) {
        // Will print 'hi!'
        console.log(data);
      });
    });

    return () => newPeer.destroy();
  }, []);

  function callMe() {
    const conn = peer.connect(userId);
    conn.on("open", function () {
      // here you have conn.id
      conn.send("hi!");
    });
  }

  return (
    <div className="App">
      {peer ? (
        <div>
          <p>lorem ipsums lakdfj lsadk fljksd flksjdf</p>
          <pre>{peer.id}</pre>
          <input value={userId} onChange={(e) => setUserId(e.target.value)} />
          <button onClick={callMe}>Submit</button>
        </div>
      ) : (
        <div>sup</div>
      )}
    </div>
  );
}

export default App;
