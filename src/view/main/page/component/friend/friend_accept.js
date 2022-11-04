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

export default function FriendAccept(props) {
  return (
    <Box my="2.5" mx="2" px="1" pt="1" bgColor="white">
      <HStack direction="row" space={8} px="2" mt="3">
        <VStack>
          <Avatar
            bg="green.500"
            size="xl"
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            {props.author_name}
          </Avatar>
        </VStack>
        <VStack>
          <Flex direction="row" space="4" mb="2">
            <VStack>
              <HStack>
                <Text bold fontSize="lg">
                  Dương Thùy Mị
                </Text>
              </HStack>
              <HStack>
                <Text>53 bạn chung</Text>
              </HStack>
            </VStack>
            <Spacer w="5"/>
            <VStack>
              <HStack>
                <Text>1 năm</Text>
              </HStack>
            </VStack>
          </Flex>
          <HStack>
            <Button variant="solid" mr="3" px="7">
              Chấp nhận
            </Button>
            <Button variant="solid" px="7" bgColor="#B5B6B0">
              Xóa
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Box>
  );
}
