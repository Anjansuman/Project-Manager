import { useState } from "react";
import { PlusIcon } from "../SVGs/PlusIcon";


interface ImageInputProps {
    bg: string,
    h: string,
    w: string,
    border?: string,
    hoverBorder?: string,
}

export function ImageInput({ bg, h, w, hoverBorder }: ImageInputProps) {
    const [fileName, setFileName] = useState<string | null>(null);

    function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
        const files = event.target.files;
        if (files && files[0]) {
            setFileName(files[0].name);
        }
    }

    return (
        <div className="relative inline-block m-0 mr-10 bg-[#653AD847] p-1 rounded-xl "
            style={{
                width: w,
                height: h
            }}
        >
                <input
                    type="file"
                    accept="image/*"
                    id="fileInput"
                    className="opacity-0 absolute z-[-1] w-0 h-0"
                    onChange={handleFileChange}
                />
                <label
                    htmlFor="fileInput"
                    className="h-full w-full flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 text-2xl font-bold cursor-pointer transition duration-300 ease-in-out shadow-lg"
                    style={{
                        backgroundColor: bg,
                        transition: "border-color 0.3s ease-in-out",
                    }}
                >
                    <PlusIcon color={"white"} size={'35'} />
                </label>
                {fileName && (
                    <span className="block mt-2 text-sm text-gray-500">{fileName}</span>
                )}
        </div>
    );
}
