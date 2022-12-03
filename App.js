import { useState, useEffect, memo } from "react";

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from "@react-navigation/stack";

import {
  forVerticalIOS,
  forModalPresentationIOS,
} from "@react-navigation/stack/lib/module/TransitionConfigs/CardStyleInterpolators";

import { ModalSlideFromBottomIOS } from "@react-navigation/stack/lib/module/TransitionConfigs/TransitionPresets";

import {

  NativeBaseProvider,
  Box,

} from "native-base";

import Main from "./src/view/main/main";
import Login from "./src/view/log/login";
import SignIn from "./src/view/log/signin";
import Create_post from "./src/view/main/page/component/post/create_post/create_post";
import Comment from "./src/view/main/page/component/comment/comment_main";

import link from "./src/config/const";
import GenerateRandomCode from "react-random-code-generator";

function App() {
  const [show, setShow] = useState(false);
  const [logined, setLogin] = useState(false);
  const [error, setError] = useState(null);
  const Stack = createStackNavigator();

  const [info, setInfo] = useState("");
  const [email_login, setEmailLogin] = useState("");
  const [code_login, setCodeLogin] = useState("");

  console.log(code_login);

  console.log(info);

  const viewPage = () => {
    if (logined) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ cardStyle: { flex: 1 } }}>
            <Stack.Screen
              name="Main"
              children={({ navigation }) => (
                <Main
                  codeS={code_login}
                  emailS={email_login}
                  navigation={navigation}
                ></Main>
              )}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Comment_page"
              //component={Comment}
              children={(props) => (
                <Comment
                  route_params={props.route.params}
                  codeS={code_login}
                  emailS={email_login}
                ></Comment>
              )}
              options={{
                gestureEnabled: false,
                headerShown: false,
                cardOverlayEnabled: true,
                cardShadowEnabled: true,
                ...ModalSlideFromBottomIOS,
                cardStyleInterpolator: forModalPresentationIOS,
              }}
            />
            <Stack.Screen
              name="Create_post"
              children={() => (
                <Create_post
                  codeS={code_login}
                  emailS={email_login}
                ></Create_post>
              )}
              options={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                headerTransparent: true,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: forModalPresentationIOS,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    } else {
      return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              children={() => (
                <Login
                  codeS={code_login}
                  setLogin={setLogin}
                  codeChange={setCodeLogin}
                  emailChange={setEmailLogin}
                  logined={logined}
                ></Login>
              )}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Sign in"
              component={SignIn}
              options={{
                headerShown: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  };

  return (
    <NativeBaseProvider>
      <Box flex="1" mt="0" safeAreaTop>
        {viewPage()}
      </Box>
    </NativeBaseProvider>
  );
}

export default memo(App);
