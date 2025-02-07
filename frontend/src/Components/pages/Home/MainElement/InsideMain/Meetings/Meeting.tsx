import video_cam from "../../../../../ui/Images/video_cam.png";
import "./Meeting.css";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../../Atoms/ThemeState";

export const Meeting = () => {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div className="img-container-animation h-[100%] w-[100%] border-2 rounded-3xl flex justify-center items-center cursor-pointer overflow-hidden"
        style={{ borderColor: theme.dark_border }}
    >
        <div className="">
            <img src={video_cam} alt="" className="h-28 relative img-animation" onSelect={undefined}/>
        </div>
        <div>
            <div className="light h-[260px] w-[160px] flex items-center absolute left-[156.74px] top-[63.5px]">
                <div className="meetings text-white font-bold text-3xl ml-2">Meetings</div>
            </div>
        </div>
    </div>
}

// in meeting section you can add something like, if a meeting is scheduled or already running it will show the buttons to join meeting and all instead of cam image.
// And if any meeting is not going on, on clicking on it it open a panel to start or schedule a meeting.