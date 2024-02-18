import { useState, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);

  const addFile = (e) => {
    if (e.target.files[0]) {
      setAudioFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const audioSrc = audioContext.createMediaElementSource(
      document.getElementById("audioElement")
    );
    audioSrc.connect(analyser);
    analyser.connect(audioContext.destination);

    const bufferLength = analyser.frequencyBinCount;
    const dataArray1 = new Uint8Array(bufferLength);
    const dataArray2 = new Uint8Array(bufferLength);

    const draw1 = () => {
      const canvas = canvasRef1.current;
      const canvasCtx = canvas.getContext("2d");

      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;

      analyser.getByteTimeDomainData(dataArray1);

      canvasCtx.fillStyle = "rgb(0, 0, 0)";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = "rgb(0, 255, 0)";

      canvasCtx.beginPath();

      const sliceWidth = (WIDTH * 1.0) / bufferLength;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray1[i] / 128.0;
        const y = (v * HEIGHT) / 2;

        if (i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }

        x += sliceWidth;
      }

      canvasCtx.lineTo(canvas.width, canvas.height / 2);
      canvasCtx.stroke();

      requestAnimationFrame(draw1);
    };

    const draw2 = () => {
      const canvas = canvasRef2.current;
      const canvasCtx = canvas.getContext("2d");

      analyser.getByteFrequencyData(dataArray2);

      const WIDTH = canvas.width;
      const HEIGHT = canvas.height;
      const barWidth = WIDTH / 5;
      let barHeight;
      let x = 0;

      canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
          barHeight = dataArray2[i * 5 + j] / 2;

          const hue = (i * 5 + j) * 10;
          canvasCtx.fillStyle = `hsl(${hue}, 100%, 50%)`;
          canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

          x += barWidth;
        }
        x = i * barWidth;
      }

      requestAnimationFrame(draw2);
    };

    if (isPlaying) {
      draw1();
      draw2();
    }

    return () => {
      analyser.disconnect();
    };
  }, [isPlaying, audioFile]);

  const togglePlay = () => {
    const audioElement = document.getElementById("audioElement");

    if (!isPlaying) {
      audioElement.play();
    } else {
      audioElement.pause();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <div className="audio-controls">
        <audio id="audioElement" src={audioFile} />
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <input type="file" onChange={addFile} />
      </div>
      <canvas ref={canvasRef1} width="500" height="200"></canvas>
      <canvas ref={canvasRef2} width="500" height="200"></canvas>
    </>
  );
}

export default App;
