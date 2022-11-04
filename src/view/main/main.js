import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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

import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import Login from "../../view/log/login";
import BookList from "../../view/main/page/component/book/book_list";
import Tutorial from "../../view/log/tutorial";
import Create_post from "../../view/main/page/component/post/create_post";

import Home from "./page/home";
import FriendList from "./page/friend";
import NotifyList from "./page/notification";

export default function Main() {
  const [show, setShow] = React.useState(false);

  const Tab = createMaterialTopTabNavigator();
  return (
    <Box flex="1" mt="0">
      <NavigationContainer>
        <Flex direction="row" space={8} mr="3">
          <Heading size="md" color="#137950" fontWeight="bold" ml="4" mt="1">
            Social
          </Heading>

          <Spacer></Spacer>

          <IconButton
            colorScheme="indigo"
            borderRadius={50}
            mr="2"
            _icon={{
              as: AntDesign,
              name: "plus",
              color: "#137950",
            }}
            bgColor="#C6C7C0"
          />

          <IconButton
            colorScheme="indigo"
            borderRadius={50}
            bgColor="#C6C7C0"
            _icon={{
              as: AntDesign,
              name: "search1",
              color: "#137950",
            }}
          />
        </Flex>
        <Tab.Navigator
          screenOptions={{
            showLabel: false,
            style: {
              size: "14",
            },
            tabBarIndicatorStyle: { backgroundColor: "green" },
          }}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: "",
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Ionicons name="md-home" size={20} color="green" />
              ),
            }}
          />
          <Tab.Screen
            name="Booklist"
            component={FriendList}
            options={{
              tabBarLabel: "",
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <FontAwesome5 name="user-friends" size={20} color="green" />
              ),
            }}
          />
          <Tab.Screen
            name="Tutorial"
            component={NotifyList}
            options={{
              tabBarLabel: "",
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Ionicons name="notifications" size={20} color="green" />
              ),
            }}
          />
          <Tab.Screen
            name="Create_post"
            component={Create_post}
            options={{
              tabBarLabel: "",
              tabBarShowLabel: false,
              tabBarIcon: () => (
                <Ionicons name="menu" size={22} color="green" />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Box>
  );
}
