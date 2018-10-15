import React from 'react';

// const Home = (props) => {
//     console.log(props.match);
//     return (
//         <div>
//             <p>this is Home</p>
//         </div>
//     )
// }
class Home extends React.Component {
    constructor (props){
        super(props);
    }
    render () {
        console.log(this.props.match);
        return (
            <div>
                <p>this is Home</p>
            </div>
        )
    }
}
export default Home;