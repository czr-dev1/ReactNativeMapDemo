import React from "react";
import { StyleSheet, StatusBar, View, Dimensions, SafeAreaView } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { connect } from "react-redux";

import DarkMapScreen from "../screens/darkMapScreen";
import LightMapScreen from "../screens/lightMapScreen";
import BookmarkedPostScreen from "../screens/bookmarkedPostScreen";
import BookmarkedUserScreen from "../screens/bookmarkedUserScreen";
import StoryListScreen from "../screens/storyListScreen";
import StoryScreen from "../screens/storyScreen";
import StoryPostScreen from "../screens/storyPostScreen";
import LoginRegisterScreen from "../screens/loginRegisterScreen";
import LoginScreen from "../screens/loginScreen";
import RegisterScreen from "../screens/registerScreen";
import EULAScreen from "../screens/eulaScreen";
import ForgotPasswordScreen from "../screens/forgotPasswordScreen";
import ResetPasswordScreen from "../screens/resetPasswordScreen";
import ProfileScreen from "../screens/profileScreen";
import BookmarkedPostsScreen from "../screens/bookmarkedPostsScreen";
import BookmarkedUsersScreen from "../screens/bookmarkedUsersScreen";
import BadgeScreen from "../screens/badgeScreen";
import FollowingProfileScreen from "../screens/followingProfileScreen";
import NotificationScreen from "../screens/notificationScreen";

import StorySearchScreen from "../screens/storySearchScreen";
import UserSearchScreen from "../screens/userSearchScreen";

import AnonToggleSwitch from "../components/anonToggleSwitch";
import ModalOpener from "../components/modalOpener";
import ProfileHeader from "../components/profile/profileHeader";

import EditProfileModal from "../modals/editProfileModal";
import LongPressStoryPostModal from "../modals/longPressStoryPostModal";
import EditStoryModal from "../modals/editStoryModal";

import HelpAndHotlineModal from "../modals/helpAndHotlineModal";
import SupportUsModal from "../modals/supportUsModal";
import ContactUsModal from "../modals/contactUsModal";
import FaqsModal from "../modals/faqsModal";
import TosModal from "../modals/TosModal";
import privacyModal from "../modals/privacyModal";
import CreditsModal from "../modals/creditsModal";

import { createIconSetFromIcoMoon } from "@expo/vector-icons";
import Toast, { BaseToast } from "react-native-toast-message";

const { height } = Dimensions.get('window');

const Icon = createIconSetFromIcoMoon(
  require("../assets/fonts/selection.json"),
  "IcoMoon",
  "icomoon.ttf",
);

import colors from "../config/colors.js";

const AnonMapStack = createStackNavigator();
function AnonMapStackScreen() {
  return (
    <AnonMapStack.Navigator screenOptions={{ headerShown: false }}>
      <AnonMapStack.Screen name='Map' component={DarkMapScreen} />
      <AnonMapStack.Screen name='Story' component={StoryScreen} />
    </AnonMapStack.Navigator>
  );
}

const UserMapStack = createStackNavigator();
function UserMapStackScreen() {
  return (
    <UserMapStack.Navigator screenOptions={{ headerShown: false}}>
      <UserMapStack.Screen name='Map' component={LightMapScreen} />
    </UserMapStack.Navigator>
  );
}

const StoriesStack = createStackNavigator();
function StoriesStackScreen() {
  return (
    <StoriesStack.Navigator screenOptions={{ headerShown: false }}>
      <StoriesStack.Screen name='StoryList' component={StoryListScreen} />
      <StoriesStack.Screen name='Story' component={StoryScreen} />
    </StoriesStack.Navigator>
  );
}

const BookmarkedUsersStack = createStackNavigator();
function BookmarkedUsersStackScreen() {
  return (
    <BookmarkedUsersStack.Navigator>
      <BookmarkedUsersStack.Screen
        name='UserList'
        options={{ header: () => null }}
        component={BookmarkedUserScreen}
      />
      <BookmarkedUsersStack.Screen
        name='UserProfile'
        options={{ header: () => null }}
        component={FollowingProfileScreen}
      />
    </BookmarkedUsersStack.Navigator>
  );
}

