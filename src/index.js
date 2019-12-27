import Peer from "peerjs";

let peer = new Peer();

document.writeln(`
  <pre>
    Callee / P2P (Peer-To-Peer) Video/Voice Calls in you browser.
  </pre>
`);

peer.on("open", id => {
  document.writeln("ID:", id, "<br>");
  const callTo = prompt('Enter id to call to (answer "n" to receive)', "n");
  if (callTo !== "n") document.writeln("Calling to", callTo, "<br>");
});
