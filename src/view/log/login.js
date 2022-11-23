import React, { memo, useState } from "react";

import link from "../../config/const";

import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import {
  Text,
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
} from "native-base";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import GenerateRandomCode from "react-random-code-generator";
import { Dimensions } from "react-native";

function Login({ codeChange, emailChange, setLogin, logined }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [show, setShow] = React.useState(false);

  const SignupSchema = Yup.object().shape({
    emailS: Yup.string().email("Invalid email").required("Required email!"),
    passwordS: Yup.string()
      .min(2, "Require longer password!")
      .max(70, "Password is too long!")
      .required("Required password!"),
  });

  const dimensions = Dimensions.get("window");

  return (
    <NativeBaseProvider>
      <Box bgColor="white" py="4" h="100%">
        <Box alignSelf="center">
          <Image
            source={require("../../img/log/background.jpg")}
            style={{
              width: dimensions.width,
              height: 230,
            }}
          />
        </Box>
        <Formik
          validationSchema={SignupSchema}
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={{
            emailS: "dochu8@gmail.com",
            passwordS: "123",
            codeS: GenerateRandomCode.TextCode(8),
          }}
          onSubmit={async (values, actions) => {
            await fetch(
              link.server_link +
                "controller/user/login.php?TimeStamp=" +
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
                if (data?.response.description === "success") {
                  setLogin(true);
                  codeChange(values.codeS);
                  emailChange(values.emailS);
                  actions.setSubmitting(false);
                } else {
                  alert("Đăng nhập thất bại, vui lòng thử lại sau");
                }
              })
              .catch((error) => {
                console.error("Error:", error);
              });

            setTimeout(() => {
              if (!logined) {
                actions.setSubmitting(false);
              }
            }, 5000);

            actions.resetForm({
              values: {
                // the type of `values` inferred to be Blog
                emailS: "dochu8@gmail.com",
                passwordS: "123",
                codeS: GenerateRandomCode.TextCode(8),
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
            <Stack
              space={4}
              w="100%"
              alignItems="center"
              bgColor="white"
              mt="3"
              px="4"
            >
              <FormControl isInvalid={errors.emailS} w="75%" maxW="300px">
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  name="emailS"
                  placeholder="Enter email"
                  onChangeText={handleChange("emailS")}
                  value={values.emailS}
                  validateOnChange={false}
                  validateOnBlur={false}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="person" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                />
                {errors.emailS && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.emailS}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <FormControl isInvalid={errors.passwordS} w="75%" maxW="300px">
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  name="passwordS"
                  placeholder="Enter password"
                  onChangeText={handleChange("passwordS")}
                  value={values.passwordS}
                  type={show ? "text" : "password"}
                  validateOnChange={false}
                  validateOnBlur={false}
                  InputLeftElement={
                    <Icon
                      as={<MaterialIcons name="vpn-key" />}
                      size={5}
                      ml="2"
                      color="muted.400"
                    />
                  }
                  InputRightElement={
                    <Pressable onPress={() => setShow(!show)}>
                      <Icon
                        as={
                          <MaterialIcons
                            name={show ? "visibility" : "visibility-off"}
                          />
                        }
                        size={5}
                        mr="2"
                        color="muted.400"
                      />
                    </Pressable>
                  }
                />
                {errors.passwordS && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.passwordS}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <TouchableOpacity>
                <Text>
                  Forgot password? Click
                  <Text
                    bold
                    underline
                    italic
                    onPress={() => navigation.navigate("SignIn")}
                  >
                    {" "}
                    here
                  </Text>
                </Text>
              </TouchableOpacity>
              <HStack px="4">
                <Button
                  title="Login"
                  w="100%"
                  onPress={() => handleSubmit()}
                  bgColor="#137950"
                  isLoading={isSubmitting}
                  isLoadingText="Đang đăng nhập"
                >
                  Login
                </Button>
              </HStack>

              <HStack px="4">
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
              </HStack>
              <HStack px="4">
                <Button
                  w="100%"
                  title="Sign In"
                  onPress={() => navigation.navigate("Sign in")}
                >
                  Sign up
                </Button>
              </HStack>
            </Stack>
          )}
        </Formik>
      </Box>
    </NativeBaseProvider>
  );
}

export default memo(Login);
