import "./DoneButton.css";

export  function DoneButton() {
    return (
        <button 
            className="done-button"
            onMouseDown={(e) => {
                e.target.style.backgroundColor = "#1e7e34";
                e.target.style.transform = "scale(0.98)";
            }}
            onMouseUp={(e) => {
                e.target.style.backgroundColor = "#218838";
                e.target.style.transform = "scale(1.05)";
            }}>
            Done
        </button>
    );
};
