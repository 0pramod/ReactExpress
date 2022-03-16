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
  const isUserLogIn = verifyUserToken();

  if (!isUserLogIn) {
    return <Redirect to={{ pathname: "/login" }} />;
  } else {
    logOut();
    return <Contacts />;
  }
}
function FormRoute({ children, ...rest }) {
  const isUserLogIn = verifyUserToken(); //localStorage.getItem("idToken");

  if (!isUserLogIn) {
    return <Redirect to={{ pathname: "/login" }} />;
  } else {
    logOut();
    return <ContactsForm />;
  }
}
const logOut = () => {
  window.localStorage.clear();
};
let verifyUserToken = async () => {
  const token = localStorage.getItem("idToken");
  const response = await axios.post(`/verify/${token}`);
  console.log(response.data.verified);
  return response.data.verified;
};

export default App;
