import { useRecoilValue } from "recoil";
import { ThemeState } from "../../../../Atoms/ThemeState";

export const Project = () => {


    const theme_state = useRecoilValue(ThemeState);
    const theme = (theme_state.mode == 'light') ? theme_state.light : theme_state.dark;
    


    return <div className="h-auto w-[70%] border bg-[#03061C] rounded-[14px] p-[25.2px] m-[15px] "
        style = {{
            backgroundColor:  theme.dark_panel,
            borderColor: theme.gray_border
        }}
    >
        {/* start */}
        <div className=" flex items-center justify-between">
            <div className="flex items-center">
                <div className="h-50 w-50 bg-[#653AD847] p-1 rounded-xl mr-5">
                    <div className="h-full w-full bg-[#653AD847] rounded-xl">
                        
                    </div>
                </div>

                <div className="h-44 w-2 bg-[#653AD847] border border-[#1d1d2b] rounded-xl mr-5">

                </div>

                <div className="h-40 w-40 flex flex-col justify-around ">
                    <div className="flex items-center">
                        <div className="h-[10px] rounded-xs border border-[#e03131] bg-[#e0313160] "
                            style={{
                                width: '40%'
                            }}
                        ></div>
                        <div className="text-gray-500 text-xs ml-2">
                            HTML
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="h-[10px] rounded-xs border border-[#2f9e44] bg-[#2f9e4460] "
                            style={{
                                width: '60%'
                            }}
                        ></div>
                        <div className="text-gray-500 text-xs ml-2">
                            CSS
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="h-[10px] rounded-xs border border-[#1971c2] bg-[#1971c260] "
                            style={{
                                width: '50%'
                            }}
                        ></div>
                        <div className="text-gray-500 text-xs ml-2">
                            Solidity
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="h-[10px] rounded-xs border border-[#f08c00] bg-[#f08c0060] "
                            style={{
                                width: '80%'
                            }}
                        ></div>
                        <div className="text-gray-500 text-xs ml-2">
                            Typescript
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="h-[10px] rounded-xs border border-[#6741d9] bg-[#6741d960] "
                            style={{
                                width: '65%'
                            }}
                        ></div>
                        <div className="text-gray-500 text-xs ml-2">
                            Solidity
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-[50%] text-white text-7xl font-bold tracking-wider flex justify-center items-center">
                <div>
                    Project
                </div>
            </div>
        </div>
    </div>
}