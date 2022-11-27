import React, { useState } from "react";

import {
  Button,
  IconButton,
  HStack,
  Avatar,
} from "native-base";
import {
  EvilIcons,
} from "@expo/vector-icons";

import { useNavigation } from "@react-navigation/native";

function NewPost() {
  const navigation = useNavigation();
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

export default React.memo(NewPost);
