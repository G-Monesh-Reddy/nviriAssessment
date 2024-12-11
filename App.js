import { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import login from "./Components/login";
import Technician from "./Components/technicianRegister";
import User from ".Components/userRegister";

class App extends Component {
    state = {};
    render() {
        return (
            <Switch>
                <Route exact path="/login" Component={login} />

                <Route exact path="/technician" Component={Technician} />
                <Route exact path="/user" Component={User} />
            </Switch>
        );
    }
}

export default App;
