import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import NativeBaseIcon from "./components/NativeBaseIcon";
import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { Ionicons } from "@expo/vector-icons";
import { HStack, Text, NativeBaseProvider, Box } from "native-base";

import Login from "./src/view/log/login";
import BookList from "./src/view/component/book/book_list";
import Tutorial from "./src/view/log/tutorial";
import Create_post from "./src/view/log/create_post";

export default function App() {
  const [show, setShow] = React.useState(false);

  const Tab = createMaterialTopTabNavigator();
  return (
    <NativeBaseProvider>
      <Box flex="1" safeAreaTop >
        <NavigationContainer safeAreaTop>
          <Tab.Navigator
            screenOptions={{
              showLabel: false,
              style: {
                size: "14",
              },
            }}
          >
            <Tab.Screen
              name="Home"
              component={Login}
              options={{
                tabBarLabel: "",
                tabBarShowLabel: false,
                tabBarIcon: () => (
                  <Ionicons name="md-home" size={20} color="green" />
                ),
              }}
            />
            <Tab.Screen name="Booklist" component={BookList} />
            <Tab.Screen name="Tutorial" component={Tutorial} />
            <Tab.Screen name="Create_post" component={Create_post} />
          </Tab.Navigator>
        </NavigationContainer>
      </Box>
    </NativeBaseProvider>
  );
}
