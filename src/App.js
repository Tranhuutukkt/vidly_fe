//import logo from './logo.svg';
import './App.css';
import Movies from "./components/movie";
import {Redirect, Route, Switch} from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import React, {Component} from "react";
import NavBar from "./components/navBar";
import MovieForm from "./components/movieForm";

class App extends Component{
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <main className="container">
                    <Switch>
                        <Route path='/movies/:id' component={MovieForm}/>
                        <Route path='/movies' component={Movies}/>
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
