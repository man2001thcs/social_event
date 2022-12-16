import { useState, useEffect, memo } from "react";

import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
  TransitionSpecs,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
} from "@react-navigation/stack";

import {
  forVerticalIOS,
  forModalPresentationIOS,
  forModalPresentationIOS_half,
} from "@react-navigation/stack/lib/module/TransitionConfigs/CardStyleInterpolators";

import { ModalSlideFromBottomIOS } from "@react-navigation/stack/lib/module/TransitionConfigs/TransitionPresets";

import {
  NativeBaseProvider,
  Box,
  Button,
  Input,
  Icon,
  HStack,
  Pressable,
} from "native-base";

import Search_bar from "./src/view/main/page/component/post/personal_home_toolbar/search_bar";
import Main from "./src/view/main/main";
import Login from "./src/view/log/login";
import SignIn from "./src/view/log/signin";
import Create_post from "./src/view/main/page/component/post/create_post/create_post";
import Comment from "./src/view/main/page/component/comment/comment_main";
import PersonalHome from "./src/view/main/page/personal_home";
import Single_post_full_view from "./src/view/main/page/component/post/single_post/single_post_full_view";
import Single_post_img_view from "./src/view/main/page/component/post/single_post/single_post_img_view";
import Share_post from "./src/view/main/page/component/post/single_post/sub_component/share_page/share_post";

import Test from "./src/view/main/page/test";

function App() {
  const [show, setShow] = useState(false);
  const [logined, setLogin] = useState(false);
  const [error, setError] = useState(null);
  const Stack = createStackNavigator();

  const [info, setInfo] = useState([]);
  const [email_login, setEmailLogin] = useState("");
  const [code_login, setCodeLogin] = useState("");

  //console.log("info: " + JSON.stringify(info));

  const viewPage = () => {
    if (logined) {
      return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ cardStyle: { flex: 1 } }}>
            <Stack.Screen
              name="Main"
              children={({ navigation }) => (
                <Main
                  this_user_id={info?.id}
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
                gestureDirection: "vertical",
                presentation: "modal",
                transitionSpec: {
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
                cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
                headerStyleInterpolator: HeaderStyleInterpolators.forFade,
              }}
            />
            <Stack.Screen
              name="Create_post"
              children={(props) => (
                <Create_post
                  route_params={props.route.params}
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

            <Stack.Screen
              name="Personal_home"
              children={() => (
                <PersonalHome
                  codeS={code_login}
                  emailS={email_login}
                  info={info}
                  this_user_id={info?.id}
                ></PersonalHome>
              )}
              options={{
                headerTitle: () => <Search_bar />,
                headerShown: true,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.ModalTransition,
                cardStyleInterpolator: forModalPresentationIOS,
              }}
            />

            <Stack.Screen
              name="Single_post_full_view"
              children={(props) => (
                <Single_post_full_view
                  codeS={code_login}
                  emailS={email_login}
                  info={info}
                  route_params={props.route.params}
                ></Single_post_full_view>
              )}
              options={{
                headerTitle: "Bài viết",
                headerShown: true,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.DefaultTransition,
              }}
            />

            <Stack.Screen
              name="Single_post_img_view"
              children={(props) => (
                <Single_post_img_view
                  codeS={code_login}
                  emailS={email_login}
                  info={info}
                  route_params={props.route.params}
                ></Single_post_img_view>
              )}
              options={{
                headerTitle: "Bài viết img",
                headerShown: false,
                gestureEnabled: false,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                ...TransitionPresets.DefaultAnimation,
              }}
            />

            <Stack.Screen
              name="Share_post"
              children={(props) => (
                <Share_post
                  codeS={code_login}
                  emailS={email_login}
                  route_params={props.route.params}
                ></Share_post>
              )}
              options={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                gestureDirection: "vertical",
                detachPreviousScreen: false,
                transitionSpec: {
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
                cardStyleInterpolator:
                  CardStyleInterpolators.forModalPresentationIOSHalf,
                headerStyleInterpolator: HeaderStyleInterpolators.forFade,
              }}
            />

            <Stack.Screen
              name="Test"
              children={(props) => (
                <Test
                  codeS={code_login}
                  emailS={email_login}
                  route_params={props.route.params}
                ></Test>
              )}
              options={{
                headerShown: false,
                gestureEnabled: true,
                cardOverlayEnabled: true,
                headerTransparent: false,
                cardShadowEnabled: true,
                gestureDirection: "vertical",
                detachPreviousScreen: false,
                transitionSpec: {
                  open: TransitionSpecs.TransitionIOSSpec,
                  close: TransitionSpecs.TransitionIOSSpec,
                },
                cardStyleInterpolator: CardStyleInterpolators.forFadeFromCenter,
                headerStyleInterpolator: HeaderStyleInterpolators.forFade,
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
                  setInfo={setInfo}
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
      <Box flex="1" mt="0">
        {viewPage()}
      </Box>
    </NativeBaseProvider>
  );
}

export default memo(App);
