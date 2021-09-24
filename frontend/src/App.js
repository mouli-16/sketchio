import Home from "./pages/home/Home.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route, useLocation
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";


function App() {
  
  return (
    <Router>
      <Switch >
        <Route exact path="/">
           <Home/>
        </Route>
        <Route path="/:room">
           <Dashboard/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;