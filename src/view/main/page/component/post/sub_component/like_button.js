import React, { useState } from "react";
import {
  Popover,
  Button,
  VStack,
  Select,
  CheckIcon,
  Box,
  Center,
  NativeBaseProvider,
  Stagger,
  IconButton,
  Icon,
  HStack,
} from "native-base";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons,
  AntDesign,
} from "@expo/vector-icons";

function Like_button() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover // @ts-ignore
      placement="top"
      trigger={(triggerProps) => {
        return (
          <Button
            variant="ghost"
            _text={{
              color: "#137950",
              fontSize: 15,
            }}
            endIcon={
              <Icon as={EvilIcons} name="like" size="md" color="#137950" />
            }
            onLongPress={() => setIsOpen(true)}
            {...triggerProps}
          >
            Like
          </Button>
        );
      }}
      isOpen={isOpen}
      onClose={() => setIsOpen(!isOpen)}
    >
      <Popover.Content w="56" rounded="xl">
        <Popover.Body>
          <Stagger
            visible={isOpen}
            initial={{
              opacity: 0,
              scale: 0,
              translateY: 34,
            }}
            animate={{
              translateY: 0,
              scale: 1,
              opacity: 1,
              transition: {
                type: "spring",
                mass: 0.8,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
            exit={{
              translateY: 34,
              scale: 0.5,
              opacity: 0,
              transition: {
                duration: 100,
                stagger: {
                  offset: 30,
                  reverse: true,
                },
              },
            }}
          >
            <HStack justifyContent="center" space="2">
              <IconButton
                variant="solid"
                bg="green.500"
                colorScheme="green"
                borderRadius="full"
                icon={
                  <Icon
                    as={AntDesign}
                    size="md"
                    name="like1"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                variant="solid"
                bg="amber.400"
                colorScheme="amber"
                borderRadius="full"
                icon={
                  <Icon
                    as={AntDesign}
                    _dark={{
                      color: "warmGray.50",
                    }}
                    size="md"
                    name="dislike1"
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                variant="solid"
                bg="red.500"
                colorScheme="red"
                borderRadius="full"
                icon={
                  <Icon
                    as={AntDesign}
                    _dark={{
                      color: "warmGray.50",
                    }}
                    size="md"
                    name="heart"
                    color="warmGray.50"
                  />
                }
              />
              <IconButton
                variant="solid"
                bg="violet.600"
                colorScheme="violet"
                borderRadius="full"
                icon={
                  <Icon
                    as={MaterialCommunityIcons}
                    size="6"
                    name="heart-broken"
                    _dark={{
                      color: "warmGray.50",
                    }}
                    color="warmGray.50"
                  />
                }
              />
            </HStack>
          </Stagger>
        </Popover.Body>
      </Popover.Content>
    </Popover>
  );
}

export default React.memo(Like_button);
