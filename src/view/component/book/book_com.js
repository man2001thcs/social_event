import React from "react";
import { View } from "react-native";
import { HStack, Text } from "native-base";
import NativeBaseProvider from "native-base";

function BookCom(props) {
  return (
   
      <HStack space={3} justifyContent="center">
        <View>
          <Text>{props.id}</Text>
        </View>
        <View>
          <Text>{props.name}</Text>
        </View>
      </HStack>

  );
}

export default BookCom;
