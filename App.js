

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
} from 'react-native';
import {StyleProvider,Container, Header, Left, Body, Right, Button, Icon, Title,Tabs,Tab, Content, Card,CardItem ,Thumbnail ,Item,  TabHeading} from 'native-base';

import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import LoadingScreen from './LoadingScreen'
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material'; 
let json = require ("./currentYear.json");
let adbs = require("ad-bs-converter");
const months= ['Baishakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir','Poush','Magh', 'Falgun', 'Chaitra'];
export default class App extends Component{

constructor(props){
  super(props);
  this.state={
    monthIndex : 0 , 
    nepDate : null,
    isLoading: true
  }
}

loadData(){
  let date=new Date();
  let equ=adbs.ad2bs(date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate());
     this.setState({
      monthIndex: equ.en.month-1,
      nepDate : equ, 
      isLoading: false
    })
}


componentDidMount(){
  this.loadData();
  }

  selectDay(){
    let e=this.state.nepDate;
    let monthData= json[months[e.en.month-1]];
    monthData.map((d,i)=>{
      if (d.np == e.en.day){
        json[months[e.en.month-1]][i].highlight=true;
      }
    })
  }
left(){

  const prev=this.state;
  let m= this.state.monthIndex;
  m--;
  if(m < 0) {
    m=11;
  }
  this.setState({
    monthIndex : m,
    nepDate : prev.nepDate,
  }
  )
}
right(){
  const prev=this.state;
  let m= this.state.monthIndex;
  m++;
  if(m > 11) {
    m=0;
  }
  this.setState({
    monthIndex : m,
    nepDate : prev.nepDate,
  }
  )
  
}

renderListItem(rowData,i){
  if(!rowData.np)
  return;
  return(
    <Card key={i}>
      <CardItem header style={rowData.highlight ? styles.thisListDay : (rowData.holiday || rowData.day == 'Sat'?{backgroundColor:'#FFEBEE'}:{})}>
        <Left>
        
        <Text style= {rowData.highlight? {color: '#fff',fontWeight: 'bold', fontSize : 40}:{fontWeight: 'bold', fontSize : 40}}>{rowData.np} |</Text>
        
       <Text style={rowData.highlight? {color: '#fff',paddingLeft : 10}:{paddingLeft: 10}}>{rowData.tithi} 
        {"\n"}
       <Text style= {rowData.highlight ? {fontWeight: 'bold', fontSize: 15, color : '#fff'}:{fontWeight: 'bold', fontSize: 15}}>{rowData.event}</Text> 
       </Text>

       </Left>
       <Right>
       <Text style= {rowData.highlight? {fontWeight: 'bold', fontSize : 20, color :'#fff'}:{fontWeight: 'bold', fontSize : 20}}>{rowData.day.toUpperCase()}</Text>
         </Right>

    </CardItem>
    </Card>
  );
}

renderGridItems(monthIndex){
  let l=[];
    const data =json[months[monthIndex]];
    for(let i=0; i< data.length ; i=i+7){
      let n=[];
    for(let j=0;j< 7; j++){
      if(data[i+j].highlight)
      n.push(this.ele(data[i+j].np,data[i+j].tithi,data[i+j].event,data[i+j].holiday,data[i+j].day,data[i+j].highlight));
      else
      n.push(this.ele(data[i+j].np,data[i+j].tithi,data[i+j].event,data[i+j].holiday,data[i+j].day,false));
    }
      l.push(n);
    }
  
    return l;

}
ele(date , tithi, occasion, isHoliday,day,highlight) { return(
  
          <View style={highlight ? styles.thisday :(isHoliday|| day === 'Sat'?{backgroundColor: '#FFEBEE',height : 119}:{height: 120})}>
            <Text style={highlight?{fontSize : 10,textAlign : 'center',color :'#fff'}:{fontSize : 10,textAlign : 'center',}}>{tithi} </Text>   
             <Text style={highlight?{fontWeight: 'bold', fontSize : 24,textAlign : 'center',color :'#fff'}:{fontWeight: 'bold', fontSize : 24,textAlign : 'center',}}>{date}</Text>
            <Text style={highlight?{fontSize : 12,textAlign : 'center',fontWeight: 'bold',color :'#fff'}:{fontSize : 12,textAlign : 'center',fontWeight: 'bold'}}>{occasion}</Text>
          </View>
  
      );
    }
    _timedScroll(d) {

      this._scroll.scrollTo({x: 0, y: 80*d, animated: true});
    
      }
  render() {
    const days=['आइतबार','सोमबार','मंगलबार','बुधबार','बिहिबार','शुक्रबार','शनिबार'];
    if(this.state.isLoading){
      return (
        <LoadingScreen message={this.message}/>
      )
    }
    this.selectDay();
    setTimeout(()=>this._timedScroll(this.state.nepDate.en.day),2009);
    return (
      <StyleProvider style={getTheme(material)}>
      <Container>
        
        <Header hasTabs style= {{justifyContent :'center', flex: 0}}>
          <Left>
          <Button transparent onPress={()=>this.left()}>
          <Icon name='arrow-round-back' />
        </Button>
          </Left>
          <Body>
        <View style={{ flexDirection: 'row', justifyContent : 'center'}}>
            <Text style={{fontSize : 20 ,color: 'white'}}>{months[this.state.monthIndex]} </Text>
       
        </View>
        </Body>
          <Right>

         
          <Button transparent onPress={()=>this.right()}>
          <Icon name='arrow-round-forward' />
          </Button>
          </Right>
        </Header>

        <Tabs initialPage={0}>
          <Tab heading={ <TabHeading><Icon name='menu'/></TabHeading>}>
  
          <ScrollView ref={(c)=> this._scroll=c} >
       {json[months[this.state.monthIndex]].map(this.renderListItem)}
     
      </ScrollView>
          </Tab>
          <Tab heading={ <TabHeading><Icon name='grid'/></TabHeading>}>
            <ScrollView>
              <Table>
                <Row data={days} style={styles.head} textStyle={{fontWeight : 'bold',textAlign: 'center', color : 'white',fontSize: 10 }} />
                <Rows data={this.renderGridItems(this.state.monthIndex)} style={styles.row} textStyle={styles.text} />
                
              </Table>
            </ScrollView>
          </Tab>

        </Tabs>
      </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  dark:{
    backgroundColor: '#424242'
  },
  list: {
    justifyContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap'
},
  container: {
    flex : 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thisday:{
    backgroundColor: '#795548',
    height : 119,

  },
  thisListDay:{
    backgroundColor: '#795548',
  },
  icon: {
    width: 26,
    height: 26,
  },
  item: {
    backgroundColor: '#CCC',
    margin: 5,
    width: 50,
    height: 50
},
table: { width: 360 },
head: { height: 30, backgroundColor: '#009688' },
text: { textAlign: 'center' },
row: { height: 120, flexDirection: 'row' },
});
