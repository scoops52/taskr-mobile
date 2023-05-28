import { StyleSheet, Text, View } from "react-native";
import Providers from "./components/Providers";
import TaskrApp from "./screens/TaskrApp";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { GestureHandlerRootView } from "react-native-gesture-handler";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Providers>
        <TaskrApp />
      </Providers>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
