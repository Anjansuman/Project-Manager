import { atom } from "recoil";

export const ThemeState = atom({
    key: 'ToggleMode',
    default: {
        mode: 'dark',

        light: {
            background: '#F7FAFD',
            dark_panel: 'white',
            dark_panel_69: '#1D1D3B69',
            dark_border: 'white',
            light_panel: '#653AD8',
            light_panel_47: '#653AD847',
            light_border: '#653AD8',
            font_color: '#1D1D3B',
            font_color_2: '#E0E5EE',
            default_font_color: 'gray',
            hover_font_color: '#1D1D3B',
            gray_border: '#D9D9D9',
            card_bg: '#FFFFFF',
            card_img: '#F3F6FB',
            nav_bg: '#FFFFFF70',
            
        },

        dark: {
            background: '#101623',
            dark_panel : '#03061C',
            dark_panel_69: '#03061C69',
            dark_border: '#1D1D3B',
            light_panel: '#653AD8',
            light_panel_47: '#653AD847',
            light_border: '#653AD8',
            font_color: 'white',
            font_color_2: '#303A4F',
            default_font_color: 'gray',
            hover_font_color: 'white',
            gray_border: '#1d1d2b',
            card_bg: '#162037',
            card_img: '#202B44',
            nav_bg: '#00000030'
        }
    }
})

// dark-panel : #1D1D3B