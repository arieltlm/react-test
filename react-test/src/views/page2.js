import React from 'react';
import {
    Route,
    Link
} from 'react-router-dom';
const Page2 = ({match}) => {
    console.log(match);

    // const obj = {
    //     foo: {
    //       bar: {
    //         baz: 42,
    //       },
    //     },
    //   }

    //   const baz = obj?.foo?.bar?.baz
    //   const safe = obj?.qux?.baz

      
    return (
        <div>
            <h2>this is page2</h2>
            <ul>
                <li><Link to={`${match.url}/rendering`}>Rendring with React</Link></li>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
                <li>
                    <Link to={'/cool'}>Props v. State</Link>
                </li>
                </ul>

                <Route path={`${match.url}/:topicId`} component={Topic} />
                <Route
                exact
                path={match.url}
                render={() => <h3>Please select a topic.</h3>}
                />
                {/* <FadingRoute path="/cool" component={Topic}/> */}
        </div>
    )
}
// // 包装/合成
// const FadingRoute = ({ component: Component, ...rest }) => (
//     <Route {...rest} render={props => (
//         <Component {...props}/>
//     )}/>
//   )

const Topic = ({ match }) => (
    <div>
      <h3>{match.params.topicId}</h3>
    </div>
  );
export default Page2;