import React, { useState } from "react";
import "./ProjectLogoInput.css";

export function ProjectLogoInput() {
    const [FileName, setFileName] = useState(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        if(file) {
            setFileName(file.name);
        }
    }

    return <div className="project-image-input-container">
        <input type="file" accept= "image/*" id="fileInput" className="project-image-input" onChange={handleFileChange}/>
        <label htmlFor="fileInput" className="project-image-file-button">
            +
        </label>
    </div>
}