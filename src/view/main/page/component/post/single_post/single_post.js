import React, { memo} from "react";

import {
  Text,
  Box,
  Button,
  HStack,
  Divider,
  Avatar,
  Flex,
  VStack,
  Spacer,
  Icon,
} from "native-base";

import { FontAwesome, EvilIcons } from "@expo/vector-icons";

import Image_show from "../img_function/img_show";
import Like_button from "./sub_component/emotion_button/like_button";
import Comment_share from "./sub_component/comment_share_number/comment_share";
import Menu_button from "./sub_component/menu_button/menu_button";
import Time_show from "./sub_component/time_show/time_show";
import link from "../../../../../../config/const";

const SinglePost = ({
  id,
  author_name,
  author_id,
  author_account,
  post_body,
  like_num,
  dislike_num,
  love_num,
  hate_num,
  comment_num,
  created,
  modified,
  img_num,
  emailS,
  codeS,
  navigation
}) => {

  //time difference since created
  const time_distance_5 = Math.round(
    (new Date().valueOf() - new Date(created.replace(/-/g, "/")).valueOf()) /
      300000
  );

  const time_modified = Math.round(
    (new Date(modified.replace(/-/g, "/")).valueOf() -
      new Date(created.replace(/-/g, "/")).valueOf()) /
      60000
  );

  const author_avatar_link =
    link.user_image_link + author_id + "/avatar/avatar_this.png";

  return (
    <Box my="2" px="1" pt="2" bgColor="white">
      <Flex direction="row" space={8} px="2" mt="2">
        <HStack>
          <Avatar
            bg="green.500"
            source={{
              uri: author_avatar_link,
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
              <Time_show
                time_distance={time_distance_5}
                time_modified={time_modified}
              />
            </HStack>
          </VStack>
        </HStack>

        <Spacer />

        <Menu_button />
      </Flex>

      <Text mb="2" py="3" px="4" fontSize="18">
        {post_body}
      </Text>

      <Image_show img_num={parseInt(img_num)} id={id} />

      <Flex direction="row-reverse" px="1" mt="1.5">
        <Comment_share comment={comment_num} share={10} />
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
        <Like_button
          id={id}
          author_id={author_id}
          emailS={emailS}
          codeS={codeS}
          like_num={like_num}
          dislike_num={dislike_num}
          love_num={love_num}
          hate_num={hate_num}
        />

        <Button
          variant="ghost"
          _text={{
            color: "#137950",
            fontSize: 15,
          }}
          endIcon={
            <Icon as={EvilIcons} name="comment" size="md" color="#137950" />
          }
          onPress={() =>
            navigation.navigate("Comment_page", {
              id: id,
              like_num: like_num,
              dislike_num: dislike_num,
              love_num: love_num,
              hate_num: hate_num,
            })
          }
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
