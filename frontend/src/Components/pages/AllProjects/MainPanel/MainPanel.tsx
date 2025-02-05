import { useState } from "react";
import { Blocks } from "./Block/Blocks";
import { PlusBlock } from "./Block/PlusBlock";
// import { PlusBlockPanel } from "./Block/project_panel/PlusBlockPanel";


import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../Atoms/ThemeState";


export function MainPanel() {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    const [blocks, setBlocks] = useState<object[]>([]); // State to store blocks
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

    return <div className = "h-auto w-[70%] border rounded-[14px] p-[25.2px] m-[15px] "
        style = {{
            backgroundColor:  theme.dark_panel,
            borderColor: theme.gray_border
        }}
    >
        <div className = "h-[10vh] w[99.74%] border bg-[#653AD8] border-[#653AD8] rounded-[14px] mb-[25.2px] flex justify-around items-center text-white text-[30px] font-calibri cursor-pointer ">
            <div>Projects</div>
        </div>
        <div className={`flex flex-wrap ${(blocks.length > 3) ? 'justify-center' : ''}`}>
            <PlusBlock onAddBlock = {handleShowPanel}/>
            {/* {isPanelVisible && <PlusBlockPanel onAddBlock = {handleAddBlock} onClose = {handleClosePanel}/>} */}
            {/* as plus panel gets visible set the text bar to focus to make it more clean */}
            {renderBlock}
            {/* <Blocks/> */}
            {/* <Blocks/> */}
        </div>
    </div>
}
