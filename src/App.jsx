import { useState, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioFile, setAudioFile] = useState(null);

  const initialArrayFirstRow = [
    { id: 0, isOn: false },
    { id: 1, isOn: false },
    { id: 2, isOn: false },
    { id: 3, isOn: false },
    { id: 4, isOn: false },
    { id: 5, isOn: true },
    { id: 6, isOn: false },
    { id: 7, isOn: false },
    { id: 8, isOn: true },
    { id: 9, isOn: false },
    { id: 10, isOn: false },
    { id: 11, isOn: false },
    { id: 12, isOn: false },
    { id: 13, isOn: true },
    { id: 14, isOn: true },
    { id: 15, isOn: true },
    { id: 16, isOn: false },
    { id: 17, isOn: false },
    { id: 18, isOn: false },
    { id: 19, isOn: false },
    { id: 20, isOn: true },
    { id: 21, isOn: false },
    { id: 22, isOn: true },
    { id: 23, isOn: false },
    { id: 24, isOn: false },
    { id: 25, isOn: true },
    { id: 26, isOn: false },
    { id: 27, isOn: true },
    { id: 28, isOn: false },
    { id: 29, isOn: false },
    { id: 30, isOn: false },
    { id: 31, isOn: false },
  ];
  const [itemsArrayFirstRow, setItemsArrayFirstRow] =
    useState(initialArrayFirstRow);

  const addFile = (e) => {
    if (e.target.files[0]) {
      setAudioFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Function to convert audio file to 32-element array
  // function convertAudioToArray(audioFilePath) {
  // Create an audio context
  //  const audioContext = new (window.AudioContext ||
  //    window.webkitAudioContext)();

  // Load the audio file
  //  const audioElement = new Audio(audioFilePath);
  //  const source = audioContext.createMediaElementSource(audioElement);

  // Create analyser node
  //  const analyser = audioContext.createAnalyser();
  //  analyser.fftSize = 64; // You may need to adjust this value for your needs

  // Connect the source to the analyser
  //  source.connect(analyser);
  //  analyser.connect(audioContext.destination);

  // Create an array to store the result
  //  const resultArray = [];

  // Function to update array based on audio data
  //  function updateArray() {
  //    const dataArray = new Uint8Array(analyser.frequencyBinCount);
  //    analyser.getByteFrequencyData(dataArray);

  // Clear previous result
  //    resultArray.length = 0;

  // Convert audio data to boolean values
  //    for (let i = 0; i < 32; i++) {
  //      const startIndex = i * (dataArray.length / 32);
  //      const endIndex = (i + 1) * (dataArray.length / 32);
  //      const average =
  //        dataArray.slice(startIndex, endIndex).reduce((a, b) => a + b, 0) /
  //        (endIndex - startIndex);
  //      resultArray.push({ id: i, value: average > 128 }); // Adjust the threshold as needed
  //    }

  // Log or do something with the result array
  //  }

  // Listen for audio playback to update the array
  //  audioElement.addEventListener("play", () => {
  //    setInterval(updateArray, 100); // Update the array every 100 milliseconds while playing
  //  });

  // Return the result array
  //  return resultArray;
  //}

  // Usage example
  // const audioFilePath = audioFile;
  //console.log(convertAudioToArray(audioFile));
  // const result = convertAudioToArray(audioFilePath);

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
    const dataArray3 = new Uint8Array(bufferLength);
    //    const threshold = 50;
    //    const simplifiedArray = dataArray1.map((element) => element > threshold);

    //  const outputArray = new Uint8Array(32);
    //  for (let i = 0; i < 1024; i++) {
    //    const index32 = Math.floor(i / 32); // Calculate the index in the 32-element array
    //    outputArray[index32] += dataArray3[i]; // Add the current element to the corresponding position in the output array
    //  }

    //  const booleanArray = [];

    //  for (let i = 0; i < 32; i++) {
    // Create an object with a unique ID and a boolean value corresponding to the Uint8Array value
    //    const element = {
    //      id: i,
    //      value: outputArray[i] !== 0, // Convert Uint8Array value to boolean
    //    };
    //    booleanArray.push(element);
    //  }

    //  console.log(booleanArray);

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
      const barWidth = (WIDTH / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      canvasCtx.fillStyle = "#000";
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray2[i];

        const hue = (i / bufferLength) * 360;
        canvasCtx.fillStyle = "hsl(" + hue + ", 100%, 50%)";
        canvasCtx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);

        x += barWidth + 1;
      }

      requestAnimationFrame(draw2);
    };

    const draw3 = () => {
      // This logic is similar to what was done in the previous code snippet to generate the 32-element array
      //  const bufferLength = analyser.frequencyBinCount;
      //  const dataArray3 = new Uint8Array(bufferLength);

      const booleanArray = [];

      //  function updateArray() {
      analyser.getByteFrequencyData(dataArray3);
      for (let i = 0; i < 32; i++) {
        const startIndex = i * (dataArray3.length / 32);
        const endIndex = (i + 1) * (dataArray3.length / 32);
        const average =
          dataArray3.slice(startIndex, endIndex).reduce((a, b) => a + b, 0) /
          (endIndex - startIndex);
        booleanArray.push({ id: i, value: average > 64 }); // Adjust the threshold as needed
      }
      //  }

      // Now use booleanArray for further processing or updating the state
      //  audioElement.addEventListener("play", () => {
      //    setInterval(updateArray, 100); // Update the array every 100 milliseconds while playing
      //  });

      // Update itemsArrayFirstRow based on sound intensity
      setItemsArrayFirstRow((prevArray) => {
        return prevArray.map((item, index) => {
          const intensity = booleanArray[index].value;
          if (item.id === booleanArray[index].id && intensity === true) {
            return {
              ...item,
              isOn: true,
            };
          } else {
            return { ...item, isOn: false };
          }
        });
      });
    };

    if (isPlaying) {
      draw1();
      draw2();
      draw3();
    }

    // Now use booleanArray for further processing or updating the state
    audioElement.addEventListener("play", () => {
      setInterval(draw3, 200); // Update the array every 200 milliseconds while playing
    });

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
      <div className="card">
        <div className="div-of-boxes-row">
          {itemsArrayFirstRow.map((element) => {
            const isFieldHighlighted = () => {
              return element.isOn
                ? "screen-two-box-correct"
                : "screen-two-box-incorrect";
            };

            return (
              <div
                key={element.id}
                className={isFieldHighlighted() + " screen-two-box"}
              ></div>
            );
          })}
        </div>
      </div>
      <div className="audio-controls">
        <audio id="audioElement" src={audioFile} />
        <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button>
        <input type="file" onChange={addFile} />
      </div>
      <canvas ref={canvasRef1} width="500" height="200"></canvas>
      <canvas ref={canvasRef2} width="500" height="500"></canvas>
    </>
  );
}

export default App;
