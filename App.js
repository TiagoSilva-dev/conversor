import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity, } from 'react-native';
import Conversor from './src/Conversor';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {

    return (
      <View style={Styles.container}>
        <Conversor moedaA="USD" moedaB="BRL"/>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#F6F6F6'
  },
});

export default App;

