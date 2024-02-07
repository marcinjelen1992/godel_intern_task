import { useState, useEffect, useRef } from "react";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [audioFile, setAudioFile] = useState();

  // const handleClick = () => {
  //   if (buttonName === "Play") {
  //    a.play();
  //     setButtonName("Pause");
  //   } else {
  //     a.pause();
  //     setButtonName("Play");
  //   }
  // };

  const initialArrayFirstRow = [
    { id: 1, isOn: false },
    { id: 2, isOn: false },
    { id: 3, isOn: false },
    { id: 4, isOn: false },
    { id: 5, isOn: false },
    { id: 6, isOn: false },
    { id: 7, isOn: false },
    { id: 8, isOn: false },
    { id: 9, isOn: false },
    { id: 10, isOn: false },
    { id: 11, isOn: false },
    { id: 12, isOn: false },
    { id: 13, isOn: false },
    { id: 14, isOn: false },
    { id: 15, isOn: false },
    { id: 16, isOn: false },
    { id: 17, isOn: false },
    { id: 18, isOn: false },
    { id: 19, isOn: false },
    { id: 20, isOn: false },
  ];

  const [itemsArrayFirstRow, setArrayFirstRow] = useState(initialArrayFirstRow);

  //const handleMoleRandomisation = (number1, number2, number3) => {
  //  setArrayFirstRow(
  //   itemsArrayFirstRow.map((element) => {
  //      if (
  //        element.id === number1 ||
  //        element.id === number2 ||
  //        element.id === number3
  //      ) {
  //        return { ...element, isMolePresent: true };
  //      } else {
  //        return { ...element, isMolePresent: false };
  //      }
  //    })
  //  );
  // };

  const addFile = (e) => {
    if (e.target.files[0]) {
      setAudioFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const audioRef = useRef();

  const handleAudioPlay = () => {
    let audioContext = new AudioContext();
    if (!source.current) {
      source.current = audioContext.createMediaElementSource(audioRef.current);
      analyzer.current = audioContext.createAnalyzer();
      source.current.connect(analyzer.current);
      analyzer.current.connect(audioContext.destination);
    }
    visualizeData();
  };

  return (
    <>
      <h1>Music Player</h1>
      <div className="card">
        <div className="div-of-boxes-row">
          {itemsArrayFirstRow.map((element) => {
            const isFieldHighlighted = () => {
              if (element.isOn === true) {
                return "screen-two-box-correct ";
              } else {
                return "screen-two-box-incorrect ";
              }
            };

            return (
              <div
                id={element.id}
                className={isFieldHighlighted() + "screen-two-box"}
              ></div>
            );
          })}
        </div>
        <div className="audio-controls">
          <audio
            ref={audioRef}
            onPlay={handleAudioPlay}
            src={audioFile}
            controls
          ></audio>
          <input type="file" onChange={addFile} />
        </div>
      </div>
    </>
  );
}

export default App;
