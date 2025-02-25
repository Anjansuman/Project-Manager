import { useRecoilValue } from "recoil";
import { useRef } from "react";
import { ThemeState } from "../../../../../Atoms/ThemeState";
import { ImageInput } from "../../../../ui/Customs/ImageInput";
import { Input } from "../../../../ui/Customs/Input";
import { Button } from "../../../../ui/Customs/Button";
import axios from "axios";


export const NewOrg = () => {

    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;

    const inputRef = useRef<HTMLInputElement>(null);

    async function submit() {
        try {
            const backend = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.put(`${backend}/Organization/createOrg`, {
                name: inputRef.current?.value
            }, {
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            });
            const data = await response.data;
            console.log(data);
        } catch (error) {
            console.log(error);
        }

    }

    return <div className="h-[80vh] w-[80%] border rounded-[14px] p-[25.2px] m-[15px] flex flex-col items-center justify-center overflow-y-scroll [::-webkit-scrollbar]:hidden [scrollbar-width:none]  "
        style = {{
            backgroundColor:  theme.dark_panel,
            borderColor: theme.gray_border
        }}
    >
        <div className="mb-4 ">
            <ImageInput bg={'#653AD847'} h={'180px'} w={'180px'} />
        </div>
        <div className="mb-4">
            <Input placeholder={"Enter organization's name"} h={'40px'} w={'240px'} inputRef={inputRef} />
        </div>
        <div>
            <Button text={'Done'} onClick={submit} />
        </div>
    </div>
        
}