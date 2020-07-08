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
import Icon from 'react-native-vector-icons/FontAwesome';
type Props = {};

export default class TodoHomePage extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      dialog: false,
      title: '',
      desc: ''
    };
  }

  toggleDialog = (toggle) => {
    this.setState({dialog: toggle});
  }

  updateValue = (name, value) => {
    this.state = {
      ...this.state,
      [name]: value.nativeEvent.text,
    }
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
    });
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

  completeTask = index => {
    const data = this.state.data;
    if(data[index].status)
      data.splice(index, 1);
    else
      data[index].status = true;
    this.setState({ data: [ ...data] });
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
              <Button text="Add Todo" large raised={true} primary={true} onPress={() => this.addTodo()}></Button>
              <Text>{'\n'}</Text>
              <Button text="Cancel" large raised={true} accent={true} onPress={() => this.setState({dialog: false})}></Button>
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
    height: 80,
    backgroundColor: '#ff6ec7',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 9,
    fontWeight: "900",
  },
  title: {
    fontSize: 40,
    marginLeft: 4,
    alignSelf: "center",
    padding: 16,
  },
  todoList: {
    flex: 1,
    flexDirection:"column",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20
  },
  todo: {
    height: 90,
    width: '100%',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: '#000000',
    borderRightWidth: 9,
    flexDirection:"column",
    marginBottom: 9,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 5,
  },
  todoHeader: {
    paddingLeft: 5,
    height: 26,
    fontSize: 26,
    color: '#000000',
    marginBottom: 4,
  },
  todoDesc: {
    paddingLeft: 5,
    height: 42,
    color: '#232323',
  },
  nonCompleted :{
    borderRightColor: 'red',
  },
  completed: {
    borderRightColor: 'green',
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