import React from "react";

import { Button, IconButton, HStack, Avatar } from "native-base";
import { EvilIcons } from "@expo/vector-icons";
import GenerateRandomCode from "react-random-code-generator";

import link from "../../../../../../config/const.js";
import { useNavigation } from "@react-navigation/native";

function NewPost({ emailS, codeS }) {
  const navigation = useNavigation();
  const [info, setInfo] = React.useState("");

  React.useEffect(() => {
    if (codeS !== "") {
      const account_link =
        link.user_link +
        codeS +
        ".json" +
        "?timeStamp=" +
        GenerateRandomCode.TextCode(8);
      console.log(account_link);
      fetch(account_link, {
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "same-origin",
      })
        .then((res) => res.json())
        .then((json) => {
          setInfo(json);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [codeS]);

  const memoValue = React.useMemo(() => {return info.id}, [info, codeS]);

  //console.log(user_avatar_link);
  return (
    <HStack justifyContent="center" bgColor={"white"} py="3">
      {memoValue  !== undefined && (
        <Avatar
          mr="3"
          bg="green.500"
          source={{
            uri:
              link.user_image_link +
              memoValue +
              "/avatar/avatar_this.png?timeStamp=" +
              GenerateRandomCode.TextCode(8),
          }}
        >
          
        </Avatar>
      )}

      <Button
        mx="2"
        variant="outline"
        w="60%"
        _text={{
          color: "#137950",
        }}
        onPress={() => navigation.navigate("Create_post")}
      >
        Bạn đang nghĩ gì?
      </Button>
      <IconButton
        ml="3"
        size="md"
        variant="ghost"
        alignSelf="flex-end"
        _icon={{
          as: EvilIcons,
          name: "image",
          color: "#137950",
          size: "xl",
        }}
      />
    </HStack>
  );
}

export default React.memo(NewPost);
