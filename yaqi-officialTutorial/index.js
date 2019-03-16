class App extends React.Component{
    handleSelected = (selectedItem) =>{
        console.log(selectedItem)
    }
    render() {
        return (
            <div className="app">
                <Dropdown  handleSelected={this.handleSelected} type="success"/>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));