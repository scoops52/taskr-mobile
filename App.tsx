import { StyleSheet, Text, View } from 'react-native';
import Providers from './components/Providers';
import TaskrApp from './screens/TaskrApp';
import {NavigationContainer} from '@react-navigation/native';


export default function App() {
  return (
    <NavigationContainer>
    <Providers>
      <TaskrApp />
    </Providers>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
