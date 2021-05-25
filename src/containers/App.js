import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Main from "../components/Main/Main";
import Profile from "../components/Profile/Profile";
import Login from "../components/Login/Login";
import Basket from "../components/Basket/Basket";
import Admin from "../components/Admin/Admin";
import "../../node_modules/materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import React from "react";
import Register from "../components/Register/Register";
import "../containers/App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Orders } from "../components/Orders/Orders";
import History from "../components/History/History";

function App(props) {
  return (
    <Router>
      <div>
        <Header
        // profile="Profile"
        // // register="Register"
        // login="Login"
        // basket="Cart"
        />
        <div className="container">
          <Switch>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/basket" component={Basket}></Route>
            <Route path="/orders" component={Orders}></Route>
            <Route path="/history" component={History}></Route>
            <Route path="/basket" component={Basket}></Route>
            <Route path="/admin" component={Admin}></Route>
            <Route path="/" component={Main}></Route>
            {/* <Route component={NotFoundPage} /> */}
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