const BookmarkedTopTab = createMaterialTopTabNavigator();
function BookmarkedTopTabScreen() {
  // Odd glitch with names where it wouldn't display the full name
  // fixed by adding extra s at the end
  return (
    <BookmarkedTopTab.Navigator
      style={{ elevation: 0 }}
      tabBarOptions={{
        labelStyle: {
          textTransform: "lowercase",
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "Arial",
          marginTop: height * 0.05  // Temporary fix on iPhone 12 Pro Max and up - tabs on filter list are above the safeViewArea
        },
        tabStyle: {
          backgroundColor: colors.purple,
          shadowOpacity: 0,
          shadowRadius: 0,
        },
        activeTintColor: colors.white,
        inactiveTintColor: colors.border,
        backgroundColor: colors.purple,
        style: {
          shadowOpacity: 0,
        },
      }}>
      <BookmarkedTopTab.Screen
        name='stories'
        component={BookmarkedPostsScreen}
      />
      <BookmarkedTopTab.Screen
        name='users'
        component={BookmarkedUsersStackScreen}
      />
    </BookmarkedTopTab.Navigator>
  );
}

const LoginStack = createStackNavigator();
function LoginStackScreen() {
  return (
    <LoginStack.Navigator screenOptions={{ headerShown: false }}>
      <LoginStack.Screen name='Initial' component={LoginRegisterScreen} />
      <LoginStack.Screen name='Login' component={LoginScreen} />
      <LoginStack.Screen name='Register' component={RegisterScreen} />
      <LoginStack.Screen name='EULA' component={EULAScreen} />
      <LoginStack.Screen
        name='ForgotPassword'
        component={ForgotPasswordScreen}
      />
      <LoginStack.Screen name='ResetPassword' component={ResetPasswordScreen} />
    </LoginStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();
function ProfileStackScreen({ navigation }) {
  // the header left is a hack to make the title centered, otherwise its just terrible to work with
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name='Profile'
        options={{
          headerLeft: () => (
            <FontAwesome5
              name='ellipsis-v'
              style={{ padding: 15 }}
              size={24}
              color='white'
            />
          ),
          headerTitle: () => <ProfileHeader />,
          headerRight: () => (
            <FontAwesome5
              name='ellipsis-v'
              style={{ padding: 15 }}
              size={24}
              color={colors.purple}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
        component={ProfileScreen}
      />
      <ProfileStack.Screen
        name='Badge'
        options={{ header: () => null }}
        component={BadgeScreen}
      />
    </ProfileStack.Navigator>
  );
}

const ProfileDrawer = createDrawerNavigator();
function ProfileDrawerScreen() {
  return (
    <ProfileDrawer.Navigator
      drawerPosition='right'
      drawerType='slide'
      drawerStyle={{ width: "80%" }}
      options={{
        drawerIcon: ({ focused, size }) => (
          <FontAwesome5
            name='ellipsis-v'
            size={24}
            style={{ padding: 4 }}
            color={colors.purple}
          />
        ),
      }}
      drawerContent={(props) => {
        return (
          <DrawerContentScrollView
            {...props}
            contentContainerStyle={{ flex: 1 }}>
            <View
              style={{
                justifyContent: "space-evenly",
                flex: 1,
                backgroundColor: colors.purple,
              }}>
              <ModalOpener
                {...props}
                name='help & hotline'
                icon='phone'
                navigateTo='HelpAndHotlineModal'
              />
              <ModalOpener
                {...props}
                name='support us'
                icon='support'
                navigateTo='SupportUsModal'
              />
              <ModalOpener
                {...props}
                name='contact us'
                icon='contact'
                navigateTo='ContactUsModal'
              />
              <ModalOpener
                {...props}
                name='faqs'
                icon='faqs'
                navigateTo='FaqsModal'
              />
              <ModalOpener
                {...props}
                name='terms of service'
                icon='memo-circle-info'
                navigateTo='TosModal'
              />
               <ModalOpener
                {...props}
                name='privacy policy'
                icon='memo-circle-info'
                navigateTo='privacyModal'
              />
              <ModalOpener
                {...props}
                name='credits'
                icon='hands-praying'
                navigateTo='creditsModal'
              />

              <ModalOpener {...props} name='log out' />
            </View>
          </DrawerContentScrollView>
        );
      }}>
      <ProfileDrawer.Screen name='Home' component={ProfileStackScreen} />
    </ProfileDrawer.Navigator>
  );
}

// WILL DISPLAY IF USER IS ANONYMOUS
const NeedAuthTab = createBottomTabNavigator();
function NeedAuthTabScreen() {
  return (
    <NeedAuthTab.Navigator
      initialRouteName='Map'
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: colors.purple,
          elevation: 4,
        },
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (focused) {
            if (route.name === "Map") {
              iconName = "home_icon_highlighted";
            } else if (route.name === "Post") {
              iconName = "add_story_icon_highlighted";
            } else if (route.name === "Profile") {
              iconName = "profile_icon_highlighted";
            }
          } else {
            if (route.name === "Map") {
              iconName = "home_icon_inactive";
            } else if (route.name === "Post") {
              iconName = "add_story_icon_highlighted";
            } else if (route.name === "Profile") {
              iconName = "profile_icon_inactive";
            }
          }

          if (focused) {
            iconColor = colors.white;
          } else {
            iconColor = colors.border;
          }

          return <Icon name={iconName} size={size} color={iconColor} />;
        },
      })}>
      <NeedAuthTab.Screen name='Map' component={AnonMapStackScreen} />
      <NeedAuthTab.Screen name='Post' component={LoginStackScreen} />
      <NeedAuthTab.Screen
        name='Profile'
        component={LoginStackScreen}
        options={{ tabBarVisible: false }}
      />
    </NeedAuthTab.Navigator>
  );
}

