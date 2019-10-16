import React from 'react';

import CyclicRollList from '../cyclic-roll-test/app/index'
import CyclicRollSimpleList from '../cyclic-roll-simple/index'

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
            <div style={{height:'90%'}}>
                <p>this is Page3</p>
                <CyclicRollList />
                <CyclicRollSimpleList />
            </div>
        )
    }
}
export default Page3;