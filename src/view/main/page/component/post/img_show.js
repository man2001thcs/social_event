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


export default function image_show(img_num) {

    const dimensions = Dimensions.get("window");

    const styles = StyleSheet.create({
      stretch_1: {
        width: dimensions.width - 8,
        height: dimensions.width * 9 / 16,       
      },
      stretch_2: {
        width: dimensions.width / 2 - 5,
        height: (dimensions.width / 2 - 5) * 3/4,
      },
    });

    if (img_num === 1) {
      var uri_this = "https://www.w3schools.com/css/img_lights.jpg";
      
      return (
        <Flex>
          <Center>
            <HStack>
            <Image
                style={styles.stretch_1}
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
              />
            </HStack>
          </Center>
        </Flex>
      );
    }
    if (img_num === 2) {
      return (
        <Flex>
          <Center>
            <HStack>
              <Image
                style={styles.stretch_2}
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
              />
              <Spacer></Spacer>
              <Image
                style={styles.stretch_2}
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
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
                style={styles.stretch_2}
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
              />
              <Spacer></Spacer>
              <Image
                style={styles.stretch_2}
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
              />
            </HStack>
            <HStack mt="1">
              
              <Image
                style={styles.stretch_1}
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
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
                style={styles.stretch_2}
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
              />
              <Spacer></Spacer>
              <Image
                style={styles.stretch_2}
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
              />
            </HStack>
            <HStack mt="1">
              <Image
                style={styles.stretch_2}
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
              />
              <Spacer></Spacer>
              <Image
                style={styles.stretch_2}
                source={{ uri: "https://www.w3schools.com/css/img_lights.jpg" }}
              />
            </HStack>
          </Center>
        </Flex>
      );
    }
  }