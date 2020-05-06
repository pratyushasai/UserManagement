import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { RegistrationForm } from './registrationpage';
import {BrowserRouter} from 'react-router-dom';

let AdminLogins = [{
    
}];
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logins: AdminLogins,
            modalIsOpen: false
        }
    }
    openModal() {
        console.log("set state open");
        this.setState({ modalIsOpen: true });
    }
    afterOpenModal() {
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    handleUserInput(firstName, lastName, email, gender, password) {
        var newRowInfo = this.state.logins;
        newRowInfo.push({
            firstName: firstName, lastName: lastName, email: email, gender: gender, password: password
        });
        this.setState({
            logins: newRowInfo
        });
    }
    handleLogin(e) {
        var logins = this.state.logins;
        var filteredLogins = logins.filter((login) => {
            var email = this.refs.email.value.trim();
            var password = this.refs.password.value.trim();
            if (email == login.email && password == login.password) {
                return login;
            }
        });
        if (filteredLogins.length == 0) {
            alert('Please check your credentials')
            return;
        }
        else{
            e.preventDefault();
            window.location = 'http://localhost:3000/nav';
        }
    }
    onSelect() {
		this.setState({ modalIsOpen: true });
	}
    render() {
        return (
            <div>

                <div className="wrapper">

                    <form className="login">
                        <p className="title">Login in to your account</p>
                        <div className="form-group">
                            <input type="text" placeholder="email address" className="inp" ref="email" />
                        </div>
                        <br />
                        <div className="form-group">
                            <input type="password" placeholder="password" className="inp" ref="password" />
                        </div>
                        <br />
                        <button type="submit" onClick={this.handleLogin.bind(this)}>
                        Log in
                            </button>
                        <p>
                            Don't have an account? <a
                                onClick={this.onSelect.bind(this)}>Create one</a>
                            <RegistrationForm modalState={this.state.modalIsOpen} openModal={this.openModal.bind(this)}
						closeDialog={this.closeModal.bind(this)} onUserInput={this.handleUserInput.bind(this)}/>
                        </p>
                        <Link to="/nav">Go back to home page</Link>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;