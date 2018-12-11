import React,{ Component } from 'react';
import {Tabs, Tab,RaisedButton} from 'material-ui';
import Auctioneer from './auctioneer';
import Bidder from './bidder';
import * as firebase from 'firebase';

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            value:'a'
        }
    }
    handleChange = (value) => {
        this.setState({
          value: value,
        });
      };
      logoutButtonHandler() {
       // firebase.auth().signOut().then(() => this.props.history.history.push("/") )
       // console.log("Reminder",this.props.history.history.push("/"))
       this.props.sendProps.sendProps.logOut();
       this.props.history.history.push("/")
      }
    render() {
        
const styles = {
    headline: {
      fontSize: 24,
      paddingTop: 16,
      marginBottom: 12,
      fontWeight: 400,
    },
  };
        return (
          <div>
          <div className="homePageSignoutButton">
          <RaisedButton onClick={this.logoutButtonHandler.bind(this)} buttonStyle={{backgroundColor:"#00bcd4",paddingBottom:40,paddingTop:5,zIndex:1}} label="Sign out"/>
          </div>
                      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        >
        <Tab label="Auction" value="a">
          <Auctioneer sendProps={this.props} />
        </Tab>
        <Tab label="Bid" value="b">
           <Bidder sendProps={this.props}/>
        </Tab>
        <Tab label="Sold" value="c">
           <div>Sold</div>
        </Tab>
        <Tab label="Bought" value="d">
           <div>Bought</div>
        </Tab>
      </Tabs>
            </div>
        )
    }
}

export default HomePage;