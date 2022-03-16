import {
  BrowserRouter,
  Route,
  Routes,
  Switch,
  Redirect,
  Link,
} from "react-router-dom";
import "./App.css";
import axios from "axios";
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
          {/* <Route path="/nav" component={Nav} />
          <Route path="/test" component={Test} />
          <Route path="/home" component={Home} />
          <AddRoute path="/addcontacts" component={AddContacts} />
          <UpdateRoute path="/updatecontacts" component={UpdateContacts} /> */}
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
// function AddRoute({ children, ...rest }) {
//   const isUserLogIn = localStorage.getItem("idToken");

//   if (!isUserLogIn) {
//     return <Redirect to={{ pathname: "/login" }} />;
//   } else {
//     return <AddContacts />;
//   }
// }
// function UpdateRoute({ children, ...rest }) {
//   const isUserLogIn = localStorage.getItem("idToken");

//   if (!isUserLogIn) {
//     return <Redirect to={{ pathname: "/login" }} />;
//   } else {
//     return <UpdateContacts />;
//   }
// }
// const checkUserStatus = async () => {
//   let userStatus;
//   const userToken = localStorage.getItem("idToken");
//   console.log(userToken);
//   const response = await axios.get(`/verify/${userToken}`);
//   response ? (userStatus = true) : (userStatus = false);
//   console.log(userStatus);
//   return userStatus;
// };

// //console.log(checkUserStatus());
export default App;
