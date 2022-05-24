//import logo from './logo.svg';

import React, {Component} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import Movies from "./components/movie";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';


class App extends Component{
    state ={};

    componentDidMount() {
        const user = auth.getCurrentUser();
        this.setState({user});
    }

    render() {
        const {user} = this.state;
        return (
            <React.Fragment>
                <ToastContainer/>
                <NavBar user={user}/>
                <main className="container">
                    <Switch>
                        <Route path='/register' component={RegisterForm}/>
                        <Route path='/login' component={LoginForm}/>
                        <Route path='/logout' component={Logout}/>
                        <ProtectedRoute component={MovieForm} path='/movies/:id'/>
                        <Route path='/movies'
                               render={props => <Movies {...props} user={this.state.user}/>}/>
                        <Route path='/customers' component={Customers}/>
                        <Route path='/rentals' component={Rentals}/>
                        <Route path='/notfound' component={NotFound}/>
                        <Redirect from='/' exact to='/movies'/>
                        <Redirect to='/notfound'/>
                    </Switch>
                </main>
            </React.Fragment>

        );
    }
}

export default App;
