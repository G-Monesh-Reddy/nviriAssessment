import { Component } from "react";
import Cookies from "js-cookie";
import { Link, withRouter, Redirect } from "react-router-dom";

class Login extends Component {
    state = {
        email: "",
        password: "",
        showSubmitError: false,
        errorMsg: "",
    };

    onChangeEmail = (event) => {
        this.setState({ email: event.target.value });
    };

    onChangePassword = (event) => {
        this.setState({ password: event.target.value });
    };

    onSubmitSuccess = (jwtToken) => {
        const { history } = this.props;

        Cookies.set("jwt_token", jwtToken, {
            expires: 30,
            path: "/",
        });
        history.replace("/home");
    };

    onSubmitFailure = (errorMsg) => {
        this.setState({ showSubmitError: true, errorMsg });
    };

    submitForm = async (event) => {
        event.preventDefault();
        const { email, password } = this.state;
        const userDetails = { email, password };
        const url = "http://localhost:3000/login"; // Local server endpoint
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userDetails),
        };
        const response = await fetch(url, options);
        const data = await response.json();
        if (response.ok === true) {
            this.onSubmitSuccess(data.jwt_token);
        } else {
            this.onSubmitFailure(data.error_msg);
        }
    };

    renderPasswordField = () => {
        const { password } = this.state;
        return (
            <>
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={this.onChangePassword}
                    placeholder="Enter Password"
                />
            </>
        );
    };

    renderEmailField = () => {
        const { email } = this.state;
        return (
            <>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={this.onChangeEmail}
                    placeholder="Enter Email"
                />
            </>
        );
    };

    render() {
        const { showSubmitError, errorMsg } = this.state;
        const jwtToken = Cookies.get("jwt_token");
        if (jwtToken !== undefined) {
            return <Redirect to="/home" />;
        }
        return (
            <div>
                <form onSubmit={this.submitForm}>
                    <h2>Login</h2>
                    <div>{this.renderEmailField()}</div>
                    <div>{this.renderPasswordField()}</div>

                    <button type="submit">Login</button>

                    {showSubmitError && <p>{errorMsg}</p>}
                </form>

                <div>
                    <p>Don't have an account?</p>
                    <Link to="/User">Register as User</Link>
                    {" | "}
                    <Link to="/Technician">Register as Technician</Link>
                </div>
            </div>
        );
    }
}

export default withRouter(Login);
