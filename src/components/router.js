import React,{ Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import SignIn from './signIn';
import SignUp from './signUp';
import HomePage from './homePage';

class ComponentRouter extends Component {
    render() {
        return (
            <Router>
                <div>
                <Route exact path="/" render={(props) => <SignIn sendProps={this.props} history={props}/>}/>
                <Route  path="/signup"  render={(props) => <SignUp sendProps={this.props} history={props}/>}/>
                <Route path="/home" render={(props) => <HomePage sendProps={this.props} history={props}/>} />
                </div>
            </Router>
        )
    }
}

export default ComponentRouter;