const SearchTopTab = createMaterialTopTabNavigator();
function SearchTopTabScreen() {  
  // Odd glitch with names where it wouldn't display the full name
  // fixed by adding extra s at the end
  return (
    <SearchTopTab.Navigator
      style={{ elevation: 0}}
      tabBarOptions={{
        labelStyle: {
          textTransform: "lowercase",
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "Arial",
          marginTop: height * 0.05  // Temporary fix on iPhone 12 Pro Max - tabs on filter list are above the safeViewArea
        },
        tabStyle: {
          backgroundColor: colors.purple,
          shadowOpacity: 0,
          shadowRadius: 0,
        },
        activeTintColor: colors.white,
        inactiveTintColor: colors.border,
        backgroundColor: colors.purple,
        style: {
          shadowOpacity: 0,
        },
      }}>
      <SearchTopTab.Screen
        name='SearchStories'
        component={StorySearchScreen}
        options={{ title: "stories" }}
      />
      <SearchTopTab.Screen
        name='SearchUsers'
        component={UserSearchScreen}
        options={{ title: "users" }}
      />
    </SearchTopTab.Navigator>
  );
}

// <NeedAuthStack.Screen name="StorySearchScreen" component={StorySearchScreen} />
// <NeedAuthStack.Screen name="UserSearchScreen" component={UserSearchScreen} />
const NeedAuthStack = createStackNavigator();
function NeedAuthStackScreen() {
  return (
    <NeedAuthStack.Navigator screenOptions={{ headerShown: false }}>
      <NeedAuthStack.Screen name='Main' component={NeedAuthTabScreen} />
      <NeedAuthStack.Screen
        name='HelpAndHotlineModal'
        component={HelpAndHotlineModal}
      />
      <NeedAuthStack.Screen name='SupportUsModal' component={SupportUsModal} />
      <NeedAuthStack.Screen name='ContactUsModal' component={ContactUsModal} />
      <NeedAuthStack.Screen name='FaqsModal' component={FaqsModal} />
      <NeedAuthStack.Screen name='TosModal' component={TosModal} />
      <NeedAuthStack.Screen name='privacyModal' component={privacyModal} />
      <NeedAuthStack.Screen name='CreditsModal' component={CreditsModal} />
      <NeedAuthStack.Screen
        name='UserProfileModal'
        component={FollowingProfileScreen}
      />
      <NeedAuthStack.Screen name='Story' component={StoryScreen} />
      <NeedAuthStack.Screen name='Searching' component={SearchTopTabScreen} />
      <NeedAuthStack.Screen
        name='SubmitStoryModal'
        component={LongPressStoryPostModal}
      />
    </NeedAuthStack.Navigator>
  );
}

