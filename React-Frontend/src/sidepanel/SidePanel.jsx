import "./SidePanel.css";
import React, { useState } from "react";
import { SearchButton } from "./SearchButton";
import { Members } from "./Members";

export function SidePanel() {

    return <div className = "sidePanel">
        <SearchButton/>
        <Members/>
    </div>
}