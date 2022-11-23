import React, { useState, memo } from "react";

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
  PresenceTransition,
  Menu,
  Pressable,
  HamburgerIcon,
} from "native-base";

import { View, Image, StyleSheet } from "react-native";

import { Dimensions } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Image_show from "./img_show";

import Like_button from "./sub_component/like_button";

import Comment_share from "./sub_component/comment_share";

import Menu_button from "./sub_component/menu_button";

const SinglePost = ({ id, author_name, post_body, comment_num, img_num }) => {
  const navigation = useNavigation();
  const [shouldOverlapWithTrigger] = React.useState(false);

  const [isOpenLike, setIsOpenLike] = React.useState(false);
  return (
    <Box my="2" px="1" pt="2" bgColor="white">
      <Flex direction="row" space={8} px="2" mt="2">
        <HStack>
          <Avatar
            bg="green.500"
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          >
            {author_name}
          </Avatar>
          <VStack ml="2" mt="0.5">
            <HStack>
              <Text bold fontSize="sm">
                {author_name}
              </Text>
            </HStack>
            <HStack>
              <Text>1 giờ</Text>
            </HStack>
          </VStack>
        </HStack>

        <Spacer />

        <Menu_button/>
        
      </Flex>

      <Text mb="2" py="3" px="4" fontSize="18">
        {post_body}
      </Text>

      <Image_show img_num={parseInt(img_num)} id={id} />

      <Flex direction="row-reverse" px="1" mt="1.5">
        <Comment_share comment={5} share={10} />
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

      <HStack space={9} justifyContent="center" pb="2" px="2">
        <Like_button />

        <Button
          variant="ghost"
          _text={{
            color: "#137950",
            fontSize: 15,
          }}
          endIcon={
            <Icon as={EvilIcons} name="comment" size="md" color="#137950" />
          }
          onPress={() => navigation.navigate("Comment_page")}
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
};

export default memo(SinglePost);
