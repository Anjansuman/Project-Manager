import "./Blocks.css";

export function PlusBlock({ onAddBlock }) {

    return <button className = "addButton" onClick = {onAddBlock}>
        +
    </button>
}