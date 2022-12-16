import React from "react";
import { FlatList } from "native-base";
import {
  Icon,
  Box,
  Button,
  HStack,
  Flex,
  Spacer,
  VStack,
  Heading,
  Spinner,
  IconButton,
  Image,
} from "native-base";

import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import * as Yup from "yup";
import { Dimensions } from "react-native";
import GenerateRandomCode from "react-random-code-generator";
import { useNavigation } from "@react-navigation/native";

import link from "../../../../../config/const";
import Emo_already from "./like_function/emo_already";
import Create_comment from "./create_comment/create_comment";
import Single_comment from "./single_comment/single_comment";

//comment main page
function Comment({ emailS, codeS, route_params }) {
  const dimensions = Dimensions.get("window");
  //number of comment showed
  const [showNumber, setShowNumber] = React.useState(0);
  const navigation = useNavigation();

  const [refresh_now, setRefresh] = React.useState(false);
  const [load_more, setLoadMore] = React.useState(false);
  const [cant_load_more, setCantLoadMore] = React.useState(false);
  const [comment_list, setCommentList] = React.useState([]);

  //fetch comment data function
  const fetchData = async () => {
    const getComment_link =
      link.commment_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    console.log(route_params);

    await fetch(getComment_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        post_id: route_params.id,
        limit: showNumber,
        emailS: emailS,
        codeS: codeS,
        getMore: 1,
      }),
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Success", data);

        if (parseInt(data?.id) !== 1) {
          setCantLoadMore(true);
          setLoadMore(false);
        } else if (parseInt(data?.id) === 1) {
          setShowNumber(showNumber + 5);
          let response_data = JSON.parse(data?.data);
          console.log(response_data);
          setCommentList(response_data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setLoadMore(false);
  };

  const refreshData = async () => {
    const getComment_link =
      link.commment_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    var values = { limit: 5, emailS: emailS, codeS: codeS, getMore: 0 };

    await fetch(getComment_link, {
      mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(values),
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("Success:", data);

        if (parseInt(data?.id) === 0) {
          setCantLoadMore(true);
        } else if (parseInt(data?.id) === 1) {
          let response_data = JSON.parse(data?.data);
          console.log(response_data);
          setCommentList(response_data);
        }
      })
      .catch((error) => {
        //console.error("Error:", error);
      });

    setShowNumber(5);
    setCantLoadMore(false);
    setLoadMore(false);
    setRefresh(false);
  };

  //fetch data for first time only since render
  React.useEffect(() => {
    fetchData();
  }, []);

  //render function for flatlist
  const renderItem = ({ item, index }) => {
    if (
      item?.Comment.id !== null &&
      item !== undefined &&
      item?.Comment.id !== undefined
    )
      return (
        <Single_comment
          key={item?.Comment.id}
          id={item?.Comment.id}
          post_id={item?.Comment.post_id}
          user_id={item?.Comment.user_id}
          user_account={item?.Comment.user_account}
          user_name={item?.Comment.user_name}
          comment_body={item?.Comment.comment_body}
          img_num={item?.Comment.img_num}
          like_num={item?.Comment.like_num}
          dislike_num={item?.Comment.dislike_num}
          love_num={item?.Comment.love_num}
          hate_num={item?.Comment.hate_num}
          created={item?.Comment.created}
          modified={item?.Comment.modified}
          rank={item?.Comment.rank}
          emailS={emailS}
          codeS={codeS}
          navigation={navigation}
          style={{ flex: 1 }}
        />
      );
  };

  //memolized list
  const memoizedList = React.useMemo(() => {
    return comment_list;
  }, [comment_list]);

  //memolized render value
  const memoizedValue = React.useMemo(
    () => renderItem,
    [showNumber, load_more]
  );

  //loading sreen
  const LoadingScreen = () => {
    return (
      <HStack space={2} justifyContent="center" py="4" bgcolor="white">
        <Spinner accessibilityLabel="Loading posts" color="green.600" />
        <Heading color="green.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  };

  //loading memo
  const memoLoadingScreen = React.useMemo(() => LoadingScreen, [comment_list]);

  const EmptyScreen = () => {
    return (
      <Box>
        <HStack
          space={2}
          justifyContent="center"
          justifyItems="center"
          py="4"
          bgcolor="white"
          mt="50"
        >
          <Image
            source={require("../../../../../img/no_comment.jpg")}
            alt="Alternate Text"
            size="xl"
          />
        </HStack>
        <HStack  justifyContent="center">
          <Heading color="green.500" fontSize="xl">Chưa có bình luận</Heading>
        </HStack>
      </Box>
    );
  };

  const memoEmptyScreen = React.useMemo(() => EmptyScreen, [comment_list]);

  return (
    <Box mb="2.5" bgColor="white" borderRadius="xl" flex="1">
      <Flex
        direction="row"
        space={8}
        mr="0"
        mb="3"
        alignItems="center"
        my="2"
        mx="2"
      >
        <Emo_already
          like_num={route_params.like_num}
          dislike_num={route_params.dislike_num}
          love_num={route_params.love_num}
          hate_num={route_params.hate_num}
        />
        <Spacer></Spacer>
        <VStack>
          <Button
            variant="ghost"
            endIcon={
              <Icon as={AntDesign} name="like2" size="md" color="#137950" />
            }
            onPress={() => navigation.navigate("Home")}
          />
        </VStack>
      </Flex>

      <HStack
        position="absolute"
        left="0"
        right="0"
        top="12"
        zIndex={2}
        h={dimensions.height * 0.8}
      >
        <FlatList
          style={{ flex: 1, height: dimensions.height * 0.77 }}
          data={memoizedList}
          renderItem={memoizedValue}
          keyExtractor={(item) => item.Comment.id}
          onEndReachedThreshold={0.5}
          ListFooterComponent={!cant_load_more && memoLoadingScreen()}
          ListEmptyComponent={cant_load_more && memoEmptyScreen}
          onEndReached={() => {
            if (!cant_load_more) {
              setLoadMore(true);
              fetchData();
            }
          }}
        />
      </HStack>

      <HStack
        mt="3"
        mb="-3"
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        bgColor="white"
        zIndex={2}
      >
        <Create_comment
          emailS={emailS}
          codeS={codeS}
          post_id={route_params.id}
          refreshData={refreshData}
        />
      </HStack>
    </Box>
  );
}

export default React.memo(Comment);
