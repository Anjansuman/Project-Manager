import { Notification_Tile } from "./Notification_Tile/Notification_Tile";

export const Notification = () => {

    return <div className="h-[100%] w-[100%] border-2 border-[#653AD8] rounded-3xl overflow-hidden px-1">
        <Notification_Tile/>
        <Notification_Tile/>
        <Notification_Tile/>

        <div className="h-10 w-[100%] mt-2 flex justify-center items-center">
            <div className="h-10 w-20 bg-[#653AD847] rounded-b-xl rounded-t-sm shadow-lg flex justify-center items-center cursor-pointer">
                <div className="h-[34px] w-[74px] bg-[#653AD847] rounded-b-xl rounded-t-sm shadow-lg flex justify-center items-center hover:bg-[#653AD880]"
                    style={{
                        transition: 'background-color 0.4s ease'
                    }}
                >
                    <div className="rotate-90">
                        <div className="h-1 w-2.5 bg-white rotate-45"></div>
                        <div className="h-1 w-2.5 bg-white -rotate-45"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}