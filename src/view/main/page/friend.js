import React from "react";

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
  Avatar,
  Center,
  ScrollView,
  VStack,
  Divider,
} from "native-base";

import { AntDesign, FontAwesome5, EvilIcons } from "@expo/vector-icons";

import FriendAccept from "./component/friend/friend_accept";

export default function FriendList() {
  const [show, setShow] = React.useState(false);

  function FriendBar() {
    return (
      <VStack my="3">
        <HStack bgColor="white">
          <VStack>
            <Heading size="md" color="black" fontWeight="bold" ml="4" mt="2.5">
              Bạn bè
            </Heading>
          </VStack>
          <Spacer></Spacer>
          <VStack alignSelf="flex-end">
            <IconButton
              mr="3"
              size="md"
              variant="ghost"
              alignSelf="flex-end"
              _icon={{
                as: EvilIcons,
                name: "search",
                color: "#137950",
                size: "xl",
              }}
            />
          </VStack>
        </HStack>
        <VStack mx="2">
          <Divider
            thickness="2"
            _light={{
              bg: "muted.400",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
        </VStack>
      </VStack>
    );
  }

  return (
    <Box flex="1" mt="0" bgColor="white">
      <ScrollView>
        {FriendBar()}
        <FriendAccept
          author_name={"chu do"}
          post_body={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa \n aa"}
          comment_num={"12"}
        />
        <FriendAccept
          author_name={"chu do"}
          post_body={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa \n aa"}
          comment_num={"12"}
        />
        <FriendAccept
          author_name={"chu do"}
          post_body={"aaaaaaaaaaaaaaaaaaaaaaaaaaaa \n aa"}
          comment_num={"12"}
        />
      </ScrollView>
    </Box>
  );
}
