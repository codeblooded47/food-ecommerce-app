import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./pages/Home";
import CuisineSelector from "./pages/CuisineSelector";
import * as SplashScreen from "expo-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createNativeStackNavigator();
SplashScreen.preventAutoHideAsync();
function App() {
  const [appIsReady, setAppIsReady] = React.useState(false);
  const [initialRouteName, setinitialRouteName] =
    React.useState("CuisineSelector");
  React.useEffect(() => {
    async function prepare() {
      try {
        let selectedCuisine = await AsyncStorage.getItem("@cuisine");
        if (selectedCuisine) {
          setinitialRouteName("Home");
        }
        setAppIsReady(true);
        SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // const onLayoutRootView = React.useCallback(async () => {
  //   if (appIsReady) {
  //     // This tells the splash screen to hide immediately! If we call this after
  //     // `setAppIsReady`, then we may see a blank screen while the app is
  //     // loading its initial state and rendering its first pixels. So instead,
  //     // we hide the splash screen once we know the root view has already
  //     // performed layout.
  //     await SplashScreen.hideAsync();
  //   }
  // }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRouteName}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="CuisineSelector" component={CuisineSelector} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
