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

import NotifySingle from "./component/notification/notify_single";

export default function Menu() {
  const [show, setShow] = React.useState(false);

  function FriendBar() {
    return (
      <VStack my="3">
        <HStack bgColor="white">
          <VStack>
            <Heading size="md" color="black" fontWeight="bold" ml="4" mt="2.5">
              Menu
            </Heading>
          </VStack>
          <Spacer></Spacer>
          <VStack alignSelf="flex-end">
            <Button.Group>
              <IconButton
                size="md"
                variant="ghost"
                alignSelf="flex-end"
                _icon={{
                  as: Ionicons,
                  name: "settings",
                  color: "#137950",
                  size: "xl",
                }}
              />
              <IconButton
                mr="3"
                size="md"
                variant="ghost"
                alignSelf="flex-end"
                _icon={{
                  as: Ionicons,
                  name: "search-sharp",
                  color: "#137950",
                  size: "xl",
                }}
              />
            </Button.Group>
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
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Divider
            my="2"
            thickness="1"
            _light={{
              bg: "muted.400",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Button
            variant="ghost"
            h="10"
            startIcon={
              <Icon
                as={FontAwesome5}
                name="user-friends"
                size="md"
                color="#137950"
              />
            }
            _text={{
              color: "#137950",
              fontSize: 15,
            }}
          >
            Hỗ trợ
          </Button>
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Divider
            my="2"
            thickness="1"
            _light={{
              bg: "muted.400",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Button
            variant="ghost"
            h="10"
            startIcon={
              <Icon
                as={FontAwesome5}
                name="user-friends"
                size="md"
                color="#137950"
              />
            }
            _text={{
              color: "#137950",
              fontSize: 15,
            }}
          >
            Cài đặt
          </Button>
        </HStack>
        <HStack space={4} justifyContent="flex-start" pb="1" px="3">
          <Divider
            my="2"
            thickness="1"
            _light={{
              bg: "muted.400",
            }}
            _dark={{
              bg: "muted.50",
            }}
          />
        </HStack>
        <HStack space={8} pb="1" px="3">
          <Button
            variant="solid"
            h="10"
            w="100%"
            size="lg"
            bgColor= "#137950"
            _text={{
              fontWeight: "bold",
            }}
          >
            Đăng xuất
          </Button>
        </HStack>
      </ScrollView>
    </Box>
  );
}
