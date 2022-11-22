import React, { useCallback, useContext, useEffect, useState } from "react";
import { Text, View,StyleSheet, Button,Alert} from 'react-native';
import BadgerChatMessage from './BadgerChatMessage';
import Modal from "react-native-modal";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import * as SecureStore from 'expo-secure-store';
import { Card } from "react-native-paper";
function BadgerChatroomScreen(props) {
    const details = props.route.name;
    const [messages, setMessages] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const loadMessages = useCallback(() => {
        fetch(`https://coletnelson.us/cs571/f22/hw8/api/chatroom/${details}/messages`)
        .then(res => res.json())
        .then(json => {
            setMessages(json.messages)
        })
    }, [props]);

    useEffect(() => {
        loadMessages()
    }, [props, loadMessages]);

    function refresh(){
        loadMessages();
        Alert.alert("Refresh", "Posts refreshed!")
    }

    //TODO: creat modal for add post
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
      };
    

function getValue() {
    SecureStore.getItemAsync('key').then(result => {
      if (result) {
        if(title === "" || body === ""){
        Alert.alert("Empty Post","You must provide both a title and content!");
    }
    else{
    //fetch the infor within this url,only if user has entered both title and content
    fetch(`https://www.coletnelson.us/cs571/f22/hw5/api/chatroom/${details}/messages`,{
        method: "POST",
        headers:{
            "Content-Type" : "application/json", "Authorization": "Bearer " + result
        },
        body: 
        //below is JS object, need be changed to json,service only accpect json
        JSON.stringify(
        {
            title: title, //assign value to titlex
            content: body //assign value to content
        })
    }).then(res =>{
        //IF res.status is 401
        if(res.status === 401){
            alert("You must be logged in to post!");
        }
        if(res.status === 200) {
            return res.json();
        }
    }).then(json =>{
        if (json.msg) { 
        Alert.alert("Successfully Post","Successfully posted message!")
        loadMessages()
    } })
}
      } else {
        Alert.alert('Please Login','Please Login');
      }
    });
  }

    return (<View style={{ flex:1}}>
        <ScrollView style={{ flex:1}}>
            { messages.map((ms) => {return<BadgerChatMessage key = {ms.id} {...ms}/> })}
        </ScrollView>

        <View style={{backgroundColor:"#8B0000"}} >
            <Button title="ADD POST" color="#f8f8ff" onPress = {toggleModal} />
        </View>

        <Modal isVisible={isModalVisible}>
            <View style={styles.modalView}>
                <Text style={{fontSize:30,marginBottom:10}}>Create A Post</Text>
                    <Text style={styles.modalText}>Title</Text>
                    <TextInput style={styles.modalTitle} placeholder="Title of posts" onChangeText={text => setTitle(text)} value={title} ></TextInput>
                    <Text style={styles.modalText}>Body</Text> 
                    <TextInput style={styles.modalBody} placeholder="Contents..." onChangeText={text => setBody(text)} value={body}></TextInput>

                    <View style={styles.forPost} >
                    <Button title="POST" color="#f8f8ff" onPress={getValue} ></Button>
                    </View>

                    <View style={styles.forCancel} >
                    <Button title="CANCEL" color="#f8f8ff"onPress={toggleModal} />
                    </View>

                </View>
         </Modal>
                
                <View style={{backgroundColor:"#808080"}} >
                <Button title="REFRESH" color="#f8f8ff" onPress = {refresh} />
                </View>
                
    </View>)
}

export default BadgerChatroomScreen;

const styles = StyleSheet.create({
        modalView: {
            margin: 10,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 35,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5
        },
      modalText: {
        fontSize:19,
        marginTop: 1,
        marginBottom: 3,
        textAlign: "left"
      },
      modalTitle:{
        backgroundColor: "snow",
        margin: 10,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 20,
      },

      modalBody:{
        backgroundColor: "snow",
        margin: 10,
      borderColor: 'gray',
      borderWidth: 1,
      padding: 80,
      marginBottom:20
      },
      forPost:{
        marginBottom:10, marginLeft:10, marginRight:10, borderRadius: 10,backgroundColor:"#8B0000"
      },
      forCancel:{
        marginLeft:10, marginRight:10, borderRadius: 10,backgroundColor:"#808080"
      }
  });