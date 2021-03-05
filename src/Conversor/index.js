import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, TextInput, TouchableOpacity,Keyboard } from 'react-native';
import api from '../api/api';
import apiconversor from '../api/apiconversor';

import { Picker } from '@react-native-picker/picker';


class Conversor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selecionada1: 0,
      selecionada2: 0,
      moedaA: this.props.moedaA,
      moedaB: this.props.moedaB,
      valorConvertido: 0,
      moedaValor: 0,
      moedas: [],
      descricao:[],
    };
    this.converter = this.converter.bind(this);
    this.mostrarCuriosidade = this.mostrarCuriosidade.bind(this);
  }
  mostrarCuriosidade(){
    alert('aaa');
  }
 

  async componentDidMount(){
     const resp = await apiconversor.get('/').then((res)=>{
       this.setState({
         moedas: res.data
       });
     });
     let numeroAleatorio = Math.floor(Math.random() * this.state.moedas.length);
      this.setState({
        descricao: this.state.moedas[numeroAleatorio].sobre 
      }) 
  }


  async converter() {
    let moeda1 = this.state.moedas[this.state.selecionada1].moeda;
    let moeda2 = this.state.moedas[this.state.selecionada2].moeda;

    if (moeda1 === moeda2 || this.state.moedaValor === '') {
      alert('você precisa escolher moedas diferentes !');
      return;
    } else {

      let moeda = moeda1 + '_' + moeda2;
      
      const response = await api.get(`convert?q=${moeda}&compact=ultra&apiKey=37b7b6e7e78a78f913a4`).then((res) => {
        let cotacao = res.data[moeda];
        let resultado = (cotacao * parseFloat(this.state.moedaValor));
        this.setState({
          valorConvertido: resultado.toFixed(2),
        });
        Keyboard.dismiss();
      });

    }

  }
  render() {

    let currencyA = this.state.moedas.map((v, k) => {
      return <Picker.Item value={k} key={k} label={v.moeda + ' ' +v.name} />;
    });
    let currencyB = this.state.moedas.map((v, k) => {
      return <Picker.Item value={k} key={k} label={v.moeda + ' ' +v.name} />;
    });
     
    return (
      <View style={Styles.container}>
        <Text style={Styles.home}>Conversor de Moedas</Text>
        <View style={Styles.vwtitulo}>

          <View style={Styles.vwpicker}>
            <Picker style={Styles.picker} selectedValue={this.state.selecionada1} onValueChange={(itemValue, itemIndex) => this.setState({
              selecionada1: itemValue
            })}>
              {currencyA}
            </Picker>
            <Text style={Styles.titulo}>-</Text>
            <Picker style={Styles.picker} selectedValue={this.state.selecionada2} onValueChange={(itemValue, itemIndex) => this.setState({
              selecionada2: itemValue
            })}>
              {currencyB}
            </Picker>
          </View>

        </View>

        <View style={Styles.vwtitulo}>
          <TextInput
          keyboardType='numeric'
          placeholder="Digite o valor para converter" style={Styles.input}
            onChangeText={(text) => this.setState({ moedaValor: text })} />
        </View>

        <View style={Styles.vwtitulo}>
          <TouchableOpacity style={Styles.btn} onPress={this.converter}>
            <Text style={Styles.btnTexto}>Converter</Text>
          </TouchableOpacity>
        </View>

        <View>
          <Text style={Styles.resultado}>{ (this.state.valorConvertido) == 0 ? '' : this.state.valorConvertido +' R$'  }</Text>
        </View>

        <View style={Styles.vwdescricao}>
          <Text style={Styles.descTitulo}> Você Sabia ?</Text>
          <Text style={Styles.descricao}>{this.state.descricao}</Text>
        </View>
        
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  descTitulo:{
    fontSize:20,
    fontWeight:'bold',
    alignItems:'center',
    textAlign:'center'
  },
  descricao:{
    fontStyle:'italic',
    color:'#000',
    fontSize:15,
    padding:10
  },
  vwdescricao:{
    padding:5,
    textAlign:'center',
    flex:1,
    justifyContent: 'center',
    
  },
  container: {
    flex: 1,
    marginTop: 90,
    alignItems: 'center',
    backgroundColor:'#F6F6F6'
  },
  vwtitulo: {
    padding: 10
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  home: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  picker: {
    width: 150,
    fontWeight: 'bold',
    backgroundColor:'#FFF'

  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#2222',
    color: '#000',
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 10,
    backgroundColor: '#2222'
  },
  btn: {
    width: 100,
    height: 50,
    textAlign: 'center',
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'red',
  },
  btnTexto: {
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold'
  },
  resultado: {
    fontSize: 30,

  },
  vwpicker: {
    flexDirection: 'row',
    fontSize: 15
  }
});

export default Conversor;

