/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import TodoHomePage from './components/todoPage';


type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={styles.mainPage}>
        <TodoHomePage />
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  mainPage: {
    backgroundColor: "#ffffff"
  }
});