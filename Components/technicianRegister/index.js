import React, { Component } from "react";

class Technician extends Component {
    //technicianId,name,email,photo,password,specialization,description
    state = {
        name: "",
        email: "",
        photo: "",
        password: "",
        specialization: "",
        description: "",
        errorMessage: "",
    };

    validateForm = () => {
        const { name, specialization, description, email, password } =
            this.state;
        if (!name.trim() || !specialization.trim() || !description.trim()) {
            this.setState({
                errorMessage: "Name and Specialization are required.",
            });
            return false;
        }
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
        this.setState({ errorMessage: "" });
        return true;
    };

    handleSubmit = async (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            const response = await fetch("/register/technician", {
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
    //technicianId,name,email,photo,password,specialization,description

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Technician Registration</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={this.state.name}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="email"
                    placeholder="Specialization"
                    value={this.state.email}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    value={this.state.photo}
                    onChange={this.handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={this.state.specialization}
                    onChange={this.handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="description"
                    value={this.state.description}
                    onChange={this.handleChange}
                />

                <button type="submit">Register</button>
                <p style={{ color: "red" }}>{this.state.errorMessage}</p>
            </form>
        );
    }
}

export default Technician;
