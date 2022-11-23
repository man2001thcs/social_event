import React, { useEffect, useState } from "react";

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

export default function Single_image({url, size}) {
  const dimensions = Dimensions.get("window");

  console.log(url);

  const [width, setWidth] = React.useState(0);
  const [height, setHeight] = React.useState(0);

  useEffect(() => {
    Image.getSize(url, (width, height) => {
      //setWidth(width);
      //setHeight(height);
      console.log(width);
      console.log(height);
    });
  }, [url]);
 

  if (size === 1) {
    return (
      <Image
        style={{
          width: dimensions.width - 10,
          height: (height * (dimensions.width - 10)) / width,
        }}
        source={{ uri: url }}
      />
    );
  } else if (size === 2) {
    return (
      <Image
        style={{
          width: dimensions.width / 2 - 10,
          height: (height * (dimensions.width / 2 - 10)) / width,
        }}
        source={{ uri: url }}
      />
    );
  }
}
