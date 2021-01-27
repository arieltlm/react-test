import './App.css';
import {
    NavLink,
    BrowserRouter as Router,
    Route,
    Redirect,
} from 'react-router-dom'

const menus = [{
    path:'/basic',
    title:'basic'
},{
    path:'/urlParams',
    title:'urlParams'
}]

function App() {
  return (
    <Router>
        <div className="container">
            <header>
                <h1>react-router</h1>
                <ul className="menus">
                        {menus.map(menu => (
                            <li key={menu.title}>
                                <NavLink to={menu.path} activeClassName="active-navlink">
                                    {menu.title}
                                </NavLink>
                            </li>
                        ))}  
                </ul>
            </header>
        <main>
        <Route path='/'></Route>
        <Redirect to="/basic"></Redirect>
        </main>
        </div>
    </Router>
  );
}

export default App;
