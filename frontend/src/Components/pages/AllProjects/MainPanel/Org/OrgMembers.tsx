import { useParams } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../../Atoms/ThemeState";


export const OrgMembers = () => {

    const params = useParams().members;


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    return <div className="h-[80vh] w-[70%] border bg-[#03061C] rounded-[14px] p-[25.2px] m-[15px] "
            style = {{
                backgroundColor:  theme.dark_panel,
                borderColor: theme.gray_border
            }}
        >

    </div>
}