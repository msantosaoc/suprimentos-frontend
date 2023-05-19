'use client';
import React, {createContext, useState} from "react";

export const DEFAULT_THEME = 'default';
export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

export const ThemeContext = createContext({
    globalTheme: '',
    setGlobalTheme: (data: any) => {}
});

const ThemeContextParent = (props: any) => {
    const [theme, setTheme] = useState('light');

    const value = {
        globalTheme: theme,
        setGlobalTheme: setTheme
    }

    return(
        <ThemeContext.Provider value={value}>
            {props.children}
        </ThemeContext.Provider>
    )
};

export default ThemeContextParent;