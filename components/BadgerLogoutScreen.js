import { deleteItemAsync } from 'expo-secure-store';
import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, TextInput, Button, Alert } from 'react-native';
import {BadgerReadyContext} from '../BadgerReadyContext';
import * as SecureStore from 'expo-secure-store';


function BadgerLogoutScreen(props) {
  const [isReady, setIsReady] = useContext(BadgerReadyContext);
    function isLogout(){
      setIsReady(false),
      SecureStore.deleteItemAsync("key")
    }

    return <View style={styles.container}>
            <Text style={{fontSize :28, textAlign:"center", marginBottom:1, marginTop:10}}>Are you sure you're done?</Text>
            <Text style={{fontSize :20, textAlign:"center",marginBottom:20 }}>Come back soon!</Text>
            <View style={{marginRight:10, borderRadius: 10, backgroundColor:"#8B0000"}} >
            <Button title='LOGOUT' color="#f8f8ff" onPress={isLogout}></Button>
            </View>
        </View>
}

export default BadgerLogoutScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop:1,
        padding: 8,
        marginBottom:180
      }
  });