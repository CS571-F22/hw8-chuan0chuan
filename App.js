// Keep this here!
// https://github.com/software-mansion/react-native-reanimated/issues/2301#issuecomment-1147238372
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useEffect, useContext, useState } from 'react';
import { Text, View} from 'react-native';
import BadgerLoginScreen from './components/BadgerLoginScreen';
import {BadgerAuthContext} from './BadgerAuthContext';
import {BadgerReadyContext} from './BadgerReadyContext';
import BadgerLandingScreen from './components/BadgerLandingScreen';
import BadgerChatroomScreen from './components/BadgerChatroomScreen';
import BadgerLogoutScreen from './components/BadgerLogoutScreen';

const BadgerChatroomDrawer = createDrawerNavigator();

export default function App() {
  //set state be false for login page
  const [isReady, setIsReady] = useState(false);
  const [chatrooms, setChatrooms] = useState([]);
  const [authToken, setAuthToken] = useState([]);
  //fetch all the chatrooms
  useEffect(() => {
      fetch('https://coletnelson.us/cs571/f22/hw8/api/chatroom').then(res => res.json()).then(json => {
        setChatrooms(json)
      })
    }, []);
  if(isReady){
    //if successfully login return landing drawer page
    return <BadgerReadyContext.Provider value={[isReady, setIsReady]}>
              <NavigationContainer>
            <BadgerChatroomDrawer.Navigator>
              <BadgerChatroomDrawer.Screen name="Landing" component={BadgerLandingScreen}></BadgerChatroomDrawer.Screen>
            {
              chatrooms.map((chatroom,i)=> {
                  return <BadgerChatroomDrawer.Screen key ={i} name={chatroom} component={BadgerChatroomScreen}/> 
                })
            }
             <BadgerChatroomDrawer.Screen name="Logout" component={BadgerLogoutScreen}/>
            </BadgerChatroomDrawer.Navigator>
    </NavigationContainer>
    </BadgerReadyContext.Provider>
  }else{
    //else remain login page
      return<BadgerReadyContext.Provider value={[isReady, setIsReady]}>
              
                <BadgerLoginScreen></BadgerLoginScreen>   
            </BadgerReadyContext.Provider>
          
  }
}
