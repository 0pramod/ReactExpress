import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Home from "./components/Home/Home";
import AddContacts from "./components/Contacts/AddContacts";
import Contacts from "./components/Contacts/Contacts";
import UpdateContacts from "./components/Contacts/UpdateContacts";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/" component={Login} exact />
          <Route path="/signup" component={Signup} />
          <AuthRoute path="/contacts" component={Contacts} />
          <AddRoute path="/addcontacts" component={AddContacts} />
          <UpdateRoute path="/updatecontacts" component={UpdateContacts} />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function AuthRoute({ children, ...rest }) {
  const isUserLogIn = localStorage.getItem("idToken");

  if (!isUserLogIn) {
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return <Contacts />;
  }
}
function AddRoute({ children, ...rest }) {
  const isUserLogIn = localStorage.getItem("idToken");

  if (!isUserLogIn) {
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return <AddContacts />;
  }
}
function UpdateRoute({ children, ...rest }) {
  const isUserLogIn = localStorage.getItem("idToken");

  if (!isUserLogIn) {
    return <Redirect to={{ pathname: "/" }} />;
  } else {
    return <UpdateContacts />;
  }
}

export default App;
