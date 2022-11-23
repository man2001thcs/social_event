import React from "react";

import { MaterialIcons } from "@expo/vector-icons";
import { Platform, FlatList, SectionList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Ionicons } from "@expo/vector-icons";
import {
  HStack,
  Text,
  NativeBaseProvider,
  Box,
  Flex,
  Button,
  Icon,
  Heading,
  Spacer,
  Spinner,
  IconButton,
  Avatar,
  Center,
  ScrollView,
} from "native-base";

import { AntDesign, FontAwesome5, EvilIcons } from "@expo/vector-icons";
import SinglePost from "./component/post/single_post";
import Create_post from "./component/post/create_post";
import GenerateRandomCode from "react-random-code-generator";

import link from "../../../config/const";

function Home({ navigation }) {
  const [show, setShow] = React.useState(false);
  const [showNumber, setShowNumber] = React.useState(0);

  const [refresh_now, setRefresh] = React.useState(false);
  const [load_more, setLoadMore] = React.useState(false);
  const [cant_load_more, setCantLoadMore] = React.useState(false);
  const [post_list, setPostList] = React.useState([]);

  const Stack = createStackNavigator();

  const fetchData = async () => {
    if (!cant_load_more || post_list.length === 0) {
      const getPost_link =
        link.post_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

      var values = { offset: showNumber, limit: 5 };

      await fetch(getPost_link, {
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
          console.log("Success:", data);

          if (parseInt(data?.response.id) === 0) {
            setCantLoadMore(true);
          } else if (parseInt(data?.response.id) === 1) {
            setShowNumber(showNumber + 5);
            let response_data = JSON.parse(data?.response.data);
            console.log(response_data);

            if (post_list.length === 0) {
              setPostList(response_data);
            } else {
              setPostList([...post_list, ...response_data]);
            }
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    setLoadMore(false);
  };

  const refreshData = async () => {
    const getPost_link =
      link.post_link + "?timeStamp=" + GenerateRandomCode.TextCode(8);

    var values = { offset: 0, limit: 5 };

    await fetch(getPost_link, {
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
        console.log("Success:", data);

        if (parseInt(data?.response.id) === 0) {
          setCantLoadMore(true);
        } else if (parseInt(data?.response.id) === 1) {
          let response_data = JSON.parse(data?.response.data);
          //console.log(response_data);
          setPostList(response_data);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      
    setShowNumber(5);
    setCantLoadMore(false);
    setRefresh(false);
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  function NewPost() {
    return (
      <HStack justifyContent="center" bgColor={"white"} py="3">
        <Avatar
          mr="3"
          bg="green.500"
          source={{
            uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          }}
        >
          abc
        </Avatar>
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

  const renderItem = ({ item }) => {
    return (
      <SinglePost
        id={item?.Post.id}
        author_name={item?.Post.user_id}
        post_body={item?.Post.post_body}
        img_num={item?.Post.img_num}
        comment_num={12}
      />
    );
  };

  const memoizedList = React.useMemo(() => {
    return post_list;
  }, [post_list]);

  const memoizedValue = React.useMemo(() => renderItem, [showNumber]);

  const LoadingScreen = () => {
    return (
      <HStack space={2} justifyContent="center" py="4" bgcolor="white">
        <Spinner accessibilityLabel="Loading posts" />
        <Heading color="primary.500" fontSize="md">
          Loading
        </Heading>
      </HStack>
    );
  };

  const memoLoadingScreen = React.useMemo(() => LoadingScreen, [post_list]);

  return (
    <Box flex="1" mt="0">
      <HStack>
        <FlatList
          data={memoizedList}
          renderItem={memoizedValue}
          keyExtractor={(item) => item?.Post.id}
          ListHeaderComponent={() => {
            return NewPost();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={!cant_load_more && memoLoadingScreen()}
          onEndReached={() => {
            if (!load_more && !cant_load_more) {
              setLoadMore(true);
              fetchData();
            }
          }}
          refreshing={refresh_now}
          onRefresh={() => {
            setRefresh(true);
            refreshData();
          }}
        />
      </HStack>
    </Box>
  );
}

export default React.memo(Home);
