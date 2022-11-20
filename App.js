import { useState, useEffect } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import NativeBaseIcon from "./components/NativeBaseIcon";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

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
import SignIn from "./src/view/log/signin";
import Create_post from "./src/view/main/page/component/post/create_post";
import AsyncStorage from "@react-native-async-storage/async-storage";

import link from "./src/config/const";
import GenerateRandomCode from "react-random-code-generator";

export default function App() {
  const [show, setShow] = useState(false);
  const [logined, setLogin] = useState(false);
  const [error, setError] = useState(null);
  const Stack = createStackNavigator();

  const [email_login, setEmailLogin] = useState("");
  const [code_login, setCodeLogin] = useState("");


  console.log(code_login);

  const childToParent = (data) => {
    setCodeLogin(data);
    console.log("aa");
  };

  /*
  useEffect(() => {
    if (code_login !== "") {
      const account_link =
        link.user_link +
        code_login +
        ".json" +
        "?timeStamp=" +
        GenerateRandomCode.TextCode(8);
      console.log(account_link);
      fetch(account_link, {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "same-origin",
      })
        .then((res) => res.json())
        .then((json) => {
          console.log("Success:", json);
          setLogin(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else console.log("abc");
  }, [code_login, email_login]);
  */

  console.log(code_login, email_login);

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
              children={() => (
                <Create_post codeS={code_login} emailS={email_login}></Create_post>
              )}
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
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              children={() => (
                <Login codeS={code_login} setLogin={setLogin} codeChange={setCodeLogin} emailChange={setEmailLogin}></Login>
              )}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sign in"
              component={SignIn}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
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
