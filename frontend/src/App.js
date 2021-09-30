import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <Route path="/:room">
          <Dashboard />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
