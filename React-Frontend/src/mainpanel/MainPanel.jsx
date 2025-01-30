import React, { useState } from "react";
import { Blocks } from "./block/Blocks";
import { PlusBlock } from "./block/PlusBlock";
import { PlusBlockPanel } from "./block/project_panel/PlusBlockPanel";
import "./MainPanel.css";


import { useRecoilValue } from "recoil";
import { Theme_State } from "../Atoms/Theme_State";


export function MainPanel() {


    const theme_state = useRecoilValue(Theme_State);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


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


    return <div className = "h-auto w-[70%] border rounded-[14px] p-[25.2px] m-[15px] "
        style = {{
            backgroundColor:  theme.dark_panel,
            borderColor: theme.gray_border
        }}
    >
        <div className = "h-[10vh] w[99.74%] border bg-[#653AD8] border-[#653AD8] rounded-[14px] mb-[25.2px] flex justify-around items-center text-white text-[30px] font-calibri cursor-pointer ">
            <div>Projects</div>
        </div>
        <div style = {containerClass}>
            <PlusBlock onAddBlock = {handleShowPanel}/>
            {isPanelVisible && <PlusBlockPanel onAddBlock = {handleAddBlock} onClose = {handleClosePanel}/>}
            {/* as plus panel gets visible set the text bar to focus to make it more clean */}
            {renderBlock}
            {/* <Blocks/> */}
            {/* <Blocks/> */}
        </div>
    </div>
}
