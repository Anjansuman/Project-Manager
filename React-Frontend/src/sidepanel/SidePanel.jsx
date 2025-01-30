import "./SidePanel.css";
import React, { useState } from "react";
import { SearchButton } from "./SearchButton";
import { Members } from "./Members";

import { useRecoilValue } from "recoil";
import { Theme_State } from "../Atoms/Theme_State";

export function SidePanel() {


    const theme_state = useRecoilValue(Theme_State);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div className = "sidePanel"
        style={{
            backgroundColor: theme.dark_border,
            borderColor: theme.gray_border,
        }}
    >
        <SearchButton/>
        <Members/>
    </div>
}