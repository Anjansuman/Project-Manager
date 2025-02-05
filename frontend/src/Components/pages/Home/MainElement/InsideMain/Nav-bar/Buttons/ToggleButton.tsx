
import { useRecoilState } from "recoil";
import { ThemeState } from "../../../../../../../Atoms/ThemeState";

export function ToggleButton() {

  const [theme_state, setTheme_State] = useRecoilState(ThemeState);

  function mode_switch() {
      setTheme_State((prevTheme) => ({
          ...prevTheme,
          mode: prevTheme.mode === 'light' ? 'dark' : 'light',
      }));
  };


  return (
    <div className="flex items-center justify-center h-[100%]">
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only"
          checked={theme_state.mode === 'dark'}
          onChange={mode_switch}
        />
        <div
          className={`w-10 h-5 bg-gray-300 rounded-full transition-colors shadow-md`}
        >
          <div
            className={`w-5 h-5 rounded-full transform transition-transform ${
              (theme_state.mode == 'dark')
              ? "translate-x-0 bg-black"
              : "translate-x-5 bg-white"
            }`}
          ></div>
        </div>
      </label>

    </div>
  );
}

