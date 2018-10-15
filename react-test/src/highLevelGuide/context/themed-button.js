import {ThemeContext} from './theme-context';
import React from 'react';


function ThemeButton(props) {
    return (
        <ThemeContext.Consumer>
            {theme => (
                <button
                {...props}
                style={{backgroundColor: theme.background}}
                />
            )}
        </ThemeContext.Consumer>
    )
}

export default ThemeButton;