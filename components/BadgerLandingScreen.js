import { Text, View,StyleSheet} from 'react-native';
function BadgerLandingScreen(props) {
    return <View style={styles.container}>
        <Text style={{fontSize :28, textAlign:"center", marginBottom:20, marginTop:30}}>Welcome to BadgerChat!</Text>
        <Text style={{fontSize :18, textAlign:"scretch", marginLeft:30}}>Navigate to chatroom via the drawer to get started.</Text>
    </View>
}

export default BadgerLandingScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingTop:1,
        padding: 2,
      },
  });