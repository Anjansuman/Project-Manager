import sendMessageIcon from "./send-message.png";
import React, { useState } from "react";
import "./PlusBlockPanel.css";
import { ProjectLogoInput } from "./ProjectLogoInput";
import { DoneButton } from "./DoneButton";
import { LottieButton } from "./LottieButton";

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
        <div style={{display: "flex"}}>
            <ProjectLogoInput/>

            <button onClick = {onClose} className = "cancel">x</button>

            <div style={{color: "white", position: "relative", top: 6.5}}> {/*marginTop: 31.5*/}
                <div>Project Title</div>
                <input type="text" placeholder="Project Title" className="inputField"/>
                {/*this div will only appear if another project has same name*/}
                {/* true or false will get changed simultaneously in both styling and text */}
                <div style = {{color: false ? "red" : "green"}}>
                    {false ? "(x sign) This title already exists." : "(tick sign) Available."}
                </div>
            </div>

            <div style = {{color: "white", position: "relative", top: 6.5}}>
                <div>Deadline</div>
                <div style = {{display: "flex"}} className="deadline-container">
                    <div className="day">DD</div>
                    
                    <div style = {{position: "relative"}} className="colon-container">
                        <div className="colon"></div>
                        <div className="colon"></div>
                    </div>

                    <div className="month">MM</div>

                    <div style = {{position: "relative"}} className="colon-container">
                        <div className="colon"></div>
                        <div className="colon"></div>
                    </div>

                    <div className="year">YY</div>
                </div>
            </div>

        </div>

        <div style = {{color: "white"}}>
            <div style = {{display: "flex"}}>
                <div>
                    Project description
                </div>
                <div style = {{color: "red"}}>
                    {true ? "(cross sign) Project description cannot be empty." : ""}
                </div>
            </div>
            <textarea name="" id="" className="project-description" placeholder="Write a brief description of this project."></textarea>
        </div>

        {/* this is for chosing a leader */}
        <div>
            <div style = {{color: "white"}}>Leader</div>
            <input type="text" className="search-member" placeholder="search"/>
            {/* if the leader is selected, show leader's name in the search bar */}
            <div className="drop-down-button">
                <div className="drop-down-arrow-left"></div>
                <div className="drop-down-arrow-right"></div>
            </div>
        </div>

        {/* this is for adding members */}
        <div>
            <div style = {{color: "white"}}>Add members</div>
            <input type="text" className="search-member" placeholder="search"/>
            <div className="drop-down-button">
                <div className="drop-down-arrow-left"></div>
                <div className="drop-down-arrow-right"></div>
            </div>
        </div>

        <div className="added-members-container">
            {/* show the added members in this project with this styling */}
            <div className="added-members-name">Anjan Suman</div>
            <div className="added-members-cross-container">
                <div className="added-members-cross">+</div>
            </div>
        </div>
        
        <div style = {{display: "flex", justifyContent: "center"}}>
            <DoneButton/>
            {/* <LottieButton/> */}
        </div>

    </div>

}

/*
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
*/