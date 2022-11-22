import { Text, View, StyleSheet, TextInput, Button, Alert,Image } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import {BadgerAuthContext} from '../BadgerAuthContext';
import {BadgerReadyContext} from '../BadgerReadyContext';
import * as SecureStore from 'expo-secure-store';


function BadgerLoginScreen(props) {
    const [authToken, setAuthToken] = useState();
    const [isReady, setIsReady] = useContext(BadgerReadyContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    function signUp(){
        Alert.alert("Sign Up","Please sign up on our website!")
    }
    async function handleLogin(){
      const res = await fetch("https://www.coletnelson.us/cs571/f22/hw5/api/login",{
            method: "POST" ,
            headers :{
                "Content-Type" : "application/json"
            },
            body: 
            //below is js object, need be changed to json,service only accpect json
            JSON.stringify(
            {
                username: username, //assign value to username
                password: password  //assign value to password
            })
            })
            .then(res =>{
                //If res.status is 404 then 
                if (res.status === 404 || res.status === 401){
                    Alert.alert("Incorrect Login","Please try again!");
                }
                //If the login is successful, the following 200 will be sent and return json. and navigation.
                if(res.status === 200) {
                  setIsReady(true)
                }
                return res.json();
            })
           .then(json =>{ 
            if(json.token!=undefined){
            SecureStore.setItemAsync('key', json.token).then(() => {
              setAuthToken("");
            }) }
            }
            )
    }

    
    return <View style={styles.container}>
      <Image style={{width: 110, height: 135}}source={require('../assets/BadgerChatIcon.jpeg')}
      />
        <Text style={{fontSize: 36,  marginBottom: 30}}>BadgerChat Login</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            clearTextOnFocus
            placeholder = "Username"
            placeholderTextColor="#696969"
            onChangeText={text => setUsername(text)}
            value={username}
        />
        </View>
        
        <View style={styles.inputView}>
          <TextInput
          style={styles.textInput}
          clearTextOnFocus
          placeholder = "Password"
          placeholderTextColor="#696969"
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </View>
      
      <View style={styles.fixToText}>
        <View style={{marginRight:10, borderRadius: 10,backgroundColor:"#8B0000"}} >
        <Button title="LOGIN"  color="#f8f8ff" onPress={handleLogin}></Button>
        </View>
        <View style={{marginLeft:10, borderRadius: 10,backgroundColor:"#808080"}} >
        <Button title="SIGNUP" color="#f8f8ff" onPress={signUp}></Button>
        </View>
      </View>
    </View>
}

export default BadgerLoginScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        alignItems: 'center',
        marginBottom:150
      },
      inputView: {
        borderRadius: 30,
        width: "66%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        borderWidth:1
      },
    textInput: {
      fontSize: 18,
      height: 50,
      flex: 1,
      padding: 10,
      marginLeft: 20,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  });