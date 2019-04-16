import React from 'react';
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

// 一个使用 ThemedButton 的中间组件
function Toolbar(props) {
    return (
        <ThemedButton onClick={props.changeTheme}>
        Change Theme
        </ThemedButton>
    );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light,
    };

    this.toggleTheme = () => {
      this.setState(state => ({
        theme:
          state.theme === themes.dark
            ? themes.light
            : themes.dark,
      }));
    };
  }

  render() {
    // 在 ThemeProvider 内部的 ThemedButton 按钮组件使用 state 中的 theme 值，
    // 而外部的组件使用默认的 theme 值
    return (
        <div style={{margin:20,border:'1px solid red',padding:10}}>
            <h4>context 示例：</h4>
            <ThemeContext.Provider value={this.state.theme}>
                <Toolbar changeTheme={this.toggleTheme} />
                <ThemeContext.Consumer>
                    {value=><Consumers theme={value}/>}
                </ThemeContext.Consumer>
            </ThemeContext.Provider>
            <div style={{marginTop:20}}>
            <ThemedButton>外部的组件使用默认的 theme 值</ThemedButton>
            
            </div>
        </div>
    );
  }
}
function Consumers(props){
    return <div style={{background:props.theme.background,color:props.theme.foreground,width:400,height:200,fontSize:12,margin:10,border:'1px solid blue'}}>
        ThemeContext.Consumer在ThemeContext.Provider中消耗；
        这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。

这需要函数作为子元素（function as a child）这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。
如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。
    </div>
}

