import "./MenuBar.css";
import { useState } from "react";
import { MenuBarPanel } from "./MenuBarPanel";
import { AddMemberPanel } from "./AddMemberPanel";

import { useRecoilValue } from "recoil";
import { Theme_State } from "../Atoms/Theme_State";

export function MenuBar() {

    const theme_state = useRecoilValue(Theme_State);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;
    
    const [isMenuPanelVisible, setIsMenuPanelVisible] = useState(false);
    const [isMemPanelVisible, setIsMemPanelVisible] = useState(false);

    function handleMenuPanel() {
        setIsMenuPanelVisible(prev => !prev);
    }
    function handleAddMember() {
        setIsMemPanelVisible(true);
        setIsMenuPanelVisible(false);
    }

    function handleMemberDetails() {
        setIsMemPanelVisible(false);
    }

    function Cancel() {
        setIsMemPanelVisible(false);
    }

    return <>
    <div className = "hamburger"
        style={{
            backgroundColor:  theme.dark_panel,
            borderBottom: '1px solid',
            borderBottomColor: theme.gray_border,
        }}
        onClick = {handleMenuPanel}>
        <div className = "barContainer">
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
        </div>
    </div>
    {isMenuPanelVisible && <MenuBarPanel AddMember = {handleAddMember}/>}
    {isMemPanelVisible && <AddMemberPanel Done = {handleMemberDetails} Cancel = {Cancel}/>}
    </>
}

// remove the add member panel and button as this website adds any member e-mailing them a organization's code
// and we head of the organization need to accept that person after the member accepted the code
// and then only the person can become the member of the organization.

// Or we can do this as by making an JWT token, and the token will contain 
// Organizaiton's name and e-mail of the person who is joining the organization
// so, this will work as JWT will get verified, so that no other person can join the organization.