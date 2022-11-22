import { Card, Text} from "react-native-paper";
import {StyleSheet } from 'react-native';
function BadgerChatMessage(props) {
    return <Card style={styles.forCard}>
    <Text style={{fontSize:26}}>{props.title}</Text>
    <Text style={{fontSize:20}}>{props.content}</Text>
    </Card>
}

export default BadgerChatMessage;

const styles = StyleSheet.create({
    forCard: {
        alignItem: 'center',
    margin:6
      },
  });