import React, { useState } from "react";

import {
  NativeBaseProvider,
  Text,
  Box,
  Button,
  HStack,
  Divider,
  Center,
  Avatar,
  Flex,
  IconButton,
  VStack,
  Spacer,
  Icon,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function NotifySingle(props) {
  return (
    <Box my="2.5" mx="2" px="1" pt="2" bgColor="white" flex="1">
      <HStack direction="row" space={8} px="3" mt="3">
        <VStack mt="1.5">
          <Avatar
            bg="green.500"
            size="lg"
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            {props.author_name}
          </Avatar>
        </VStack>

        <VStack flex="1">
          <Text fontSize="md">
            <Text bold>Dương Thùy Mị </Text>
            đã bình luận về bài viết của  <Text bold>Dương Thùy Mị </Text>
          </Text>
        </VStack>

        <VStack>
          <IconButton
            size="md"
            mt="0"
            variant="ghost"
            alignSelf="flex-end"
            _icon={{
              as: Ionicons,
              name: "ellipsis-horizontal",
              color: "#137950",
            }}
          />
        </VStack>
      </HStack>
    </Box>
  );
}
