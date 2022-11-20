import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

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
  Avatar,
  Center,
  ScrollView,
} from "native-base";

import { AntDesign, FontAwesome5, EvilIcons } from "@expo/vector-icons";
import SinglePost from "./component/post/single_post";
import Create_post from "./component/post/create_post";

export default function Home({ navigation }) {
  const [show, setShow] = React.useState(false);
  const Stack = createStackNavigator();
  function NewPost() {
    return (
      <HStack justifyContent="center" bgColor={"white"} py="3">
        <Avatar
          mr="3"
          bg="green.500"
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        >
          abc
        </Avatar>
        <Button
          mx="2"
          variant="outline"
          w="60%"
          _text={{
            color: "#137950",
          }}
          onPress={() => navigation.navigate("Create_post")}
        >
          Bạn đang nghĩ gì?
        </Button>
        <IconButton
          ml="3"
          size="md"
          variant="ghost"
          alignSelf="flex-end"
          _icon={{
            as: EvilIcons,
            name: "image",
            color: "#137950",
            size: "xl",
          }}
        />
      </HStack>
    );
  }

  return (
    <Box flex="1" mt="0">
      <ScrollView>
        {NewPost()}
        <SinglePost
          author_name={"chu do"}
          post_body={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa \n aa"}
          comment_num={"12"}
          img_num={4}
        />
        <SinglePost
          author_name={"chu do"}
          post_body={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa \n aa"}
          comment_num={"12"}
          img_num={2}
        />
        <SinglePost
          author_name={"chu do"}
          post_body={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa \n aa"}
          comment_num={"12"}
          img_num={1}
        />
      </ScrollView>
    </Box>
  );
}
