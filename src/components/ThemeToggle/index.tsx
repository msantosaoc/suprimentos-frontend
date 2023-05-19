'use client';
import { ThemeContext } from "@/contexts/theme";
import { ReactPropTypes, useContext } from "react";
import { Form, FormGroup, Input } from "reactstrap";



const NewThemeToggle = () => {

    const { globalTheme, setGlobalTheme } = useContext(ThemeContext)
    const handleThemeToggle = () => {
        setGlobalTheme(globalTheme === 'light' ? 'dark' : 'light');
    }

    return (
        <div className=''>
            {/* <Input type="toggle" className={styles.dn} id={styles.dn} onChange={handleThemeToggle} checked={globalTheme === 'light'} /> */}
            <Form>
            <FormGroup switch={true} >
                <Input type="switch" role="switch" onChange={handleThemeToggle} checked={globalTheme === 'dark' ? true : false} className='h-4 bg-gray-300 border-1 border-gray-500 focus:outline-none focus:ring-0 focus:transparent ' />
            </FormGroup>
            </Form>
        </div>
    )
}

export { NewThemeToggle }