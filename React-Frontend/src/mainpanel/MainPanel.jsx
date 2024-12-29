import React, { useState } from "react";
import { Blocks } from "./Blocks";
import { PlusBlock } from "./PlusBlock";
import { PlusBlockPanel } from "./PlusBlockPanel";
import "./MainPanel.css";


export function MainPanel() {

    const [blocks, setBlocks] = useState([]); // State to store blocks
    const [isPanelVisible, setIsPanelVisible] = useState(false); // State to make panel visible

    function handleAddBlock() {
        setBlocks([{}, ...blocks]);
        setIsPanelVisible(false); // this will hide the panel after adding the block
    }

    // function to show panel
    function handleShowPanel() {
        setIsPanelVisible(true);
    }

    // function to close panel without adding a block
    function handleClosePanel() {
        setIsPanelVisible(false);
    }

    const renderBlock = blocks.map(() => (<Blocks/>));

    // it is used for conditional styling for blocks 
    const containerClass = {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: blocks.length > 3 ? "center" : ""
    }

    return <div className = "panel">
        <div className = "title">
            <div>Projects</div>
        </div>
        <div style = {containerClass}>
            <PlusBlock onAddBlock = {handleShowPanel}/>
            {isPanelVisible && <PlusBlockPanel onAddBlock = {handleAddBlock} onClose = {handleClosePanel}/>}
            {renderBlock}
        </div>
    </div>
}