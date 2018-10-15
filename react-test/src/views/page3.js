import React from 'react';

// const Home = (props) => {
//     console.log(props.match);
//     return (
//         <div>
//             <p>this is Home</p>
//         </div>
//     )
// }
class Page3 extends React.Component {
    constructor (props){
        super(props);
    }
    render () {
        console.log(this.props.match);
        return (
            <div>
                <p>this is Page3</p>
            </div>
        )
    }
}
export default Page3;