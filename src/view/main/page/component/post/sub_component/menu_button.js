import React, { useState } from "react";
import {
  Popover,
  Button,
  VStack,
  Select,
  CheckIcon,
  Box,
  Center,
  NativeBaseProvider,
  Stagger,
  IconButton,
  Icon,
  HStack,
  Menu,
  HamburgerIcon,
  Pressable,
} from "native-base";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons,
  AntDesign,
} from "@expo/vector-icons";

function Menu_button() {
  const [isOpen_Menu, setIsOpen_Menu] = useState(false);
  const [values, setValue] = useState("");
  console.log("Menu: " + isOpen_Menu);
  return (
    <Menu
      w="100"
      defaultIsOpen={false}
      trigger={(triggerProps) => {
        return (
          <IconButton
          {...triggerProps}
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
        );
      }}
    >
      <Menu.Item onPress={() => console.log("a")}>Sửa bài</Menu.Item>
      <Menu.Item>Xóa bài</Menu.Item>
    </Menu>
  );
}

export default React.memo(Menu_button);
