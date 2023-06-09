import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { connect } from "react-redux";
import { loadStories } from "../redux/actions/storyActions";
import axios from "axios";
//Icons
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// redux
import { followUser, unfollowUser } from "../redux/actions/authActions";

import Text from "../components/text";
import colors from "../config/colors";
//profile picture
const PROFILE_PIC = require("../assets/profile_blank.png");

//story component
import PlainStoryList from "../components/plainStoryList";
import BadgeList from "../components/badgeList";

function FollowingProfileScreen(props) {
  const { user } = props.route.params;
  const [selectedButton, setSelectedButton] = useState(0);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const insets = useSafeAreaInsets();

  const renderStoriesByType = () => {
    switch (selectedButton) {
      case 1:
        return <BadgeList />;
      default:
        return <PlainStoryList stories={data.userStories.filter(item => !item.is_anonymous_pin)} />;
    }
  };

  // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
  useEffect(() => {
    let isMounted = true; // note this flag denotes mount StatusBar
    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    //username can be changed if you want
    axios
      .get(
        `https://api.thearqive.com/api/profile/users/?username=${user}`,
        config
      )
      .then((res) => {
        if (isMounted) {
          setData(res.data[0]);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isMounted = false;
    };
  });

  const follow = () => {
    let list = props.followingList;
    list.push(data.id);
    list = {
      list: list,
      id: props.userId,
    };
    console.log("fp: ", list);
    props.followUser(list);
  };

  const unfollow = () => {
    let list = props.followingList;
    list = list.filter((item) => item !== data.id);
    list = {
      list: list,
      id: props.userId,
      unfollowing: data.id,
    };
    props.unfollowUser(list);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  } else {
    return (
      <SafeAreaView style={{ backgroundColor: "white", flexGrow: 1}}>
        <ScrollView style={{backgroundColor: colors.background}}>
          <View style={[styles.profileBar, {backgroundColor: colors.white}]}>
            <View style={styles.nicknameContainer}>
              <Text style={styles.nicknameText}>{user}</Text>
            </View>
            <View style={styles.profileImageContainer}>
              <FontAwesome name="bookmark-o" size={24} color="white" />
              <Image
                style={styles.profileImage}
                source={
                  data.profileurl !== null
                    ? { uri: data.profileurl }
                    : PROFILE_PIC
                }
              />
              {props.followingList.includes(data.id) ? (
                <TouchableWithoutFeedback onPress={() => unfollow()}>
                  <FontAwesome name="bookmark"
                    size={32}
                    color={(props.userId > 0) ? colors.purple : colors.white}
                  />
                </TouchableWithoutFeedback>
              ) : (
                <TouchableWithoutFeedback onPress={() => follow()}>
                  <FontAwesome
                    name="bookmark-o"
                    size={32}
                    color={(props.userId > 0) ? colors.purple : colors.white}
                  />
                </TouchableWithoutFeedback>
              )}
            </View>
            <View style={styles.bioContainter}>
              <Text style={{ fontWeight: "bold", color: colors.gray }}>bio</Text>
              <Text style={{}}>{data.bio}</Text>
            </View>
          </View>
          <View style={[styles.profileStoryButtons, {backgroundColor: colors.white}]}>
            <TouchableWithoutFeedback onPress={() => setSelectedButton(0)}>
              <View
                style={[styles.shadow2,
                  selectedButton === 0
                    ? styles.profileStorySelectedButton
                    : styles.profileStoryUnselectedButton
                ]}
              >
                <Text
                  style={{
                    fontWeight: "bold",
                    color: colors.purple,
                    paddingTop: 12,
                    marginBottom: -8,
                    borderBottomWidth: 2,
                    borderColor: colors.orange,
                    fontSize: 16
                  }}>
                    stories
                  </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.storyList}>{renderStoriesByType()}</View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

function elevationShadowStyle(elevation) {
  return {
    elevation: 4,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 0.5 * elevation },
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation
  };
}

const styles = StyleSheet.create({
  shadow2: elevationShadowStyle(20),
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  profileBar: {
    width: Dimensions.get("window").width,
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  nicknameContainer: {
    alignItems: "center",
    paddingBottom: "5%",
  },
  nicknameText: {
    fontWeight: "bold",
    fontSize: 18,
    color: colors.purple,
  },
  profileImageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    borderRadius: 200,
    resizeMode: "center",
    height: 128,
    width: 128,
  },
  bioContainter: {
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  profileStoryButtons: {
    width: Dimensions.get("window").width,
    borderTopColor: colors.border,
    paddingTop: "2%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  profileStorySelectedButton: {
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: "2%",
  },
  profileStoryUnselectedButton: {
    alignItems: "center",
    flexGrow: 1,
  },
  storyList: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    width: Dimensions.get("window").width,

    flex: 1,
    flexGrow: 1,
  },
  navButton: {
    flexGrow: 1,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 10,
    fontSize: 10,
    width: "80%",
  },
  requiredText: {
    color: "red",
  },
});

const mapStateToProps = (state) => {
  console.log("followingList fp: ", state.authReducer.followingList);
  // console.log(state.authReducer.user.id);
  return {
    isLoading: state.storyReducer.isLoading,
    stories: state.storyReducer.storyList,
    error: state.storyReducer.error,
    followingList: state.authReducer.followingList,
    userId: state.authReducer.user.id,
  };
};

const mapDispatchToPros = (dispatch) => {
  return {
    followUser: (item) => dispatch(followUser(item)),
    unfollowUser: (item) => dispatch(unfollowUser(item)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPros
)(FollowingProfileScreen);
