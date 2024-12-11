import React, { Component } from "react";

class User extends Component {
    state = {
        name: "",
        password: "",
        email: "",
        errorMessage: "",
    };

    validateForm = () => {
        const { name, email, password } = this.state;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/; // At least 8 characters, 1 letter, 1 number
        if (!emailRegex.test(email)) {
            this.setState({ errorMessage: "Invalid email format." });
            return false;
        }
        if (!passwordRegex.test(password)) {
            this.setState({
                errorMessage:
                    "Password must be at least 8 characters with 1 letter and 1 number.",
            });
            return false;
        }
        this.setState({ name, errorMessage: "" });
        return true;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            const response = await fetch("/register/user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(this.state),
            });
            const result = await response.json();
            alert(result.message);
        }
    };

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>User Registration</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <button type="submit">Register</button>
                <p style={{ color: "red" }}>{this.state.errorMessage}</p>
            </form>
        );
    }
}

export default User;
