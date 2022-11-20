import React, { useState } from "react";

import {
  Input,
  Icon,
  Stack,
  Pressable,
  Center,
  NativeBaseProvider,
  FormControl,
  WarningOutlineIcon,
  Box,
  extendTheme,
  Button,
  Divider,
  Heading,
  HStack,
  Flex,
  Spacer,
  VStack,
  Avatar,
  Select,
  TextArea,
  ScrollView,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { CheckIcon } from "@expo/vector-icons";

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormik,
  isEmptyArray,
} from "formik";
import * as Yup from "yup";
import { Dimensions } from "react-native";

import * as ImagePicker from "expo-image-picker";

import link from "../../../../../config/const";
import image_show from "./img_up_show";
import GenerateRandomCode from "react-random-code-generator";

export default function Create_post({ navigation, emailS, codeS }) {
  const [service, setService] = useState("0");
  const dimensions = Dimensions.get("window");
  const mime = require("mime");
  const [isLoaded, setIsLoaded] = useState(false);

  const SignupSchema = Yup.object().shape({
    post_body: Yup.string()
      .max(5000, "Nội dung dài quá quy định!!")
      .required("Cần nội dung!!"),
  });
  const [images, setImage] = useState(null);

  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.granted == false) {
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result);
      }
    }
  };

  function handleImage1() {
    const newImageUri = "file:///" + images.uri.split("file:/").join("");

    const payload = new FormData();
    payload.append("image", {
      uri: newImageUri,
      type: mime.getType(newImageUri),
      name: "1.png",
    });

    fetch(
      link.server_link +
        "controller/post/save_img.php?timeStamp=" +
        GenerateRandomCode.TextCode(8),
      {
        body: payload,
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => res.text())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function handleImage2() {
    for (var i = 0; i < images.selected.length; i++) {
      var newImageUri =
        "file:///" + images.selected[i].uri.split("file:/").join("");
      const payload = new FormData();
      payload.append("image", {
        uri: newImageUri,
        type: mime.getType(newImageUri),
        name: i + 1 + ".png",
      });

      console.log(payload);

      const config = {
        body: payload,
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      await fetch(
        link.server_link +
          "controller/post/save_img.php?timeStamp=" +
          GenerateRandomCode.TextCode(8),
        config
      )
        .then((res) => res.text())
        .then((data) => {
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
  console.log(images);

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Formik
          validationSchema={SignupSchema}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            emailS: emailS,
            codeS: codeS,
            post_body: "",
            img_num:
              images === null
                ? 0
                : images?.selected !== undefined
                ? images.selected.length
                : 1,
          }}
          onSubmit={async (values, actions) => {
            /*
            await fetch(
              link.server_link +
                "controller/post/create.php?timeStamp=" +
                GenerateRandomCode.TextCode(8),
              {
                method: "POST",
                mode: "no-cors",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
              }
            )
              .then((res) => res.text())
              .then((data) => {
                console.log("Success:", data);
                setIsLoaded(false);
              })
              .catch((error) => {
                console.error("Error:", error);
                setIsLoaded(false);
              });
            */

            if (images !== undefined && images !== null) {
              if (images.selected === undefined) {
                handleImage1();
              } else {
                handleImage2();
              }
            }

            actions.resetForm({
              values: {
                // the type of `values` inferred to be Blog
                emailS: emailS,
                codeS: codeS,
                post_body: "123",
                img_num:
                  images === null
                    ? 0
                    : images?.selected !== undefined
                    ? images.selected.length
                    : 1,
              },

              // you can also set the other form states here
            });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <Box mb="2.5" bgColor="white">
              <Flex direction="row" space={8} mr="3">
                <Button
                  variant="ghost"
                  h="10"
                  w="20"
                  endIcon={
                    <Icon
                      as={Ionicons}
                      name="arrow-back"
                      size="xl"
                      color="#137950"
                    />
                  }
                  onPress={() => navigation.navigate("Home")}
                />
                <Heading size="md" mt="2">
                  Solid
                </Heading>

                <Spacer></Spacer>

                <Button
                  size="md"
                  variant="solid"
                  alignSelf="flex-end"
                  bgColor="#137950"
                  onPress={async () => {
                    await setIsLoaded(true);
                    await handleSubmit();
                  }}
                  isLoading={!isLoaded}
                  isLoadingText="Đang tạo"
                >
                  Đăng
                </Button>
              </Flex>

              <Divider
                my="3"
                thickness="2"
                _light={{
                  bg: "muted.400",
                }}
                _dark={{
                  bg: "muted.50",
                }}
              />
              <HStack direction="row" space={8} px="3" mt="3">
                <VStack mt="3">
                  <Avatar
                    bg="green.500"
                    source={{
                      uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
                    }}
                  >
                    AJ
                  </Avatar>
                </VStack>

                <VStack>
                  <HStack>
                    <Heading size="sm">Thành Đô</Heading>
                  </HStack>

                  <HStack>
                    <Select
                      selectedValue={service}
                      minWidth="40"
                      fontSize="xs"
                      height="10"
                      accessibilityLabel="Chỉ mình tôi"
                      placeholder="Chỉ mình tôi"
                      _selectedItem={{
                        bg: "teal.600",
                      }}
                      mt={1}
                      onValueChange={(itemValue) => setService(itemValue)}
                    >
                      <Select.Item label="Công khai" value="Công khai" />
                      <Select.Item label="Chỉ mình tôi" value="Chỉ mình tôi" />
                    </Select>
                  </HStack>
                </VStack>
              </HStack>

              <HStack my="3">
                <FormControl isInvalid={errors.post_body} maxH="300px">
                  <TextArea
                    mx="3"
                    w={dimensions.width - 20}
                    rowSpan={13}
                    placeholder="Nhập gì đó"
                    textAlign="left"
                    onChangeText={handleChange("post_body")}
                    value={values.post_body}
                    validateOnChange={false}
                    validateOnBlur={false}
                  />
                  {errors.post_body && (
                    <FormControl.ErrorMessage
                      leftIcon={<WarningOutlineIcon size="xs" />}
                    >
                      {errors.post_body}
                    </FormControl.ErrorMessage>
                  )}
                </FormControl>
              </HStack>

              <Center>
                {images != null
                  ? images.selected === undefined
                    ? image_show(new Array(images))
                    : image_show(images?.selected)
                  : ""}
              </Center>
              <HStack ml="4">
                {images != null ? (
                  <Box>
                    <Button
                      size="md"
                      variant="solid"
                      bgColor="#F70000"
                      alignSelf="flex-end"
                      onPress={() => setImage(null)}
                    >
                      Gỡ
                    </Button>
                  </Box>
                ) : (
                  ""
                )}
              </HStack>
              <Divider
                my="3"
                thickness="1"
                _light={{
                  bg: "muted.400",
                }}
                _dark={{
                  bg: "muted.50",
                }}
              />
              <HStack space={4} justifyContent="flex-start" pb="1" px="3">
                <Button
                  variant="ghost"
                  h="10"
                  startIcon={
                    <Icon
                      as={FontAwesome}
                      name="picture-o"
                      size="md"
                      color="#137950"
                    />
                  }
                  onPress={() => pickImage()}
                  _text={{ color: "#137950" }}
                >
                  {"Ảnh & Video"}
                </Button>
              </HStack>
              <Divider
                my="2"
                thickness="1"
                _light={{
                  bg: "muted.400",
                }}
                _dark={{
                  bg: "muted.50",
                }}
              />
              <HStack space={4} justifyContent="flex-start" pb="1" px="3">
                <Button
                  variant="ghost"
                  h="10"
                  startIcon={
                    <Icon
                      as={FontAwesome5}
                      name="user-friends"
                      size="md"
                      color="#137950"
                    />
                  }
                  _text={{ color: "#137950" }}
                >
                  Tag bạn bè
                </Button>
              </HStack>
              <Divider
                my="2"
                thickness="1"
                _light={{
                  bg: "muted.400",
                }}
                _dark={{
                  bg: "muted.50",
                }}
              />
            </Box>
          )}
        </Formik>
      </ScrollView>
    </NativeBaseProvider>
  );
}
