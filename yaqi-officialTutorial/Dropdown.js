class Dropdown extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
        this.myRef = React.createRef();
    }
    componentDidMount() {
        window.addEventListener('click', (e) => {
            if (this.myRef.current.contains(e.target)) {
                this.setState({
                    isShow: false
                }) 
            }
        })
    }
    handleClick = () => {
        this.setState((state) => ({
            isShow: !state.isShow
        }))
    }
    handleSelected = (item) =>(e) =>  {
        this.setState({
            isShow: false
        })
        this.props.handleSelected(item);
    }
    renderOptions() {
        let className = `dropdown-menu ${this.state.isShow && 'show'}`;
        return (<div className={className} aria-labelledby="dropdownMenuButton">
                {['Action', 'Another action', 'Something else here'].map((item, index) => 
                <a className="dropdown-item" href="#" key={index}
                onClick={this.handleSelected(item)}>{item}</a>)}
        </div>)
    }
    render() {
        let btnClassName=`btn btn-${this.props.type} dropdown-toggle`;
        return (
            <div className="dropdown" ref={this.myRef}>
                <button className={btnClassName}
                onClick={this.handleClick}
                type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                    Dropdown button
                </button>
                {this.renderOptions()}
            </div>
        )
    }
}