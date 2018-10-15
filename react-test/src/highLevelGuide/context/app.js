import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';
import React from 'react';

function Toolbar (props) {
    return (
        <ThemedButton onClick={props.changeTheme}>
            Change ThemedButton
        </ThemedButton>
    );
}
function Page (props) {
    return (
        <div>
            {props.children}
        </div>
    )
}
function Section (props) {
    return (
        <div>
            {props.children}
        </div>
    )
}
class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            theme: themes.light,
        };
        this.toggleTheme = () => {
            this.setState(state => ({
                theme: 
                    state.theme === themes.dark
                    ? themes.light
                    : themes.dark
            }));
        };
    }
    render () {
        return (
            <Page>
                <ThemeContext.Provider value={this.state.theme}>
                    <Toolbar changeTheme = {this.toggleTheme} />
                </ThemeContext.Provider>
                <Section>
                    <ThemedButton />
                </Section>
            </Page>
        )
    }
}

export default App;