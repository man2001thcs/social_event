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

export default function image_show(img_asset) {
  const img_num = img_asset.length;
  //console.log(img_asset);

  const dimensions = Dimensions.get("window");

  const styles = StyleSheet.create({
    stretch_1: {
      width: dimensions.width - 8,
      height: (dimensions.width * 9) / 16,
    },
    stretch_2: {
      width: dimensions.width / 2 - 5,
      height: ((dimensions.width / 2 - 5) * 3) / 4,
    },
  });

  if (img_num === 1) {
    return (
      <Flex>
        <Center>
          <HStack>
            <Image
              style={{
                width: dimensions.width - 10,
                height:
                  (img_asset[0]?.height * (dimensions.width - 10)) /
                  img_asset[0]?.width,
              }}
              source={{ uri: img_asset[0]?.uri }}
            />
          </HStack>
        </Center>
      </Flex>
    );
  }
  if (img_num === 2) {
    return (
      <Flex space="4">
        <Center>
          <HStack>
            <Image
              style={{
                width: dimensions.width / 2 - 5,
                height:
                  (img_asset[0]?.height * (dimensions.width / 2 - 5)) /
                  img_asset[0]?.width,
              }}
              source={{ uri: img_asset[0]?.uri }}
            />
            <Spacer></Spacer>
            <Image
              style={{
                width: dimensions.width / 2 - 5,
                height:
                  (img_asset[1]?.height * (dimensions.width / 2 - 5)) /
                  img_asset[1]?.width,
              }}
              source={{ uri: img_asset[1]?.uri }}
            />
          </HStack>
        </Center>
      </Flex>
    );
  }
  if (img_num === 3) {
    return (
      <Flex>
        <Center>
          <HStack>
            <Image
              style={{
                width: dimensions.width / 2 - 10,
                height:
                  (img_asset[0]?.height * (dimensions.width / 2 - 10)) /
                  img_asset[0]?.width,
              }}
              source={{ uri: img_asset[0]?.uri }}
            />
            <Spacer></Spacer>
            <Image
              style={{
                width: dimensions.width / 2 - 10,
                height:
                  (img_asset[1]?.height * (dimensions.width / 2 - 10)) /
                  img_asset[1]?.width,
              }}
              source={{ uri: img_asset[1]?.uri }}
            />
          </HStack>
          <HStack mt="1">
            <Image
              style={{
                width: dimensions.width / 2 - 10,
                height:
                  (img_asset[2]?.height * (dimensions.width / 2 - 10)) /
                  img_asset[2]?.width,
              }}
              source={{ uri: img_asset[2]?.uri }}
            />
          </HStack>
        </Center>
      </Flex>
    );
  }
  if (img_num === 4) {
    return (
      <Flex>
        <Center>
          <HStack>
            <Image
              style={{
                width: dimensions.width / 2 - 10,
                height:
                  (img_asset[0]?.height * (dimensions.width / 2 - 10)) /
                  img_asset[0]?.width,
              }}
              source={{ uri: img_asset[0]?.uri }}
            />
            <Spacer></Spacer>
            <Image
              style={{
                width: dimensions.width / 2 - 10,
                height:
                  (img_asset[1]?.height * (dimensions.width / 2 - 10)) /
                  img_asset[1]?.width,
              }}
              source={{ uri: img_asset[1]?.uri }}
            />
          </HStack>
          <HStack mt="1">
            <Image
              style={{
                width: dimensions.width / 2 - 10,
                height:
                  (img_asset[2]?.height * (dimensions.width / 2 - 10)) /
                  img_asset[2]?.width,
              }}
              source={{ uri: img_asset[2]?.uri }}
            />
            <Spacer></Spacer>
            <Image
              style={{
                width: dimensions.width / 2 - 10,
                height:
                  (img_asset[3]?.height * (dimensions.width / 2 - 10)) /
                  img_asset[3]?.width,
              }}
              source={{ uri: img_asset[3]?.uri }}
            />
          </HStack>
        </Center>
      </Flex>
    );
  }
}
