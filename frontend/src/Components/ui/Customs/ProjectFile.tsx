import { FolderIcon } from "../SVGs/FolderIcon"


export const ProjectFile = () => {
    return <div className="h-20 w-90 bg-[#653AD847] p-1 rounded-xl mr-3 mb-3 cursor-pointer">
        <div className="h-full w-full bg-[#653AD847] py-1 px-3 rounded-xl mr-3 mb-3 flex items-center">
            <div className="text-white ">
                <FolderIcon color={'gray'} size={'25'} />
            </div>
            <div className="h-[80%] w-[1px] bg-[gray] rounded-xl mx-3"></div>
            <div className="h-full w-full flex items-center justify-start text-lg hover:text-[gray] transition-colors duration-300 ease-in-out font-semibold">
                hellow this is a folder
            </div>
        </div>
    </div>
}