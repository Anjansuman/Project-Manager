import sendMessageIcon from "./send-message.png";
import React, { useState } from "react";
import "./Blocks.css";

export function PlusBlockPanel({ onAddBlock, onClose }) {

    const [inputContent, setInputContent] = useState("");

    function handleChange(event) {
        setInputContent(event.target.value);
    }
    
    function handleSubmit() {
        if(inputContent.trim()) {
            onAddBlock(inputContent);
            setInputContent(""); // this will make the input field empty after closing it
        }
    }

    function handleKeyDown(event) {
        if(event.key == "Enter") {
            handleSubmit();
        }
    }

    return <div className = "plusBlockPanel">
        <div className = "divContainer">
            <input 
                type="text"
                value = {inputContent}
                onChange = {handleChange}
                placeholder="Enter block content"
                className = "inputField"
                onKeyDown={handleKeyDown}/>
            <button onClick = {handleSubmit} className = "add">
                <img src={sendMessageIcon} alt="Send" className = "sendMessageIcon"/>
            </button>
        </div>
        <button onClick = {onClose} className = "cancel">x</button>
    </div>

}