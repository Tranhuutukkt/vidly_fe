import React from "react";
import Joi from 'joi';
import {Redirect} from "react-router-dom";
import Form from "./common/form";
import auth from "../services/authService";

class LoginForm extends Form{
    state ={
        data: {username: '', password: ''},
        errors: {}
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    }

    doSubmit = async ()=>{
        const {data} = this.state;
        try {
            await auth.login(data.username, data.password);
            const {state} = this.props.location;
            window.location = state ? state.from.pathname : '/';
        }
        catch (ex){
            if (ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.username = ex.response.data;
                errors.password = ex.response.data;
                this.setState({errors});
            }
        }

    }

    render() {
        if(auth.getCurrentUser()) return <Redirect to='/'/>

        return (
            <div>
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

export default LoginForm;