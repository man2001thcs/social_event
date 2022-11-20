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

import { View, Image, StyleSheet } from "react-native";

import { Dimensions } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import image_show from "./img_show";

export default function SinglePost(props) {

  return (
    <Box my="2.5" px="1" pt="2" bgColor="white">
      <Flex direction="row" space={8} px="2" mt="2">
        <HStack>
          <Avatar
            bg="green.500"
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            {props.author_name}
          </Avatar>
          <VStack ml="2" mt="0.5">
            <HStack>
              <Text bold fontSize="sm">
                Dương Thùy Mị
              </Text>
            </HStack>
            <HStack>
              <Text>1 giờ</Text>
            </HStack>
          </VStack>
        </HStack>

        <Spacer />

        <IconButton
          size="md"
          mt="0"
          variant="ghost"
          alignSelf="flex-end"
          _icon={{
            as: MaterialIcons,
            name: "menu",
            color: "#137950",
          }}
        />
      </Flex>

      <Text mb="2" py="3" px="4" fontSize="18">
        {props.post_body}
      </Text>

      {image_show(props.img_num)}

      <Flex direction="row-reverse" px="1" mt="1.5">
        <Text
          variant="ghost"
          px="5"
          mb="2"
          fontSize="15"
          _text={{
            color: "coolGray.800",
          }}
        >
          {props.comment_num} bình luận
        </Text>
      </Flex>

      <HStack mx="2.5" my="2">
        <Divider
          thickness="2"
          _light={{
            bg: "muted.400",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
      </HStack>

      <HStack space={8} justifyContent="center" pb="2" px="2">
        <Button
          variant="ghost"
          _text={{
            color: "#137950",
            fontSize: 15,
          }}
          endIcon={
            <Icon as={EvilIcons} name="like" size="md" color="#137950" />
          }
        >
          Like
        </Button>
        <Button
          variant="ghost"
          _text={{
            color: "#137950",
            fontSize: 15,
          }}
          endIcon={
            <Icon as={EvilIcons} name="comment" size="md" color="#137950" />
          }
        >
          Comment
        </Button>
        <Button
          variant="ghost"
          _text={{
            color: "#137950",
            fontSize: 15,
          }}
          endIcon={
            <Icon as={FontAwesome} name="share" size="md" color="#137950" />
          }
        >
          Share
        </Button>
      </HStack>
    </Box>
  );
}
