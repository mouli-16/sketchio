import Home from "./pages/home/Home.jsx";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Container from "./components/container/Container.jsx";


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
        <Route path="/container">
           <Container/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;