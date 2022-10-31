import React, { useState } from "react";

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

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
} from "native-base";

import { MaterialIcons } from "@expo/vector-icons";

import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import * as Yup from "yup";
import GenerateRandomCode from "react-random-code-generator";

export default function App({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [show, setShow] = React.useState(false);

  const SignupSchema = Yup.object().shape({
    emailS: Yup.string().email("Invalid email").required("Required"),
    passwordS: Yup.string()
      .min(2, "Too Short!")
      .max(70, "Too Long!")
      .required("Required password!!"),
  });

  return (
    <NativeBaseProvider>
      <ImageBackground
        source={"http://10.13.128.107/php_server/img/login.gif"}
        resizeMode="cover"
      >
        <Box alignSelf="center">
          <Image source={require("../../img/log/book_logo.png")} />
        </Box>
        <Formik
          validationSchema={SignupSchema}
          initialValues={{
            emailS: "",
            passwordS: "",
            codeS: GenerateRandomCode.TextCode(8),
          }}
          onSubmit={(values) => {
            console.log(values);
            fetch("http://10.13.128.107/php_server/controller/user/login.php", {
              method: "POST",
              mode: "no-cors",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(values),
            })
              .then((res) => res.json())
              .then((data) => {
                console.log("Success:", data);
              })
              .catch((error) => {
                console.error("Error:", error);
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
            <Stack space={4} w="100%" alignItems="center">
              <FormControl isInvalid w="75%" maxW="300px">
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  name="emailS"
                  placeholder="Enter email"
                  onChangeText={handleChange("emailS")}
                  onBlur={handleBlur("emailS")}
                  value={values.emailS}
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

              <FormControl isInvalid w="75%" maxW="300px">
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  name="passwordS"
                  placeholder="Enter password"
                  onChangeText={handleChange("passwordS")}
                  onBlur={handleBlur("passwordS")}
                  value={values.passwordS}
                  type={show ? "text" : "password"}
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
                {errors.emailS && (
                  <FormControl.ErrorMessage
                    leftIcon={<WarningOutlineIcon size="xs" />}
                  >
                    {errors.emailS}
                  </FormControl.ErrorMessage>
                )}
              </FormControl>

              <TouchableOpacity>
                <Text>
                  New user, Sign in here{" "}
                  <Text onPress={() => navigation.navigate("SignIn")}>...</Text>
                </Text>
              </TouchableOpacity>

              <Button title="Login" onPress={() => handleSubmit()}>
                Login
              </Button>

              <Button
                title="Go to Details"
                onPress={() => navigation.navigate("BookList")}
              >
                Go to Details
              </Button>

              <Button
                title="Go to Tutorial"
                onPress={() => navigation.navigate("Tutorial")}
              >
                Tutorial
              </Button>
            </Stack>
          )}
        </Formik>
      </ImageBackground>
    </NativeBaseProvider>
  );
}
