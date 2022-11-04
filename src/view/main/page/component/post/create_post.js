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
  Heading,
  Select,
  TextArea,
  Input,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { CheckIcon } from "@expo/vector-icons";

export default function Create_post({ navigation }) {
  const [service, setService] = useState("0");
  return (
    <NativeBaseProvider>
      <Box my="2.5" pt="2" bgColor="white">
        <Flex direction="row" space={8} mt="3" mr="3">
          <Button
            variant="ghost"
            h="10"
            w="20"
            endIcon={<Icon as={Ionicons} name="arrow-back" size="xl" />}
          />
          <Heading size="md" mt="2">
            Solid
          </Heading>

          <Spacer></Spacer>

          <Button size="md" variant="solid" alignSelf="flex-end">
            Đăng
          </Button>
        </Flex>

        <Divider
          my="3"
          thickness="2"
          _light={{
            bg: "muted.400",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        <HStack direction="row" space={8} px="3" mt="3">
          <VStack mt="3">
            <Avatar
              bg="green.500"
              source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
              }}
            >
              AJ
            </Avatar>
          </VStack>

          <VStack>
            <HStack>
              <Heading size="sm">Thành Đô</Heading>
            </HStack>

            <HStack>
              <Select
                selectedValue={service}
                minWidth="40"
                fontSize="xs"
                height="10"
                accessibilityLabel="Chỉ mình tôi"
                placeholder="Chỉ mình tôi"
                _selectedItem={{
                  bg: "teal.600",
                }}
                mt={1}
                onValueChange={(itemValue) => setService(itemValue)}
              >
                <Select.Item label="UX Research" value="ux" />
                <Select.Item label="Web Development" value="web" />
                <Select.Item label="Cross Platform Development" value="cross" />
                <Select.Item label="UI Designing" value="ui" />
                <Select.Item label="Backend Development" value="backend" />
              </Select>
            </HStack>
          </VStack>
        </HStack>
        <VStack my="3">
          <TextArea
            mx="3"
            rowSpan={13}
            placeholder="Nhập gì đó"
            textAlign="left"
          />
        </VStack>

        <Divider
          my="3"
          thickness="1"
          _light={{
            bg: "muted.400",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        <HStack space={8} justifyContent="flex-start" pb="1" px="3">
          <Button
            variant="ghost"
            h="10"
            startIcon={<Icon as={FontAwesome} name="picture-o" size="md" />}
          >
            {"Ảnh & Video"}
          </Button>
        </HStack>
        <Divider
          my="3"
          thickness="1"
          _light={{
            bg: "muted.400",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        <HStack space={8} justifyContent="flex-start" pb="1" px="3">
          <Button
            variant="ghost"
            h="10"
            startIcon={<Icon as={FontAwesome5} name="user-friends" size="md" />}
          >
            Tag bạn bè
          </Button>
        </HStack>
        <Divider
          my="3"
          thickness="1"
          _light={{
            bg: "muted.400",
          }}
          _dark={{
            bg: "muted.50",
          }}
        />
        
      </Box>
    </NativeBaseProvider>
  );
}
