import { StyleSheet, Text, View } from 'react-native';
import Providers from './components/Providers';
import TaskrApp from './screens/TaskrApp';


export default function App() {
  return (
    <Providers>
      <TaskrApp />
    </Providers>
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
