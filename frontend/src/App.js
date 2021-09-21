import Home from "./pages/home/Home.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
           <Home/>
        </Route>
        <Route path="/dashboard">
           <Dashboard/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;