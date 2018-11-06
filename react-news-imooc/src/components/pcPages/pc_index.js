import React from 'react';
import {PCHeader} from './pc_header';
import PCFooter from './pc_footer';
import PCNewContanier from './pc_newscontainer';
import TestAntFilter from '../testSomething/testantFilter';
import TestImutable from '../testSomething/testImutable';
class PCIndex extends React.Component {
    componentDidMount() {
        TestImutable();
    }
    render () {
        return (
            <div>
                <PCHeader></PCHeader>
                <PCNewContanier></PCNewContanier>
                <div>
                    <h1>test</h1>
                    <TestAntFilter></TestAntFilter>
                </div>
                <PCFooter></PCFooter>
            </div>
        );
    }
}

export default PCIndex;