import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import Beers from './compnents/Beers';

function App(props) {
  console.log(`App:7 (App) - this.props:`, props);
  return <Beers />;
}

export default connect(state => state.app)(App);
