import React from 'react';

const ThemeContext = React.createContext('light');

class App extends React.Component {
    return () {
        return (
            <ThemeContext.Provider value="dark">
                <Toolbar />
            </ThemeContext.Provider>
        )
    }
}

function Toolbar(props) {
    return (
        <div>
            <ThemeContext />
        </div>
    )
}

function ThemeButton(props) {
    return (
        <ThemeContext.Consumer>
            {theme => <Button {...props} theme={theme} />}
        </ThemeContext.Consumer>
    )
}