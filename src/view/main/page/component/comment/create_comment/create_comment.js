import React, { useState } from "react";
import {
  FormControl,
  WarningOutlineIcon,
  Input,
  IconButton,
  HStack,
  useToast,
  Center,
} from "native-base";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as Yup from "yup";
import { Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import GenerateRandomCode from "react-random-code-generator";

import link from "../../../../../../config/const.js";
import image_show from "./img_up_show/img_up_show";
import ToastAlert from "../../alert.js";

function Create_comment({ emailS, codeS, post_id }) {
  const toast = useToast();
  const dimensions = Dimensions.get("window");
  const mime = require("mime");

  const SignupSchema = Yup.object().shape({
    comment_body: Yup.string()
      .max(5000, "Nội dung dài quá quy định!!")
      .required("Cần nội dung!!"),
  });
  const [images, setImage] = useState([]);

  //Get image number from picker
  const getImageNum = (images) => {
    if (images === null || images.length === 0) {
      return 0;
    } else {
      if (images?.selected === undefined) {
        return 1;
      } else {
        return images?.selected.length;
      }
    }
  };

  //pick image function
  const pickImage = async () => {
    let permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted == false) {
      return;
    } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        //console.log(result);
        if (getImageNum(result) >= 2) {
          toast.show({
            render: ({ id }) => {
              return (
                <ToastAlert
                  id={id}
                  title="Số lượng ảnh quá quy định (2)!!"
                  variant="solid"
                  description={"Lỗi: Quá lượng ảnh quy định (2 ảnh)."}
                  isClosable={true}
                />
              );
            },
          });
        } else {
          if (images.length === 0) {
            setImage([result]);
          } else setImage([...images, result]);
        }
      }
    }
  };

  //show up uploaded images
  const show_up_img = () => {
    if (images != undefined && images != null && images.length !== 0) {
      return image_show(images, setImage);
    }
  };

  //handle single image to POST
  function handleImage1() {
    const payload = new FormData();
    payload.append("image", {
      uri: images[0].uri,
      type: mime.getType(images[0].uri),
      name: "1.png",
    });

    fetch(
      link.server_link +
        "controller/comment/save_img.php?timeStamp=" +
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

  //handle 2 images to POST
  async function handleImage2() {
    for (var i = 0; i < images.selected.length; i++) {
      const payload = new FormData();
      payload.append("image", {
        uri: images[i].uri,
        type: mime.getType(images[i].uri),
        name: i + 1 + ".png",
      });
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
          "controller/comment/save_img.php?timeStamp=" +
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

  return (
    <Formik
      validationSchema={SignupSchema}
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        emailS: emailS,
        codeS: codeS,
        post_id: post_id,
        comment_body: "",
      }}
      onSubmit={async (values, actions) => {
        values.img_num = getImageNum(images);
        //send request to create comment first
        await fetch(
          link.server_link +
            "controller/comment/create.php?timeStamp=" +
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
          })
          .catch((error) => {
            console.error("Error:", error);
          });

        //upload images later
        if (images !== undefined && images !== null) {
          if (images.length === 1) handleImage1();
          else handleImage2();
        }

        console.log("send");
        actions.setSubmitting(false);

        //reset form input
        actions.resetForm({
          values: {
            emailS: emailS,
            codeS: codeS,
            post_id: post_id,
            comment_body: "",
          },
        });
        setImage([]);
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
        <FormControl
          isInvalid={errors.comment_body}
          maxH="300px"
          bgColor="white"
        >
          <HStack alignContent="center" px="3">
            <Center>{show_up_img()}</Center>
          </HStack>
          <HStack px="3" pb="2">
            {errors.comment_body && (
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                {errors.comment_body}
              </FormControl.ErrorMessage>
            )}
          </HStack>
          <HStack alignContent="center" px="3">
            <Input
              mx="3"
              placeholder="Nhập gì đó"
              textAlign="left"
              width={dimensions.width * 0.75}
              onChangeText={handleChange("comment_body")}
              value={values.comment_body}
              validateOnChange={false}
              validateOnBlur={false}
            />
            <IconButton
              ml="3"
              size="md"
              variant="ghost"
              alignSelf="flex-end"
              _icon={{
                as: Ionicons,
                name: "send",
                color: "#137950",
                size: "xl",
              }}
              onPress={() => handleSubmit()}
            />
          </HStack>
          <HStack alignContent="center" px="3">
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
              onPress={() => pickImage()}
            />
          </HStack>
        </FormControl>
      )}
    </Formik>
  );
}

export default React.memo(Create_comment);
