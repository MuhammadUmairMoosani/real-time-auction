import React, { Component } from 'react';
import '../App.css';
import ComponentRouter from '../components/router';
import { connect } from 'react-redux';
import mapStateToProps from '../components/mapStateToProps';
import mapDispatchToProps from '../components/mapDispatchToProps';

class App extends Component {
  render() {
    
    return (
      <ComponentRouter sendProps={this.props}/>
    );
  }
}


export default connect(mapStateToProps,mapDispatchToProps)(App);