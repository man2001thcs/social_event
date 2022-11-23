import React, { memo, useState } from "react";

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
  Stack,
} from "native-base";

import { View, Image, StyleSheet } from "react-native";

import { Dimensions } from "react-native";
import link from "../../../../../config/const";

import Single_image from "./sub_component/single_image";

import AutoHeightImage from "react-native-auto-height-image";

function Image_show({img_num, id}) {
  const dimensions = Dimensions.get("window");
  const post_link = link.image_link + id + "/";


  const styles = StyleSheet.create({
    stretch_1: {
      height: undefined,
      width: undefined,
      flex: 1,
    },
    stretch_2: {
      width: dimensions.width / 2 - 5,
      height: ((dimensions.width / 2 - 5) * 3) / 4,
    },
  });

  if (img_num === 1) {
    var uri_this = post_link + "1" + ".png" + ".png";

    return (
      <HStack>
        <Center>
          <HStack>
            <AutoHeightImage
              source={{ uri: uri_this }}
              width={dimensions.width - 10}
            />
          </HStack>
        </Center>
      </HStack>
    );
  }
  if (img_num === 2) {
    var uri_this1 = post_link + "1" + ".png" + ".png";
    var uri_this2 = post_link + "2" + ".png" + ".png";
    return (
      <Flex>
        <Center>
          <HStack>
            <AutoHeightImage
              source={{ uri: uri_this1 }}
              width={(dimensions.width - 5) / 2}
            />
            <Spacer></Spacer>
            <AutoHeightImage
              source={{ uri: uri_this2 }}
              width={(dimensions.width - 5) / 2}
            />
          </HStack>
        </Center>
      </Flex>
    );
  }
  if (img_num === 3) {
    var uri_this1 = post_link + "1" + ".png" + ".png";
    var uri_this2 = post_link + "2" + ".png" + ".png";
    var uri_this3 = post_link + "3" + ".png" + ".png";
    return (
      <Flex>
        <Center>
          <HStack mb="1">
            <AutoHeightImage
              source={{ uri: uri_this1 }}
              width={dimensions.width - 10}
            />
          </HStack>
          <HStack>
            <AutoHeightImage
              source={{ uri: uri_this2 }}
              width={(dimensions.width - 5) / 2}
            />
            <Spacer></Spacer>
            <AutoHeightImage
              source={{ uri: uri_this3 }}
              width={(dimensions.width - 5) / 2}
            />
          </HStack>
        </Center>
      </Flex>
    );
  }
  if (img_num === 4) {
    var uri_this1 = post_link + "1" + ".png" + ".png";
    var uri_this2 = post_link + "2" + ".png" + ".png";
    var uri_this3 = post_link + "3" + ".png" + ".png";
    var uri_this4 = post_link + "4" + ".png" + ".png";
    return (
      <Flex>
        <Center>
          <HStack>
          <AutoHeightImage
              source={{ uri: uri_this1 }}
              width={(dimensions.width - 5) / 2}
            />
            <Spacer></Spacer>
            <AutoHeightImage
              source={{ uri: uri_this2 }}
              width={(dimensions.width - 5) / 2}
            />
          </HStack>
          <HStack mt="1">
          <AutoHeightImage
              source={{ uri: uri_this3 }}
              width={(dimensions.width - 5) / 2}
            />
            <Spacer></Spacer>
            <AutoHeightImage
              source={{ uri: uri_this4 }}
              width={(dimensions.width - 5) / 2}
            />
          </HStack>
        </Center>
      </Flex>
    );
  }
}

export default memo(Image_show);
