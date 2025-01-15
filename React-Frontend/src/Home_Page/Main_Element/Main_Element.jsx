import "./Main_Element.css";
import { Profile } from "./Inside_Main/Profile/Profile";
import { Brand } from "./Inside_Main/Branding/Brand";
import { Meeting } from "./Inside_Main/Meetings/Meeting";
import { Navbar } from "./Inside_Main/Nav-bar/Navbar";
import { Project } from "./Inside_Main/Projects/Project";
import { Notification } from "./Inside_Main/Notifications/Notification";

import { useRecoilValue } from "recoil";
import { Theme_State } from "../../Atoms/Theme_State";

export const Main_Element = () => {


    const theme_state = useRecoilValue(Theme_State);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return <div className="h-[100%] p-6">

        <div className="h-[45%] flex mb-6">
            
            <div className="h-[100%] w-[24%] p-0.5 mr-6 rounded-3xl flex justify-center items-center"
                style={{ backgroundColor: theme.light_panel}}
            >
                <Meeting/>
            </div>

            <div className="h-[100%] w-[52%]">

                <div className="h-[46%] mr-6 mb-6 p-0.5 rounded-3xl"
                    style={{ backgroundColor: theme.dark_panel}}
                >
                    <Navbar/>
                </div>

                <div className="h-[46%] mr-6 p-0.5 rounded-3xl flex justify-center items-center font-sans"
                    style={{
                        backgroundColor: theme.light_panel,
                        color: theme.font_color,
                    }}
                >
                    <Brand/>
                </div>

            </div>

            <div className="h-[100%] w-[24%] rounded-3xl p-0.5"
                style={{ backgroundColor: theme.dark_panel}}
            >
                <Profile/>
            </div>
        </div>

        <div className="h-[45%] flex">
            <div className="h-[100%] w-[76%] rounded-3xl mr-6 p-0.5"
                style={{ backgroundColor: theme.dark_panel}}
            >
                <Project/>
            </div>

            <div className="h-[100%] w-[24%] rounded-3xl p-0.5"
                style={{ backgroundColor: theme.dark_panel}}
            >
                <Notification/>
            </div>

        </div>

    </div>
}




/*

<div className="w-[50%]">
        <div className="h-sc w-[100%] bg-[#653AD8] rounded-t-3xl pt-10 text-white font-sans">
            <div className="flex justify-center text-xl font-bold mb-2">Pro-Eject</div>
            <div className="flex justify-center text-5xl font-medium">Your Project Manager</div>
        </div>
        <div className="flex">
            <div className="h-sc w-[30%] bg-[#653AD8] mb-6 rounded-b-3xl"></div>
            <div className="h-sc w-[40%] bg-[#653AD8] mb-6"></div>
            <div className="h-sc w-[30%] bg-[#653AD8] mb-6 rounded-b-3xl"></div>
        </div>


        <div className="h-[20%] w-[10%] bg-[#03061C] absolute left-[40%] bottom-[50%] rounded-tl-[100%] m-0"></div>
        <div className="h-[20%] w-[10%] bg-[#03061C] absolute left-[50%] bottom-[50%] rounded-tr-[100%] m-0"></div>


        <div className="h-[20%] w-[10%] bg-[#03061C] absolute left-[40%] top-[50%] rounded-bl-[100%] m-0"></div>
        <div className="h-[20%] w-[10%] bg-[#03061C] absolute left-[50%] top-[50%] rounded-br-[100%] m-0"></div>


        <div className="flex">
            <div className="h-sc w-[30%] bg-[#1D1D3B] rounded-t-3xl"></div>
            <div className="h-sc w-[40%] bg-[#1D1D3B]"></div>
            <div className="h-sc w-[30%] bg-[#1D1D3B] rounded-t-3xl"></div>
        </div>
        <div className="h-sc w-[100%] bg-[#1D1D3B] rounded-b-3xl"></div>
    </div>
*/