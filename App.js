/**
 * Tetris
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

const figures = [

  {xy: [4,5,14,15], type: 1}, // O
  {xy: [4,14,24,34], type: 2}, // I
  {xy: [5,15,25,24], type: 3}, // J
  {xy: [4,14,24,25], type: 4}, // L
  {xy: [4,14,15,25],type: 5}, // S
  {xy: [5,15,14,24], type: 6}, // Z
  {xy: [4,5,6,15], type: 7}, // M

];

const colors = ['#00adb5', '#f38181', '#ff9a3c', '#62d2a2'];
let interval;

function Block({item, current, landed}){
  let marked = 0;
  let cur = current[0];
  let color = '#313d43';

  //check if block is part of current figure
  if(current[0] != undefined){
  if( current[0].includes( item.key ) ){
    marked = 1;
    color = current[1];
  }}

  //check if block is part of landed figures
  landed.forEach((figure)=>{
    if(figure[0].includes( item.key )){
      marked = 1;
      color = figure[1];
    }
  });

  return(
    <View style={[ { backgroundColor: color }, styles.item]}>
      <Text style={styles.title}>{  /* item.key */ }</Text>
    </View>
  );
}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gridList: Array.from(Array(200), (x,index)=>{ a=index; index++; return {key: a};}),
      currentFigure: [],
      landedFigures: [],
      start: false,
      type: '',
      rotation: '',
      score: 0
    };
  }

  toggleGameStatus() {
    const { start, currentFigure } = this.state;
    let figure = this.chooseFigure();

    if(start == false){
      if(currentFigure.length!= 0){
        this.setState({ start: true });
      }else{
        this.setState({ currentFigure: [figure.xy, this.chooseColor()], start: true, type: figure.type, rotation: 0});
      }

      interval = setInterval(() => {
        if(this.checkFloor()){
          this.countLanded();
        };
        this.moveDown();
      }, 300);
    }else{
      clearInterval(interval);
      this.setState({ start: false });
    }
  }

  chooseFigure() {
    return figures[Math.floor(Math.random()*figures.length)]
  }

  chooseColor() {
    return colors[Math.floor(Math.random()*colors.length)]
  }

  moveDown(){
    const { currentFigure } = this.state;
    let arr = currentFigure[0];

    const newArray = [];
    for (let i = 0; i < arr.length; i++) {
        newArray[i] = arr[i] + 10;
    }

    this.setState({currentFigure: [newArray, currentFigure[1]] });
  }

  moveLeft(){
    const { currentFigure } = this.state;
    let arr = currentFigure[0];
    const newArray = arr.map( (item) => {
      return item-1;
    });
    this.setState({currentFigure: [newArray, currentFigure[1]] });
  }

  moveRight(){
    const { currentFigure } = this.state;
    let arr = currentFigure[0];
    const newArray = arr.map( (item) => {
      return item+1;
    });
    this.setState({currentFigure: [newArray, currentFigure[1]] });
  }

  moveRotate(){
    const { currentFigure, type, rotation } = this.state;
    

    if(type === 2){  
      let a0 = currentFigure[0][0];
      switch (rotation){
        case 0: {
          this.setState({currentFigure: [[a0, a0+1, a0+2, a0+3], currentFigure[1]], rotation: 1 });
          break;
        }
        case 1: {
          this.setState({currentFigure: [[a0, a0+10, a0+20, a0+30], currentFigure[1]], rotation: 0 });
          break;
        }
      }
    }

    if(type === 3){
      let a1 = currentFigure[0][1];
      let a3 = currentFigure[0][3];
      switch(rotation){
        case 0: {
          this.setState({currentFigure: [[a1-1, a1, a1+1, a3-20], currentFigure[1]], rotation: 1 });
          break;
        }
        case 1: {
          this.setState({currentFigure: [[a1-10, a1, a1+10, a3+2], currentFigure[1]], rotation: 2 });
          break;
        }
        case 2: {
          this.setState({currentFigure: [[a1-1, a1, a1+1, a3+20], currentFigure[1]], rotation: 3 });
          break;
        }
        case 3: {
          this.setState({currentFigure: [[a1-10, a1, a1+10, a3-2], currentFigure[1]], rotation: 0 });
          break;
        }
      }
    }

    if(type === 4){
      let a1 = currentFigure[0][1];
      let a3 = currentFigure[0][3];
      switch(rotation){
        case 0: {
          this.setState({currentFigure: [[a1-1, a1, a1+1, a3-2], currentFigure[1]], rotation: 1 });
          break;
        }
        case 1: {
          this.setState({currentFigure: [[a1-10, a1, a1+10, a3-20], currentFigure[1]], rotation: 2 });
          break;
        }
        case 2: {
          this.setState({currentFigure: [[a1-1, a1, a1+1, a3+2], currentFigure[1]], rotation: 3 });
          break;
        }
        case 3: {
          this.setState({currentFigure: [[a1-10, a1, a1+10, a3+20], currentFigure[1]], rotation: 0 });
          break;
        }
      }
    }

    if(type === 5){  
      let a1 = currentFigure[0][1];
      switch (rotation){
        case 0: {
          this.setState({currentFigure: [[a1-10, a1, a1-1, a1-9], currentFigure[1]], rotation: 1 });
          break;
        }
        case 1: {
          this.setState({currentFigure: [[a1-10, a1, a1+1, a1+11], currentFigure[1]], rotation: 0 });
          break;
        }
      }
    }

    if(type === 6){  
      let a1 = currentFigure[0][2];
      switch (rotation){
        case 0: {
          this.setState({currentFigure: [[a1-11, a1-10, a1, a1+1], currentFigure[1]], rotation: 1 });
          break;
        }
        case 1: {
          this.setState({currentFigure: [[a1-9, a1+1, a1, a1+10], currentFigure[1]], rotation: 0 });
          break;
        }
      }
    }

    if(type === 7){
      let a2 = currentFigure[0][2];
      switch(rotation){
        case 0: {
          this.setState({currentFigure: [[a2, a2+10, a2+20, currentFigure[0][3]], currentFigure[1]], rotation: 1 });
          break;
        }
        case 1: {
          this.setState({currentFigure: [[a2, a2-1, a2-2, currentFigure[0][3]], currentFigure[1]], rotation: 2 });
          break;
        }
        case 2: {
          this.setState({currentFigure: [[a2, a2-10, a2-20, currentFigure[0][3]], currentFigure[1]], rotation: 3 });
          break;
        }
        case 3: {
          this.setState({currentFigure: [[a2, a2+1, a2+2, currentFigure[0][3]], currentFigure[1]], rotation: 0 });
          break;
        }
      }
    }
  }

  checkFloor(){
    const { currentFigure, landedFigures } = this.state;
    let hit = 0;
    let arr = currentFigure[0].slice().sort();

    if(arr[3] + 10 >= 200){
      hit = 1;
      //console.log('hit floor');
    }

    for(let i=0; i < currentFigure[0].length; i++){
      landedFigures.forEach( item => {
        if(item[0].includes(currentFigure[0][i] + 10)){
          hit = 1;
          //console.log('hit figure');
        }
      });
    }
    
    return hit;
  }

  countLanded(){
    const { currentFigure, landedFigures } = this.state;
    landedFigures.push( currentFigure );
    this.setState({landedFigures: landedFigures});
    this.checkRows();

    //start with new figure
    let figure = this.chooseFigure();
    this.setState({currentFigure: [figure.xy, this.chooseColor()], type: figure.type, rotation: 0 });
  }

  checkRows(){
    const { landedFigures } = this.state;

    for(let i=20; i>0; i--){
      let count = 0;

      for(let j=1; j<=10; j++){
        let block = i*10 - j;
        landedFigures.forEach( (item) => {
          if(item[0].includes(block) ){
            count++;
          }
        });
      }

      if(count == 10){
        //console.log('row ' + i + ' has been filled');
        this.removeFullRows(i);
      }
    }
  }

  removeFullRows(row){
    const { score, landedFigures } = this.state;
    let helpArr = landedFigures;

    //look for items and remove them to clear row
    for(let i=row * 10; i > (row-1)*10; i--){
      let index = i-1;
      let arr = [];

      helpArr.forEach( (item)=> {
        let res = item[0].filter( (i) => i != index );
        arr.push( [ res, item[1]] );
      });

      helpArr = arr;
    }

    //update all fields to go one row down
    arr = [];
    helpArr.forEach( (item)=> {
      let res = item[0].map( (i) => i+10 );
      arr.push( [ res, item[1]] );
    });

    //update landed figures plus game score
    this.setState({landedFigures: arr, score: score + 10 });
  }

  render() {
    const { gridList, currentFigure, landedFigures, start, score } = this.state;
    let icon;
    if(!start){
      icon = <Icon name="play" size={42} color="#d0c07f" />;
    }else{
      icon = <Icon name="pause" size={42} color="#d0c07f" />
    }
    return (
      <SafeAreaView style={styles.container}>
        
        <Text style={styles.score}>Score: {  score }</Text>
        <FlatList
            style={styles.grid}
            data={gridList}
            renderItem={({ item }) => (<Block item={item} current={currentFigure} landed={landedFigures}/>)}
            keyExtractor={item => item.key}
            numColumns={10}
            refreshing={false}
        />
        
          
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={this.moveLeft.bind(this)}>
            <View style={styles.button}>
              <Icon name="arrow-left" size={42} color="#d0c07f" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.moveRotate.bind(this)}>
            <View style={styles.button}>
              <Icon name="undo" size={42} color="#d0c07f" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.toggleGameStatus.bind(this)}>
            <View style={styles.button}>
              {icon}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.moveRight.bind(this)}>
            <View style={styles.button}>
              <Icon name="arrow-right" size={42} color="#d0c07f" />
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c1b23'
  },
  item: {
    height: 25,
    width: 25,
    maxWidth: 30,
    margin: 2,
    borderRadius: 3
  },
  grid: {
    margin: 0,
    padding: 0
  },
  btnContainer:{
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  button:{
    backgroundColor: '#112d4e',
    padding: 10,
    borderRadius: 8,
  },
  score:{
    color: '#fff',
    fontWeight: '700'
  }
});

export default App;
