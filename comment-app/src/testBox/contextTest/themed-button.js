import React from 'react';
import {ThemeContext} from './theme-context';

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background,color:theme.foreground}}
      />
    );
  }
}
ThemedButton.contextType = ThemeContext;

export default ThemedButton;