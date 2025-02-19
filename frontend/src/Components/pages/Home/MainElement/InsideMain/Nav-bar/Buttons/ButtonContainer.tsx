import { HomeButton } from "../../../../../../ui/SVGs/HomeButton";
import { ProjectButton } from "../../../../../../ui/SVGs/ProjectButton";
import { Home_Button } from "./HomeButton";
import { ToggleButton } from "./ToggleButton";

export const Button_Container = () => {
    return <div className="h-[100%] w-[100%] px-12 flex justify-between items-center ">
        <div className="nav-button hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                style={{}}
            ><HomeButton height={"40"} /></div>

            <div className="nav-button hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                style={{}}
            ><ProjectButton height={'45'} /></div>

            <div className="nav-button hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                style={{}}
            >Messaging</div>

            <div className="nav-button hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                style={{}}
            >Notifications</div>

            <div className="nav-button hover:text-white transition-colors duration-300 ease-in-out cursor-pointer"
                style={{}}
            >Me</div>
            <div>

                {/* do something like when you click on the button a circle will appear and it will enlarge itself till covers the whole screen and while it expands it will change the theme mode that means theme will change radially */}
                {/* <button onClick={mode_switch} className="border-2 border-black active:border-red-300">toggle</button> */}
                <ToggleButton/>
            </div>
    </div>
}