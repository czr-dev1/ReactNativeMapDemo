import React, { useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text
} from "react-native";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
import { Switch } from "react-native-switch";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import axios from "axios";
import { connect } from "react-redux";
import { loadStories } from "../redux/actions/storyActions";
import { reloadUser } from "../redux/actions/auth";
import { FontAwesome5 } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";
import { Entypo } from "@expo/vector-icons";
import Modal from "react-native-modal";
import Toast from 'react-native-toast-message';


import colors from "../config/colors";

function StoryPostScreen(props) {
  // These are here so you know what to include in your post request
  const [address, setAddress] = useState("");
  const [anonradius, setAnonRadius] = useState(1);
  const [category, setCategory] = useState(1);
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState(new Date());
  const [isAnonymous, setAnonymous] = useState(true);
  const [lastEditDate, setLastEditDate] = useState({});
  const [lastPersonEdit, setLastPersonEdit] = useState("");
  const [location, setLocation] = useState({}); //make sure to split to latitude and longitude
  const [locality, setLocality] = useState("");
  const [owner, setOwner] = useState(props.userId);
  const [postCode, setPostCode] = useState("");
  const [postDate, setPostDate] = useState("");
  const [region, setRegion] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [hasSetTitle, setHasSetTitle] = useState(false);

  const [isExpanded, setExpanded] = useState(false);
  const [isShowing, setShowing] = useState(false);
  const [isPickingStartDate, setIsPickingStartDate] = useState(false);
  const [isPickingEndDate, setIsPickingEndDate] = useState(false);
  const [hasPickStart, setHasPickStart] = useState(false);
  const [hasPickEnd, setHasPickEnd] = useState(false);

  const [gotLocation, setGotLocation] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      //handle error here
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
    setGotLocation(true);
    if (gotLocation) {
      console.log(location);
    }
  };

  const goBack = () => {
    setAddress("");
    setAnonRadius(1);
    setCategory(1);
    setCountry("");
    setDescription("");
    setEndDate(new Date());
    setAnonymous(true);
    setLastEditDate({});
    setLastPersonEdit("");
    setLocation("");
    setLocality("");
    setPostCode("");
    setPostDate("");
    setRegion("");
    setStartDate(new Date());
    setTitle("");

    Keyboard.dismiss();
    if (props.isLoggedIn) {
      props.navigation.navigate('Map');
    } else {
      props.navigation.navigate('Map');
    }
  }

  const fixBlanks = (toFix) => {
    let temp = toFix.trim()
    if ( temp.length === 0 ) {
      return "";
    }
    return toFix;
  };

  const submitNewStory = async () => {
    let tempLat = location.latitude;
    let tempLon = location.longitude;

    let tempAddr = fixBlanks(address);
    let tempLoc = fixBlanks(locality);
    let tempReg = fixBlanks(region);
    let tempPost = fixBlanks(postCode);
    let tempCountry = fixBlanks(country);

    let canPost = false;
    let canTestAddress = false;

    const testingAddr = `${tempAddr}${tempLoc}${tempReg}${tempCountry}`;
    if (testingAddr.length > 0 && tempPost.length === 0) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Missing Postal Code',
        text2: 'Add a Postal Code to post with Address!',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
    } else {
      canTestAddress = true;
    }


    const findAddress = `${tempAddr} ${tempLoc} ${tempReg} ${tempPost} ${tempCountry}`;

    if (canTestAddress) {
      if(findAddress.length > 4){ //because if they're all empty then theres 4 sapces
        console.log(findAddress.length);
        let res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q= ${findAddress}`);

        try {
          tempLat = Number (res.data[0].lat);
          tempLon = Number (res.data[0].lon);
          canPost = true;
        } catch (e) {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: 'Invalid Address',
            text2: 'Try checking it',
            visibilityTime: 4000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          });
        }
      }
    }

    if (findAddress.length === 4) {
      canPost = true;
    }


    const latSplit = tempLat.toString().split(".");
    const lonSplit = tempLon.toString().split(".");
    const latitude = latSplit[0] + "." + latSplit[1].substring(0, 6);
    const longitude = lonSplit[0] + "." + lonSplit[1].substring(0, 6);

    const pin = {
      address: address,
      anonradius: anonradius,
      category: category,
      country: country,
      description: description,
      endDate: endDate,
      is_anonymous_pin: isAnonymous,
      lastEditDate: new Date(),
      lastPersonEdit: null,
      latitude: latitude,
      longitude: longitude,
      locality: locality,
      owner: owner,
      postCode: postCode,
      postDate: new Date(),
      region: region,
      startDate: startDate,
      title: title,
    };
    console.log(pin);

    const config = {
      headers: {
        "X-Arqive-Api-Key": "4BqxMFdJ.3caXcBkTUuLWpGrfbBDQYfIyBVKiEif1",
      },
    };

    if (canPost) {
      axios.post("https://api.thearqive.com/api/pins/", pin, config)
      .then((res) => {
        console.log(res.data);

        setAddress("");
        setAnonRadius(1);
        setCategory(1);
        setCountry("");
        setDescription("");
        setEndDate(new Date());
        setAnonymous(true);
        setLastEditDate({});
        setLastPersonEdit("");
        setLocality("");
        setPostCode("");
        setPostDate("");
        setRegion("");
        setStartDate(new Date());
        setTitle("");

        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Successfully Posted',
          text2: 'Sit tight while we update',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });

        props.loadStories();
        Keyboard.dismiss();
        if (props.isLoggedIn) {
          props.navigation.navigate('Map');
          props.reloadUser(props.userName);
        } else {
          props.navigation.navigate('Map');
        }
      })
      .catch((err) => {
        console.log(err);
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error Posting',
          text2: 'Please include a title and story body',
          visibilityTime: 4000,
          autoHide: true,
          topOffset: 30,
          bottomOffset: 40,
        });
      });
    }
  };

  return (
    <TouchableWithoutFeedback>
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: '100%'}}>
        <Entypo
          onPress={() => {
            goBack();
          }}
          style={{ padding: 24 }}
          name="cross"
          size={28}
          color={colors.purple}
        />
        <Text
          style={{
            fontSize: 24,
            padding: 24,
            fontWeight: "bold",
            color: colors.purple,
          }}
        >
          add a story
        </Text>
          <TouchableWithoutFeedback onPress={() => {
            onSubmit();
          }}>
          <TouchableOpacity
            disabled={gotLocation ? false : true}
            onPress={(e) => {
              submitNewStory();
            }}
          >
            <Text style={{fontSize: 16, color: colors.purple, padding: 24}}>done</Text>
          </TouchableOpacity>
        </TouchableWithoutFeedback>
      </View>
        <View style={{ width: "80%", height: "100%" }}>
          <Modal
            isVisible={isPickingStartDate}
            onBackdropPress={() => setIsPickingStartDate(false)}
            onBackButtonPress={() => setIsPickingStartDate(false)}
            animationIn="fadeIn"
            animationOut="fadeOut"
          >
            <Calendar
              current={startDate}
              markedDates={{
                tempStart: {
                  selected: true,
                  marked: true,
                  selectedColor: "blue",
                },
              }}
              onDayPress={(day) => {
                let temp = new Date(day.year, day.month - 1, day.day);
                setStartDate(temp);
                setIsPickingStartDate(!isPickingStartDate);
                setHasPickStart(true);
              }}
              enableSwipeMonths={true}
            />
          </Modal>
          <Modal
            isVisible={isPickingEndDate}
            onBackdropPress={() => setIsPickingEndDate(false)}
            onBackButtonPress={() => setIsPickingEndDate(false)}
            animationIn="fadeIn"
            animationOut="fadeOut"
          >
            <Calendar
              current={endDate}
              markedDates={{
                tempStart: {
                  selected: true,
                  marked: true,
                  selectedColor: "blue",
                },
              }}
              onDayPress={(day) => {
                let temp = new Date(day.year, day.month - 1, day.day);
                setEndDate(temp);
                setIsPickingEndDate(!isPickingEndDate);
                setHasPickEnd(true);
              }}
            />
          </Modal>

          <View
            style={{
              flexDirection: "row",
              borderBottomWidth: 1,
              borderColor: colors.border,
              alignItems: "center",
              paddingBottom: 12,
              paddingLeft: 7,
              paddingRight: 14,
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={{}}>
              <Text
                style={{
                  color: colors.purple,
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                anonymous
              </Text>
            </View>
            <View style={{}}>
              <Switch
                value={isAnonymous}
                onValueChange={(val) => {
                  if (props.isLoggedIn) {
                    setAnonymous(val);
                  }
                }}
                activeText={"on"}
                inActiveText={"off"}
                backgroundActive={colors.purple}
                backgroundInActive={colors.purple}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: colors.border,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableWithoutFeedback onPress={() => setExpanded(!isExpanded)}>
              <FontAwesome5
                name={isExpanded ? "minus" : "plus"}
                size={24}
                color={colors.border}
              />
            </TouchableWithoutFeedback>
            <TextInput
              name="address"
              placeholder="*address"
              placeholderTextColor={colors.forgotDetails}
              style={styles.inputAddress}
              onFocus={() => setExpanded(true)}
              onChangeText={(val) => {
                setAddress(val);
              }}
            />
          </View>
          {isExpanded ? (
            <View>
              <TextInput
                name="locality"
                placeholder="locality (city, township, etc.)"
                placeholderTextColor={colors.forgotDetails}
                style={styles.input}
                onChangeText={(val) => {
                  setLocality(val);
                }}
              />
              <TextInput
                name="region"
                placeholder="region (state, province, etc.)"
                placeholderTextColor={colors.forgotDetails}
                style={styles.input}
                onChangeText={(val) => {
                  setRegion(val);
                }}
              />
              <TextInput
                name="country"
                placeholder="country"
                placeholderTextColor={colors.forgotDetails}
                style={styles.input}
                onChangeText={(val) => {
                  setCountry(val);
                }}
              />
              <TextInput
                name="postcode"
                placeholder="*postcode"
                placeholderTextColor={colors.forgotDetails}
                style={styles.input}
                onChangeText={(val) => {
                  setPostCode(val);
                }}
              />
            </View>
          ) : null}
          <View
            style={{
              flexDirection: "row",
              borderColor: colors.border,
              borderBottomWidth: 1,
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: colors.border,
                padding: 12,
                alignSelf: "flex-start",
              }}
            >
              *category
            </Text>
            <Collapse
              style={{ paddingRight: 12 }}
              isCollapsed={isShowing}
              onToggle={() => setShowing(!isShowing)}
            >
              <CollapseHeader>
                <View
                  style={[{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: colors.purple,
                    marginTop: 12,
                    borderRadius: 8,
                    padding: 7,
                  }]}
                >
                  <Text style={{ color: "#fff", paddingRight: 6 }}>
                    {category === 1
                      ? "personal"
                      : category === 2
                      ? "resource"
                      : "historical"}
                  </Text>
                  <FontAwesome5
                    name={isShowing ? "chevron-up" : "chevron-down"}
                    size={15}
                    color={colors.white}
                  />
                </View>
              </CollapseHeader>
              <CollapseBody>
                <TouchableOpacity
                  style={{ borderRadius: 0, borderTopWidth: 1, borderColor: colors.border, backgroundColor: colors.purple }}
                  onPress={() => {
                    setCategory(1);
                    setShowing(false);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: 8,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>personal</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ borderRadius: 0, borderTopWidth: 1, borderColor: colors.border, backgroundColor: colors.purple }}
                  onPress={() => {
                    setCategory(3);
                    setShowing(false);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: 8,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>historical</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopWidth: 1, borderColor: colors.border, backgroundColor: colors.purple, marginBottom: 12 }}
                  onPress={() => {
                    setCategory(2);
                    setShowing(false);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      padding: 8,
                    }}
                  >
                    <Text style={{ color: "#fff" }}>resource</Text>
                  </View>
                </TouchableOpacity>
              </CollapseBody>
            </Collapse>
          </View>

          <View
            style={{
              flexDirection: "row",
              borderColor: colors.border,
              borderBottomWidth: 1,
              justifyContent: "space-around",
              alignItems: "center",
              padding: 9,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => setIsPickingStartDate(true)}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ color: colors.border, paddingRight: 8 }}>
                  {hasPickStart
                    ? startDate.toISOString().slice(0, 10)
                    : "MM/DD/YYYY"}
                </Text>
                <FontAwesome5
                  name="calendar-week"
                  size={24}
                  color={colors.purple}
                />
              </View>
            </TouchableWithoutFeedback>
            <Text style={{ color: colors.border }}> to </Text>
            <TouchableWithoutFeedback onPress={() => setIsPickingEndDate(true)}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}
              >
                <Text style={{ color: colors.border, padding: 8 }}>
                  {hasPickEnd ? endDate.toISOString().slice(0, 10) : "MM/DD/YYYY"}
                </Text>
                <FontAwesome5
                  name="calendar-week"
                  size={24}
                  color={colors.purple}
                />
              </View>
            </TouchableWithoutFeedback>
          </View>

          {/*title === "" ? (
            <Text style={styles.requiredText}>
              * Please enter a story title{" "}
            </Text>
          ) : null*/}
          <TextInput
            name="title"
            placeholder="*title"
            placeholderTextColor={colors.forgotDetails}
            style={styles.input}
            value={title}
            onChangeText={(val) => {
              setTitle(val);
            }}
          />

          <TextInput
            multiline
            placeholder="*enter story"
            placeholderTextColor={colors.forgotDetails}
            name=""
            style={styles.inputAddress}
            value={description}
            onChangeText={(val) => {
              setDescription(val);
            }}
          />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: "center",
    height: "100%",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  navStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "dodgerblue",
    width: Dimensions.get("window").width,
    height: "5%",
  },
  navButton: {
    flexGrow: 1,
    textAlign: "center",
  },
  input: {
    borderBottomWidth: 1,
    fontWeight: 'normal',
    borderColor: colors.border,
    padding: 10,
    fontSize: 14,
    width: "100%",
  },
  inputAddress: {
    fontWeight: 'normal',
    padding: 10,
    fontSize: 14,
    width: "100%",
  },
  requiredText: {
    color: colors.alert,
  },
  userBtn: {
    marginTop: 15,
    fontSize: 18,
  },
});

const mapStateToProps = (state) => {
  const userId =
    state.authReducer.isLoggedIn === true ? state.authReducer.user.id : "";
  const userName =
    state.authReducer.isLoggedIn === true ? state.authReducer.user.username : "";
  return {
    userId: userId,
    userName: userName,
    isLoggedIn: state.authReducer.isLoggedIn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadStories: () => dispatch(loadStories()),
    reloadUser: (username) => dispatch(reloadUser(username)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StoryPostScreen);
