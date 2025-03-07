import { FileIcon } from "../SVGs/FileIcon";



export const FileTypeLogos = ({ name, size }: { name: string, size: string }) => {

    // this will give the file typing
    const type = name.split('.')[name.length - 1];

    switch (type) {
        case 'ts':
            <div>
                ts logo
            </div>
            break;
        case 'js':
            <div>
                js logo
            </div>
            break;
        case 'html':
            <div>
                html logo
            </div>
            break;
        case 'css':
            <div>
                css logo
            </div>
            break;
        case 'jsx':
            <div>
                jsx logo
            </div>
            break;
        case 'tsx':
            <div>
                tsx logo
            </div>
            break;
        case 'json':
            <div>
                json logo
            </div>
            break;
        case 'md':
            <div>
                README.md logo
            </div>
            break;
        case 'sol':
            <div>
                Solidity logo
            </div>
            break;
        case 'cpp':
            <div>
                C++ logo
            </div>
            break;
        case 'c':
            <div>
                C logo
            </div>
            break;
        case 'java':
            <div>
                Java logo
            </div>
            break;
        case 'py':
            <div>
                Python logo
            </div>
            break;
        default:
            <FileIcon color={'gray'} size={'20px'} />
            break;
    }
}