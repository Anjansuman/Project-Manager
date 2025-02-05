import image from "./Anjan.jpg";
import "./Profile.css";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../../Atoms/ThemeState";

export const Profile = () => {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return  <div className="h-[100%] w-[100%] flex-col justify-center align-center border-2 border-[#653AD8] rounded-3xl transition-colors overflow-hidden cursor-pointer"
        style={{ backgroundColor: theme.background }}
    >

    <div className="Profile-container relative h-full w-full">
        
        <img src={image} alt="" className="h-full w-full object-cover" />

        <div className="img-blur-div absolute inset-0 bg-[#A5A5A500] hover:bg-[#1D1D3B27] z-10"></div>

        <div className="Appearing-element h-[30%] w-[100%] p-3 bg-[#1D1D3B77] relative top-0 flex items-center">

            <div className="h-14 w-14 mr-3 bg-[#1D1D3B99] rounded-full shadow-lg flex justify-center items-center ">
                <div className="h-12 w-12 bg-inherit rounded-full shadow-inner"></div>
            </div>

            <div className="text-white">
                <div className="text-lg font-bold">Anjan Suman</div>
                <div className="text-xs">Software Developer Engineer</div>
            </div>

        </div>
    </div>



        {/* <div className="h-[30%] w-[100%] bg-red-200 rounded-t-3xl border-b-2 border-[#1D1D3B] "></div> */}
    </div>
}

// so do something like if user has uploaded their image then use that profile image else use empty profile image


/*
    this is for empty profile image

        <div className="flex justify-center">
            <div className="h-28 w-28 bg-[#38435c] rounded-full relative bottom-[-80px]"></div>
        </div>

        <div className="flex justify-center">
            <div className="h-[316px] w-[316px] bg-[#38435c] rounded-full relative bottom-[-100px]"></div>
        </div>

*/

// on clicking the profile button a panel should appear in which complete details of the user should be present and from there the user can change details as well as pfp.

// we can do something cool, according to gender 'empty profile image' will change that means for male it will show male character, for female it will be female, and for others it will be normal one
