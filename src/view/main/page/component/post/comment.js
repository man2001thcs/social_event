import React, { useState } from "react";
import { StatusBar, FlatList } from "native-base";
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
  IconButton,
  Text,
} from "native-base";

import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { CheckIcon, AntDesign } from "@expo/vector-icons";

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
import { useNavigation, useIsFocused } from "@react-navigation/native";

export default function Comment({ emailS, codeS }) {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [service, setService] = useState("0");
  const dimensions = Dimensions.get("window");
  const mime = require("mime");
  const [isLoaded, setIsLoaded] = useState(false);

  const SignupSchema = Yup.object().shape({
    comment_body: Yup.string()
      .max(5000, "Nội dung dài quá quy định!!")
      .required("Cần nội dung!!"),
  });

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d73",
      title: "Third Item1",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d74",
      title: "Third Item1",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d75",
      title: "Third Item1",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d76",
      title: "Third Item1",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d77",
      title: "Third Item1",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d78",
      title: "Third Item1",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d79",
      title: "Third Item1",
    },
  ];

  const Item = ({ title }) => (
    <Box ml="4">
      <Text fontSize="5xl">{title}</Text>
    </Box>
  );

  const renderItem = ({ item }) => <Item title={item.title} />;

  //console.log(images);

  return (
    <NativeBaseProvider>
      <Formik
        validationSchema={SignupSchema}
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          emailS: emailS,
          codeS: codeS,
          comment_body: "",
        }}
        onSubmit={async (values, actions) => {
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
            .then((res) => res.json())
            .then((data) => {
              console.log("Success:", data);
            })
            .catch((error) => {
              console.error("Error:", error);
            });

          if (images !== undefined && images !== null) {
            if (images.selected === undefined) {
              handleImage1();
            } else {
              handleImage2();
            }
          }

          actions.setSubmitting(false);

          actions.resetForm({
            values: {
              // the type of `values` inferred to be Blog
              emailS: emailS,
              codeS: codeS,
              comment_body: "123",
              img_num: getImageNum(images),
            },

            // you can also set the other form states here
          });
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          values,
          errors,
          isValid,
        }) => (
          <Box mb="2.5" bgColor="white" borderRadius="xl" flex="1">
            <Flex direction="row" space={8} mr="0" mb="3">
              <Text mt="2" ml="3">
                <Icon as={AntDesign} name="like1" size="md" color="#137950" />{" "}
                <Heading size="sm">48</Heading>
              </Text>

              <VStack>
                <Button
                  variant="ghost"
                  endIcon={
                    <Icon
                      as={AntDesign}
                      name="right"
                      size="md"
                      color="#137950"
                    />
                  }
                  onPress={() => navigation.navigate("Home")}
                />
              </VStack>

              <Spacer></Spacer>

              <VStack>
                <Button
                  variant="ghost"
                  endIcon={
                    <Icon
                      as={AntDesign}
                      name="like2"
                      size="md"
                      color="#137950"
                    />
                  }
                  onPress={() => navigation.navigate("Home")}
                />
              </VStack>
            </Flex>

            <HStack>
              <FlatList
                style={{ flex: 1, height: "72%"}}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
              />
            </HStack>

            <HStack my="3" position= 'absolute' left="0" right="0" bottom="0">
              <FormControl isInvalid={errors.comment_body} maxH="300px">
                <Input
                  mx="3"
                  w={dimensions.width - 20}
                  rowSpan={13}
                  placeholder="Nhập gì đó"
                  textAlign="left"
                  onChangeText={handleChange("comment_body")}
                  value={values.comment_body}
                  validateOnChange={false}
                  validateOnBlur={false}
                />
                {errors.comment_body && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.comment_body}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>
            </HStack>
          </Box>
        )}
      </Formik>
    </NativeBaseProvider>
  );
}
