import React, { Component } from 'react'
import {  StatusBar } from 'react-native';

import TabNavigation from "./src/navigation"

export default class App extends Component {
  render () {
    StatusBar.setBarStyle('dark-content');
    return (
      <TabNavigation />
    )
  }
}


