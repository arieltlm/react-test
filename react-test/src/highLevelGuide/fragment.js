import React, {Fragment} from 'react';

// 需要key时用Fragment
function Glossary (props) {
    return (
        <dl>
            {props.products.map(item => (
                <Fragment key={item.name}>
                    <dt>{item.name}</dt>
                    <dd>{item.price}</dd>
                </Fragment>
            ))}
        </dl>
    )
}
// TODO
// 官网上说不需要key时就用这个<></> 但是报错啊，if your tooling supports it（什么工具呢？日后再探索）
// function ListItem({ item }) {
//     return ( 
//         <>
//             <dt>{item.name}</dt>
//             <dd>{item.price}</dd>>
//         </> 
//     );    
//   }

class Columns extends React.Component {
    render() {
      return (
        <React.Fragment>
          <td>Hello</td>
          <td>World</td>
        </React.Fragment>
      );
    }
  }
  function Tables (props) {
      return (
        <table>
            <tbody>
            <tr>
                <Columns></Columns>
            </tr>
            <tr>
                <Columns></Columns>
            </tr>
            </tbody>
        </table>
      )
  }
export {Glossary, Tables};