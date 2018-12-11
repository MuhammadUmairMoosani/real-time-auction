import React,{ Component } from 'react';
import {TextField} from 'material-ui';
import {Link} from 'react-router-dom';

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            name:'',
            email:'',
            pass:''
        }
    }
    signUphandler() {
       if(this.state.name !== '' && this.state.email !== '' && this.state.pass !== '') {
           this.props.sendProps.sendProps.SignUpDispatch(this.state.email,this.state.pass,this.state.name)
       }
    }
    render() {
        return(
            
            <div className="signinMain">
            <div>{this.props.sendProps.sendProps.signInState.signin ? this.props.history.history.push('/home') : ''}</div>
            <div className="signinSecondDiv">
            <img alt='auctionLogo' src={require('./image/auctionLogo.png')}  />
            <TextField hintText="Name" hintStyle={{color:'white'}}  inputStyle={{color:'#ffffffff'}} onChange={(value) => this.setState({name:value.target.value})} /><br/>
            <TextField hintText="Email" hintStyle={{color:'white'}}  inputStyle={{color:'#ffffffff'}} onChange={(value) => this.setState({email:value.target.value})} /><br/>
            <TextField type="password"hintStyle={{color:'white'}} inputStyle={{color:'#ffffffff'}} hintText="Password"  onChange={(value) => this.setState({pass:value.target.value})} /><br/>
            <button className="signinButton" onClick={this.signUphandler.bind(this)}>Sign Up</button>
            <p className="siginP">I ALREADY HAVE AN ACCOUNT &emsp; <Link to="/" style={{color:'white',textDecoration:'none'}} >SIGN IN</Link></p>
            </div>
            </div>
        )
    }
}

export default SignUp;