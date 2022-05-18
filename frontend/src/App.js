import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import Contacts from "./components/Contacts/Contacts";
import ContactsForm from "./components/Contacts/ContactsForm";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <FormRoute path="/form" component={ContactsForm} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <HomeRoute path="/" component={Contacts} />

          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

function HomeRoute({ children, ...rest }) {
  const isUserLogIn = localStorage.getItem("idToken");

  if (!isUserLogIn) {
    return <Redirect to={{ pathname: "/login" }} />;
  } else {
    console.log(isUserLogIn);
    return <Contacts />;
  }
}
function FormRoute({ children, ...rest }) {
  const isUserLogIn = localStorage.getItem("idToken");

  if (!isUserLogIn) {
    return <Redirect to={{ pathname: "/login" }} />;
  } else {
    return <ContactsForm />;
  }
}

export default App;
