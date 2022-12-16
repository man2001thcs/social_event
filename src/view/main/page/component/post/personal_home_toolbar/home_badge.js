import React from "react";

import {
  Button,
  IconButton,
  HStack,
  Avatar,
  Image,
  Box,
  Icon,
  Badge,
} from "native-base";
import { EvilIcons, AntDesign } from "@expo/vector-icons";
import GenerateRandomCode from "react-random-code-generator";
import { Dimensions } from "react-native";

import link from "../../../../../../config/const.js";
import { useNavigation } from "@react-navigation/native";

function Home_badge({ emailS, codeS, info }) {
  const navigation = useNavigation();
  const dimensions = Dimensions.get("window");

  //console.log(user_avatar_link);
  return (
    <Box justifyContent="center" bgColor={"white"} py="2">
      <HStack>
        <Image
          source={{
            uri: "http://192.168.1.153/php_social/img/user/"+ info.id +"/background/background.jpg",
          }}
          alt="Alternate Text"
          style={{
            width: dimensions.width,
            height: (dimensions.width * 9) / 16,
          }}
        />
      </HStack>
      <HStack>
        <Avatar
          ml="3"
          mt={-dimensions.height / 8}
          bg="lightBlue.400"
          source={{
            uri: "http://192.168.1.153/php_social/img/user/"+ info.id +"/avatar/avatar_this.png",
          }}
          size="2xl"
        >
          NB
          <Avatar.Badge>
            <IconButton
              variant="solid"
              bg="green.500"
              colorScheme="green"
              borderRadius="full"
              size={6}
              icon={
                <Icon
                  as={AntDesign}
                  size="4"
                  name="camera"
                  _dark={{
                    color: "warmGray.50",
                  }}
                  color="warmGray.50"
                />
              }
            />
          </Avatar.Badge>
        </Avatar>
      </HStack>
      <HStack my="3">
        <Button.Group
          isAttached
          direction="column"
          colorScheme="blue"
          mx={{
            base: "auto",
            md: 0,
          }}
          size="sm"
        >
          <Button w={dimensions.width - 20}>Thêm vào tin</Button>
          <Button variant="outline">Chỉnh sửa thông tin</Button>
        </Button.Group>
      </HStack>
    </Box>
  );
}

export default React.memo(Home_badge);
