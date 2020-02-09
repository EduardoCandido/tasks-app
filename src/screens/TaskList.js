import React, { Component } from 'react';
import { StyleSheet, Text, View, ImageBackground, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import 'moment/locale/pt-br';
import * as Font from 'expo-font';

import todayImage from '../../assets/imgs/today.jpg';
import commomStyles from '../commomStyles';
import Task from '../components/Task';

export default class TaskList extends Component {

  state = {
    fontLoaded: false,
    tasks: [
      {
        id: Math.random(),
        desc: 'Lavar o pescoço',
        estimateAt: new Date(),
        doneAt: new Date()
      },
      {
        id: Math.random(),
        desc: 'Lavar a moto',
        estimateAt: new Date(),
        doneAt: null
      },
    ],
    showDoneTasks: true
  }

  async componentDidMount(){

    await Font.loadAsync({
      Lato: require('../../assets/fonts/Lato.ttf')
    });

    this.setState({ fontLoaded: true });
  }

  toggleFilter = () =>{
    this.setState({ showDoneTasks: !this.state.showDoneTasks });
    console.log('ok')
  }

  toggleTask = taskId =>{
    const tasks = [...this.state.tasks];

    tasks.forEach(task=>{
      if(task.id == taskId){
        task.doneAt = task.doneAt ? null : new Date();
      }
    });

    this.setState({ tasks });
  }

  render(){ 

    const today = moment().locale('pt-br').format('ddd, D [de] MMMM');

    return (
      <View style={styles.container}> 
        <ImageBackground 
        source={todayImage}
        style={styles.background}>
          <View style={styles.iconBar}>
            <TouchableOpacity onPress={this.toggleFilter}> 
              <Icon name={this.state.showDoneTasks ? "eye" : "eye-slash"} size={40} 
              color={commomStyles.colors.secondary}/>
            </TouchableOpacity>
          </View>
          <View style={styles.titleBar}>
            {this.state.fontLoaded ? ( <Text style={styles.title}>HOJE</Text> ) : null} 
            {this.state.fontLoaded ? ( <Text style={styles.subTitle}>{today}</Text> ) : null}          
          </View>
        </ImageBackground>

        <View style={styles.taskList}> 
          
          { this.state.fontLoaded ? (
          <FlatList data={this.state.tasks} keyExtractor={item => `${item.id}` } renderItem={({item}) =>
          <Task {...item} toggleTask={this.toggleTask}/>}>
          </FlatList>
          ) : null}
       
          
        </View>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background:{
    flex: 3
  },
  taskList:{
    flex: 7
  },
  titleBar:{
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontFamily: commomStyles.fontFamily,
    fontSize: 50,
    color: commomStyles.colors.secondary,
    marginLeft: 20,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: commomStyles.fontFamily,
    color: commomStyles.colors.secondary,
    fontSize: 20,
    marginLeft: 20,
    marginBottom: 30
  },
  iconBar:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 40, 
    marginHorizontal: 25,
  }


});
