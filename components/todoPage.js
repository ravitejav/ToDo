/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Alert, AsyncStorage} from 'react-native';
import {Button} from 'react-native-material-ui';
import {Icon} from 'react-native-vector-icons/MaterialIcons'
type Props = {};

export default class TodoHomePage extends Component<Props> {

  constructor(props) {
    super(props);
    this._retrieveData();
  }

  toggleDialog = (toggle) => {
    this.setState({dialog: toggle}, () => this._storeData());
  }

  updateValue = (name, value) => {
    this.state = {
      ...this.state,
      [name]: value.nativeEvent.text,
    }
    this._storeData();
  }

  addTodo = () => {
    this.setState({
      data: [
        ...this.state.data, 
        {
          'title': this.state.title,
          'desc': this.state.desc,
          'status': false
        },
      ],
      dialog: false,
    }, () => this._storeData());
  }

  askForCompletion = index => {
    let desc = "Did you completed " + this.state.data[index].title + " ?";
    if(this.state.data[index].status === true) {
      desc = "Did you want to remove" + this.state.data[index].title + " ?";
    }
    Alert.alert(
      "Todo",
      desc,
      [
        {
          text: "Yes",
          onPress: () => this.completeTask(index),
          style: "ok"
        },
        { text: "No" }
      ],
      { cancelable: false }
    );
  }

  _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'localState',
        this.state
      );
    } catch (error) {
      // Error saving data
    }
  };

  _retrieveData = async () => {
    try {
      this.state = {
        data: [],
        dialog: false,
        title: "",
        desc: ""
      };
      const value = await AsyncStorage.getItem('localState');
      if (value !== null) {
        this.state = value;
      }
    } catch (error) {
      
    }
  };

  completeTask = index => {
    const data = this.state.data;
    if(data[index].status)
      data.splice(index, 1);
    else
      data[index].status = true;
    this.setState({ data: [ ...data] },() =>  this._storeData());
  }

  render() {
    return (
        <View style={styles.mainPage}>
          
          <View style={styles.header}>
            <Text style={styles.title}>Your Todo List</Text>
          </View>
          {!this.state.dialog ?
          (<View style={styles.todoList}>
            {this.state.data.length === 0 
              ? <Text style={styles.noTodo}>No Todos</Text> 
              : (
                  <ScrollView style={styles.list}>
                    {this.state.data.map((todo,i) => (
                      <TouchableOpacity onPress={() => this.askForCompletion(i)} style={[styles.todo, todo.status ? styles.completed : styles.nonCompleted]} key={i}>
                        <Text style={styles.todoHeader}>{todo.title}</Text>
                        <Text style={styles.todoDesc}>{todo.desc}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
              )}
            <View>
                <Button onPress={() => this.toggleDialog(true)} text="New Todo" large raised={true} primary={true}></Button>
            </View>
          </View>)
          :(
            <View style={styles.todoList}>
              <Text style={styles.todoHeader}>Title</Text>
              <TextInput style={styles.textInput} onChange={text => this.updateValue("title", text)} />
              <Text>{'\n'}</Text>
              <Text style={styles.todoHeader}>Description</Text>
              <TextInput style={styles.textInput} onChange={text => this.updateValue("desc", text)}  />
              <Text>{'\n'}</Text>
              <Button text="Add Todo to list" large raised={true} accent={true} onPress={() => this.addTodo()}></Button>
            </View>
          )}
        </View>  
    );
  }
}

const styles = StyleSheet.create({
  mainPage: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%', 
  },
  header: {
    flex: 0.08, 
    height: 40,
    width: '100%',
    backgroundColor: '#909090',
  },
  title: {
    fontSize: 40,
    marginLeft: 4,
  },
  todoList: {
    flex: 0.92,
    flexDirection:"column",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20
  },
  todo: {
    height: 70,
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    borderRightWidth: 9,
    flexDirection:"column",
    marginBottom: 9,
  },
  todoHeader: {
    paddingLeft: 5,
    height: 26,
    fontSize: 20,
    color: '#000000',
  },
  todoDesc: {
    paddingLeft: 5,
    height: 42,
    color: '#232323',
  },
  nonCompleted :{
    borderColor: 'red',
  },
  completed: {
    borderColor: 'green',
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#000000",
    height: 40,
    padding: 10,
    borderRadius: 6,
  },
  noTodo: {
    flex: 0.92,
    alignSelf: "center",
    paddingTop: '50%',
    fontSize: 40,
  }
});