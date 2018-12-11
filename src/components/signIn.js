import React,{ Component } from 'react';
import {TextField} from 'material-ui';
import {Link} from 'react-router-dom';



class SignIn extends Component {
    constructor() {
        super();
        this.state = {
            email:'',
            pass:''
        }
    }

    SignInHandler() {
        if(this.state.email !== '' && this.state.pass !== '') {
            this.props.sendProps.sendProps.SignInDispatch(this.state.email,this.state.pass)
        }

    }
    render() { 
        console.log('signin ' + this.props.sendProps.sendProps.signInState)     
        return(
            <div className="signinMain">
            <div>{this.props.sendProps.sendProps.signInState.signin ? this.props.history.history.push('/home') : ''}</div>
            <div className="signinSecondDiv">
            <img alt='auctionLogo' src={require('./image/auctionLogo.png')}  />
            <TextField hintText="Email" hintStyle={{color:'white'}} inputStyle={{color:'#ffffffff'}}   onChange={(value) => this.setState({email:value.target.value})} /><br/>
            <TextField type="password"hintStyle={{color:'white'}} inputStyle={{color:'#ffffffff'}} hintText="Password"  onChange={(value) => this.setState({pass:value.target.value})} /><br/>
            <button className="signinButton" onClick={this.SignInHandler.bind(this)}>Sign In</button>
            <p className="siginP">DON'T HAVE AN ACCOUNT ? &emsp; <Link to="/signup" style={{color:'white',textDecoration:'none'}} >SIGN UP</Link></p>
            </div>
            </div>
        )
    }
}

export default SignIn;