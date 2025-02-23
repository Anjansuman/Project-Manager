import BrandLogo from "../../../../../ui/Images/BrandLogo.png";
import { Add_Project_Button } from "./Add_Project/Add_Project_Button";

import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../../Atoms/ThemeState";
import { Logo } from "../../../../../ui/SVGs/Logo";

export const Brand = () => {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;


    return  <div className="h-[100%] w-[100%] p-6 border-2 border-[#1D1D3B] rounded-3xl flex justify-between items-center "
        style={{ borderColor: theme.dark_border }}
    >
        <div className="flex justify-center items-center">
            <div className="mr-6 cursor-pointer hover:mr-8"
                style={{
                    filter: 'drop-shadow(2px 2px 2px #00000080)',
                    transition: 'margin 0.4s ease',
                }}
            >
                <Logo h={'100'} />
            </div>

            <div className="cursor-pointer hover:ml-2"
                style={{
                    transition: 'margin-left 0.4s ease',
                }}
            >
                <div className="text-3xl font-bold flex">Pro-Eject</div>
                <div className="text-base font-normal">your own project manager</div>
            </div>
        </div>

        <div>
            <Add_Project_Button/>
        </div>
    </div>
}