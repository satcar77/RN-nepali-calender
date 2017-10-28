import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  Picker,
  AsyncStorage,
} from 'react-native';
import {Spinner, Icon,Content} from 'native-base';
export default class LoadingScreen extends Component{

    render(){
        return(
            <Content>
              <Spinner color='red' />
              <Text style={{fontSize : 20, textAlign:'center'}}>{this.props.message}</Text>
            </Content>
        );
    }
}