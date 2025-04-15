import { useEffect, useRef, useState } from "react"
import { Sketch, Tool } from "../../../../../lib/Sketch";
import { ToolBar } from "../Components/ToolBar";
import { useParams } from "react-router-dom";


interface RoomCanvasProps {
    projectId: string,
    socket: WebSocket
}

export const RoomCanvas = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [sketch, setSketch] = useState<Sketch>();
    const [selectedTool, setSelectedTool] = useState<Tool>("circle");

    const { projectId } = useParams();

    useEffect(() => {

        if(!sketch) return;

        sketch.setTool(selectedTool);

    }, [sketch, selectedTool]);

    useEffect(() => {

        const canvas = canvasRef.current;
        // as of this will run twice so at first canvasRef will be null so at that time don't take access of the canvas
        if(!canvas) return;

        const resizeHandler = () => {
            // resizeCanvas(canvas, projectId?, socket);
            // if(!sketch) setSketch(new Sketch(canvas, projectId?, socket));
        }

        resizeHandler();
        window.removeEventListener("resize", resizeHandler);

        return () => {
            window.addEventListener("resize", resizeHandler);
            sketch?.destroy();
        }

    }, [canvasRef.current]);

    return <div className="h-full w-full ">
        <ToolBar />
        <canvas ref={canvasRef} height={"500"} width={"500"} className="bg-red-200"></canvas>
    </div>
}

function resizeCanvas(canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}