// WILL DISPLAY IF USER HAS SUCCESSFULLY LOGGED IN
const AppTab = createBottomTabNavigator();
function AppTabScreen() {
  return (
    <AppTab.Navigator
      initialRouteName='Map'
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: colors.purple
        },
      }}
      style={{ elevation: 20}}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;

          if (focused) {
            if (route.name === "Map") {
              iconName = "home_icon_highlighted";
            } else if (route.name === "Bookmarks") {
              iconName = "bookmark_icon_highlighted";
            } else if (route.name === "Post") {
              iconName = "add_story_icon_highlighted";
            } else if (route.name === "Notifications") {
              iconName = "notification_icon_highlighted";
            } else if (route.name === "Profile") {
              iconName = "profile_icon_highlighted";
            }
            iconColor = colors.white;
          } else {
            if (route.name === "Map") {
              iconName = "home_icon_inactive";
            } else if (route.name === "Bookmarks") {
              iconName = "bookmark_icon_Inactive";
            } else if (route.name === "Post") {
              iconName = "add_story_icon_highlighted";
            } else if (route.name === "Notifications") {
              iconName = "notification_icon_inactive";
            } else if (route.name === "Profile") {
              iconName = "profile_icon_inactive";
            }

            iconColor = colors.border;
          }

          return <Icon name={iconName} size={size} color={iconColor} />;
        },
      })}>
      <AppTab.Screen name='Map' component={UserMapStackScreen} />
      <AppTab.Screen name='Bookmarks' component={BookmarkedTopTabScreen} />
      <AppTab.Screen name='Post' component={StoryPostScreen} />
      <AppTab.Screen name='Notifications' component={NotificationScreen} />
      <AppTab.Screen name='Profile' component={ProfileDrawerScreen} />
    </AppTab.Navigator>
  );
}

const AppStack = createStackNavigator();
function AppStackScreen() {
  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      <AppStack.Screen name='Home' component={AppTabScreen} />
      {/* <AppStack.Screen name="Searching" component={AppTabScreen} /> */}
      <AppStack.Screen
        name='Story'
        options={{ header: () => null }}
        component={StoryScreen}
      />
      <AppStack.Screen
        name='HelpAndHotlineModal'
        component={HelpAndHotlineModal}
      />
      <AppStack.Screen name='SupportUsModal' component={SupportUsModal} />
      <AppStack.Screen name='ContactUsModal' component={ContactUsModal} />
      <AppStack.Screen name='EditProfileModal' component={EditProfileModal} />
      <AppStack.Screen name='FaqsModal' component={FaqsModal} />
      <AppStack.Screen name='CreditsModal' component={CreditsModal} />
      <NeedAuthStack.Screen name='TosModal' component={TosModal} />
      <NeedAuthStack.Screen name='privacyModal' component={privacyModal} />
      <AppStack.Screen name='privacyModal' component={privacyModal} />
      <AppStack.Screen name='EditStoryModal' component={EditStoryModal} />
      <AppStack.Screen
        name='UserProfileModal'
        component={FollowingProfileScreen}
      />
      <AppStack.Screen name='Searching' component={SearchTopTabScreen} />
      <AppStack.Screen
        name='SubmitStoryModal'
        component={LongPressStoryPostModal}
      />
    </AppStack.Navigator>
  );
}

const toastConfig = {
  error: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: colors.alert, borderLeftWidth: 10 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Arial",
        color: colors.black,
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: "Arial",
      }}
      text1={text1}
      text2={text2}
      onTrailingIconPress={() => Toast.hide()}
    />
  ),
  success: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: colors.success, borderLeftWidth: 10 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Arial",
        color: colors.black,
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: "Arial",
      }}
      text1={text1}
      text2={text2}
      onTrailingIconPress={() => Toast.hide()}
    />
  ),
  info: ({ text1, text2, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: colors.info, borderLeftWidth: 10 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Arial",
        color: colors.black,
      }}
      text2Style={{
        fontSize: 14,
        fontFamily: "Arial",
      }}
      text1={text1}
      text2={text2}
      onTrailingIconPress={() => Toast.hide()}
    />
  ),
};

const Stack = createStackNavigator();
function StackScreen({ hasAuth }) {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Auth'
        screenOptions={{ headerShown: false }}>
        {!hasAuth ? (
          <Stack.Screen name='Auth' component={NeedAuthStackScreen} />
        ) : (
          <Stack.Screen name='App' component={AppStackScreen} />
        )}
      </Stack.Navigator>
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    elevation: 0,
  },
});

const mapStateToProps = (state) => ({
  hasAuth: state.authReducer.token,
});

export default connect(mapStateToProps)(StackScreen);
