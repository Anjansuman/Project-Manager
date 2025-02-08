import { atom } from "recoil";

export const ThemeState = atom({
    key: 'ToggleMode',
    default: {
        mode: 'dark',

        light: {
            background: '#F4F2EE',
            dark_panel: 'white',
            dark_panel_69: '#1D1D3B69',
            dark_border: 'white',
            light_panel: '#653AD8',
            light_panel_47: '#653AD847',
            light_border: '#653AD8',
            font_color: '#1D1D3B',
            default_font_color: 'gray',
            hover_font_color: '#1D1D3B',
            gray_border: '#D9D9D9',
        },

        dark: {
            background: 'black',
            dark_panel : '#03061C',
            dark_panel_69: '#03061C69',
            dark_border: '#1D1D3B',
            light_panel: '#653AD8',
            light_panel_47: '#653AD847',
            light_border: '#653AD8',
            font_color: 'white',
            default_font_color: 'gray',
            hover_font_color: 'white',
            gray_border: 'transparent'
        }
    }
})

// dark-panel : #1D1D3B