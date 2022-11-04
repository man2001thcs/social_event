import {useState, useEffect} from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import NativeBaseIcon from "./components/NativeBaseIcon";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

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

import link from "./src/config/const";

export default function App() {
  const [show, setShow] = useState(false);
  const [logined, setLogin] = useState(true);
  const [error, setError] = useState(null);

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

  const viewPage = () => {
    if (logined) {
      return (<Main/>);
    } else {    
      console.log("fuck");
      return (<Login/>);
    }
  };

  return (
    <NativeBaseProvider>
      <Box flex="1" safeAreaTop mt="0">
        {viewPage()}
      </Box>
    </NativeBaseProvider>
  );
}
