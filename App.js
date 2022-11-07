import { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import NativeBaseIcon from "./components/NativeBaseIcon";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import {
  HStack,
  Text,
  NativeBaseProvider,
  Box,
  Flex,
  Button,
  Icon,
  Heading,
  Spacer,
  IconButton,
} from "native-base";

import Main from "./src/view/main/main";
import Login from "./src/view/log/login";
import Create_post from "./src/view/main/page/component/post/create_post";

import link from "./src/config/const";

export default function App() {
  const [show, setShow] = useState(false);
  const [logined, setLogin] = useState(true);
  const [error, setError] = useState(null);
  const Stack = createStackNavigator();

  useEffect(() => {
    fetch(link.user_link, {
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setLogin(true);
          console.log(JSON.parse(JSON.stringify(result)) ?? []);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setError(error);
        }
      );
  }, []);

  function getHeaderTitle(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? "Main";

    switch (routeName) {
      case "Main":
        return "";
      case "Home":
        return "";
      case "Create_post":
        return "Create_post";
    }
  }

  const viewPage = () => {
    if (logined) {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Main"
              component={Main}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Create_post"
              component={Create_post}
              options={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                ...TransitionPresets.ModalSlideFromBottomIOS,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      console.log("fuck");
      return <Login />;
    }
  };

  return (
    <NativeBaseProvider>
      <Box flex="1" mt="0" safeAreaTop>
        {viewPage()}
      </Box>
    </NativeBaseProvider>
  );
}
