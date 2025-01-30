import React, { useState } from "react";
import "./ImageInput.css";

export function ImageInput() {
    const [FileName, setFileName] = useState(null);

    function handleFileChange(event) {
        const file = event.target.files[0];
        if(file) {
            setFileName(file.name);
        }
    }

    return <div className="image-input-container">
        <input type="file" accept= "image/*" id="fileInput" className="hidden-file-input" onChange={handleFileChange}/>
        <label htmlFor="fileInput" className="custom-file-button">
            +
        </label>
    </div>
}