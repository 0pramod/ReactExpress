import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Nav from "./components/Nav";
import Signup from "./components/Login/Signup";
import Home from "./components/Home/Home";
import AddContacts from "./components/Contacts/AddContacts";
import Contacts from "./components/Contacts/Contacts";
import ContactsForm from "./components/Contacts/ContactsForm";
import UpdateContacts from "./components/Contacts/UpdateContacts";
import Test from "./components/Test";
function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route path="/nav" component={Nav} />
          <Route path="/test" component={Test} />
          <Route path="/form" component={ContactsForm} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} exact />
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
    return <Redirect to={{ pathname: "/login" }} />;
  } else {
    return <Contacts />;
  }
}
function AddRoute({ children, ...rest }) {
  const isUserLogIn = localStorage.getItem("idToken");

  if (!isUserLogIn) {
    return <Redirect to={{ pathname: "/login" }} />;
  } else {
    return <AddContacts />;
  }
}
function UpdateRoute({ children, ...rest }) {
  const isUserLogIn = localStorage.getItem("idToken");

  if (!isUserLogIn) {
    return <Redirect to={{ pathname: "/login" }} />;
  } else {
    return <UpdateContacts />;
  }
}

export default App;
