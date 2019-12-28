import Peer from "peerjs";

let myMediaStream;

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

if (navigator.getUserMedia) {
  navigator.getUserMedia({ audio: true, video: { width: 800, height: 600 } },
    (stream) => {
      myMediaStream = stream;
    },
    (err) => {
      document.writeln("The following error occurred: " + err.name);
    }
  );
} else {
  document.writeln("getUserMedia not supported");
}


let peer = new Peer();

document.writeln(`
  <pre>
    Callee / P2P (Peer-To-Peer) Video/Voice Calls in you browser.
  </pre>
`);


let video = document.createElement('video');

peer.on("open", id => {
  document.writeln("ID:", id, "<br>");
  StartCall();
});

peer.on('call', (call) => {
  document.writeln("<b>Call Incoming!!!</b>", call.toString());
  call.answer(myMediaStream);
  call.on('stream', (stream) => {
    // `stream` is the MediaStream of the remote peer.
    // Here you'd add it to an HTML video/canvas element.
    video.srcObject = stream;
    video.onloadedmetadata =  (e) => {
      video.play();
    };
  });
});

let StartCall = () => {
  const callTo = prompt('Enter id to call to (answer "n" to receive)', "n");
  if (callTo !== "n") {
    document.writeln("Calling to", callTo, "<br>");
    let call = peer.call(callTo, myMediaStream);
    document.writeln("Call", call.toString(), "<br>");
  }
}
