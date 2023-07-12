'use client'
import React, {createContext, useState} from "react";

export const DEFAULT_THEME = 'default';
export const DARK_THEME = 'dark';
export const LIGHT_THEME = 'light';

export const MenuContext = createContext({
    globalMenu: false,
    setGlobalMenu: (data: any) => {},
    globalSubmenu: false,
    setGlobalSubmenu: (data: any) => {},
    globalSubmenuCadastrar: false,
    setGlobalSubmenuCadastrar: (data: any) => {}
});

const MenuContextParent = (props: any) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [submenu, setSubmenu] = useState(false);
    const [submenuCadastrar, setSubmenuCadastrar] = useState(false);

    const value = {
        globalMenu: menuOpen,
        setGlobalMenu: setMenuOpen,
        globalSubmenu: submenu,
        setGlobalSubmenu: setSubmenu,
        globalSubmenuCadastrar: submenuCadastrar,
        setGlobalSubmenuCadastrar: setSubmenuCadastrar
    }

    return(
        <MenuContext.Provider value={value}>
            {props.children}
        </MenuContext.Provider>
    )
};

export default MenuContextParent;