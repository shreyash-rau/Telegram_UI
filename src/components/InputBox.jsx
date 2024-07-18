




import React, { useState } from 'react'
import { useTheme } from './context/ThemeContext'

function InputBox() {

    const {theme} = useTheme();
    const [input, setInput] = useState("");


  return (
    <>
    <div
      className={` p-2 d-flex justify-content-between align-items-center  ${
        theme === "dark" ? "custom-input-dark text-white" : "bg-white"
      } col-12 col-lg-8 ms-auto rounded-3`}
    >
      <div className="d-flex align-items-center flex-grow-1">
        <i className="bi bi-emoji-smile"></i>
        <input
          type="text"
          placeholder="Message"
          className="input-field ms-2 border-0 flex-grow-1 bg-transparent"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {input ? (
        <i className="bi bi-send-fill"></i>
      ) : (
        <div className="d-flex">
          <i className="bi bi-paperclip mx-2"></i>
          <i className="bi bi-camera mx-2"></i>
        </div>
      )}
    </div>
    </>

  )
}

export default InputBox;







